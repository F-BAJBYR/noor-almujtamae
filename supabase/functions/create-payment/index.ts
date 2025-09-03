import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    const origin = req.headers.get("origin") || "";
    const body = await req.json().catch(() => ({}));

    let amount: number = body?.amount; // expected in minor units (e.g., halalas)
    const currency: string = (body?.currency || "sar").toLowerCase();
    const donor = body?.donor || {};
    const payment_method = body?.payment_method || "";

    // URLs to redirect after checkout
    const success_url: string = body?.success_url || `${origin}/donate?status=success`;
    const cancel_url: string = body?.cancel_url || `${origin}/donate?status=cancel`;

    if (!amount || typeof amount !== "number" || amount <= 0) {
      throw new Error("Invalid amount provided. Amount must be a positive integer in minor units.");
    }

    // Create a Stripe Checkout Session for one-time payment
    const session = await stripe.checkout.sessions.create({
      customer_email: donor?.email || undefined,
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: "Donation",
              description: donor?.isAnonymous ? "Anonymous donation" : `Donation from ${donor?.name || "Supporter"}`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url,
      cancel_url,
      metadata: {
        name: donor?.name || "",
        phone: donor?.phone || "",
        isAnonymous: donor?.isAnonymous ? "true" : "false",
        paymentMethod: payment_method,
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});