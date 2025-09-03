import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, DollarSign, Calendar } from "lucide-react";

interface Donation {
  id: string;
  amount: number;
  currency: string;
  donor_name: string;
  donor_email: string;
  message: string;
  status: string;
  created_at: string;
  projects: {
    title: string;
  };
}

const AdminDonations = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const { data, error } = await supabase
        .from("donations")
        .select(`
          *,
          projects(title)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDonations(data || []);
    } catch (error: any) {
      toast({
        title: "خطأ في جلب التبرعات",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "secondary",
      paid: "default",
      failed: "destructive",
      refunded: "outline"
    };
    
    const labels = {
      pending: "في الانتظار",
      paid: "مدفوع",
      failed: "فشل",
      refunded: "مسترد"
    };
    
    return (
      <Badge variant={variants[status as keyof typeof variants] as any}>
        {labels[status as keyof typeof labels] || status}
      </Badge>
    );
  };

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.donor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.donor_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.projects?.title?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || donation.status === statusFilter;
    
    let matchesDate = true;
    if (dateFilter !== "all") {
      const donationDate = new Date(donation.created_at);
      const now = new Date();
      
      switch (dateFilter) {
        case "today":
          matchesDate = donationDate.toDateString() === now.toDateString();
          break;
        case "week":
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = donationDate >= weekAgo;
          break;
        case "month":
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          matchesDate = donationDate >= monthAgo;
          break;
      }
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const totalDonations = filteredDonations.reduce((sum, donation) => {
    return donation.status === "paid" ? sum + donation.amount : sum;
  }, 0);

  const exportToCsv = () => {
    const headers = ["التاريخ", "المتبرع", "البريد الإلكتروني", "المشروع", "المبلغ", "العملة", "الحالة", "الرسالة"];
    const csvContent = [
      headers.join(","),
      ...filteredDonations.map(donation => [
        new Date(donation.created_at).toLocaleDateString("ar-SA"),
        donation.donor_name || "غير محدد",
        donation.donor_email || "غير محدد",
        donation.projects?.title || "غير محدد",
        donation.amount,
        donation.currency,
        donation.status,
        `"${donation.message || ""}"`
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `donations-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return <div className="p-8 text-center">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي التبرعات</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalDonations.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              من {filteredDonations.filter(d => d.status === "paid").length} تبرع مكتمل
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">التبرعات المعلقة</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredDonations.filter(d => d.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">
              ${filteredDonations.filter(d => d.status === "pending").reduce((sum, d) => sum + d.amount, 0).toLocaleString()}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">متوسط التبرع</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${filteredDonations.length > 0 ? Math.round(totalDonations / filteredDonations.filter(d => d.status === "paid").length || 0) : 0}
            </div>
            <p className="text-xs text-muted-foreground">لكل تبرع مكتمل</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>إدارة التبرعات</CardTitle>
              <CardDescription>عرض وإدارة جميع التبرعات على المنصة</CardDescription>
            </div>
            <Button onClick={exportToCsv} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              تصدير CSV
            </Button>
          </div>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="البحث في التبرعات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="تصفية حسب الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="pending">في الانتظار</SelectItem>
                <SelectItem value="paid">مدفوع</SelectItem>
                <SelectItem value="failed">فشل</SelectItem>
                <SelectItem value="refunded">مسترد</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="تصفية حسب التاريخ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع التواريخ</SelectItem>
                <SelectItem value="today">اليوم</SelectItem>
                <SelectItem value="week">هذا الأسبوع</SelectItem>
                <SelectItem value="month">هذا الشهر</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>التاريخ</TableHead>
                <TableHead>المتبرع</TableHead>
                <TableHead>المشروع</TableHead>
                <TableHead>المبلغ</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الرسالة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDonations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell>
                    {new Date(donation.created_at).toLocaleDateString("ar-SA", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{donation.donor_name || "متبرع مجهول"}</div>
                      <div className="text-sm text-muted-foreground">{donation.donor_email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{donation.projects?.title || "غير محدد"}</TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {donation.amount} {donation.currency.toUpperCase()}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(donation.status)}</TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate" title={donation.message}>
                      {donation.message || "لا توجد رسالة"}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredDonations.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">لا توجد تبرعات مطابقة لمعايير البحث</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDonations;