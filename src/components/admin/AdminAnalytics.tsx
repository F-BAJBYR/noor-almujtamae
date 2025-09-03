import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, DollarSign, Target, Calendar } from "lucide-react";

const AdminAnalytics = () => {
  const [dateRange, setDateRange] = useState("30d");
  const [donationsData, setDonationsData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDonations: 0,
    totalProjects: 0,
    completionRate: 0
  });

  useEffect(() => {
    fetchAnalyticsData();
  }, [dateRange]);

  const fetchAnalyticsData = async () => {
    try {
      // Get date range
      const now = new Date();
      const daysAgo = parseInt(dateRange.replace('d', ''));
      const startDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);

      // Fetch donations data
      const { data: donations } = await supabase
        .from("donations")
        .select("amount, created_at, status")
        .gte("created_at", startDate.toISOString())
        .eq("status", "paid");

      // Fetch projects data
      const { data: projects } = await supabase
        .from("projects")
        .select("*");

      // Fetch profiles count
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id");

      // Process donations data for chart
      const donationsByDate = donations?.reduce((acc, donation) => {
        const date = new Date(donation.created_at).toLocaleDateString("ar-SA");
        acc[date] = (acc[date] || 0) + donation.amount;
        return acc;
      }, {}) || {};

      const donationsChartData = Object.entries(donationsByDate).map(([date, amount]) => ({
        date,
        amount
      }));

      // Process projects by category
      const projectsByCategory = projects?.reduce((acc, project) => {
        acc[project.category] = (acc[project.category] || 0) + 1;
        return acc;
      }, {}) || {};

      const categoryChartData = Object.entries(projectsByCategory).map(([category, count]) => ({
        category,
        count,
        color: getRandomColor()
      }));

      // Calculate stats
      const totalDonations = donations?.reduce((sum, d) => sum + d.amount, 0) || 0;
      const completedProjects = projects?.filter(p => p.raised_amount >= p.goal_amount).length || 0;
      const completionRate = projects?.length ? (completedProjects / projects.length) * 100 : 0;

      setDonationsData(donationsChartData);
      setProjectsData(projects || []);
      setCategoryData(categoryChartData);
      setStats({
        totalUsers: profiles?.length || 0,
        totalDonations,
        totalProjects: projects?.length || 0,
        completionRate
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  const getRandomColor = () => {
    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#0088fe"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">التقارير والإحصائيات</h2>
          <p className="text-muted-foreground">مراقبة أداء المنصة وتحليل البيانات</p>
        </div>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">آخر 7 أيام</SelectItem>
            <SelectItem value="30d">آخر 30 يوم</SelectItem>
            <SelectItem value="90d">آخر 3 أشهر</SelectItem>
            <SelectItem value="365d">آخر سنة</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المستخدمين</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              نمو مستمر
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي التبرعات</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalDonations.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">في الفترة المحددة</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المشاريع النشطة</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProjects}</div>
            <p className="text-xs text-muted-foreground">مشروع متاح للتبرع</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">معدل الإنجاز</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">من المشاريع مكتملة</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donations Trend */}
        <Card>
          <CardHeader>
            <CardTitle>اتجاه التبرعات</CardTitle>
            <CardDescription>مبلغ التبرعات اليومية في الفترة المحددة</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={donationsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Projects by Category */}
        <Card>
          <CardHeader>
            <CardTitle>المشاريع حسب الفئة</CardTitle>
            <CardDescription>توزيع المشاريع على الفئات المختلفة</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, count }) => `${category} (${count})`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Project Performance */}
      <Card>
        <CardHeader>
          <CardTitle>أداء المشاريع</CardTitle>
          <CardDescription>مقارنة بين الهدف المالي والمبلغ المجمع لكل مشروع</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={projectsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="goal_amount" fill="#8884d8" name="الهدف المالي" />
              <Bar dataKey="raised_amount" fill="#82ca9d" name="المبلغ المجمع" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;