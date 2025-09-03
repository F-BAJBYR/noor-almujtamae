import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Shield, Search, UserPlus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface Profile {
  id: string;
  user_id: string;
  display_name: string;
  avatar_url: string;
  position: string;
  bio: string;
  created_at: string;
  user_roles: { role: string }[];
}

const AdminUsers = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const { toast } = useToast();
  const { userRole } = useAuth();

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      // First get profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (profilesError) throw profilesError;

      // Then get user roles for each profile
      const profilesWithRoles = await Promise.all((profilesData || []).map(async (profile) => {
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", profile.user_id)
          .limit(1);

        return {
          ...profile,
          user_roles: roleData || []
        };
      }));

      setProfiles(profilesWithRoles);
    } catch (error: any) {
      toast({
        title: "خطأ في جلب المستخدمين",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleUpdate = async (userId: string, newRole: "admin" | "moderator" | "user") => {
    if (userRole !== "admin") {
      toast({
        title: "غير مسموح",
        description: "فقط المدير يمكنه تغيير الأدوار",
        variant: "destructive",
      });
      return;
    }

    try {
      // First delete existing role
      await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", userId);

      // Then insert new role
      const { error } = await supabase
        .from("user_roles")
        .insert({
          user_id: userId,
          role: newRole,
        });

      if (error) throw error;
      
      toast({ title: "تم تحديث دور المستخدم بنجاح" });
      fetchProfiles();
    } catch (error: any) {
      toast({
        title: "خطأ في تحديث الدور",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getRoleBadge = (userRoles: { role: string }[]) => {
    if (!userRoles || userRoles.length === 0) return <Badge variant="outline">مستخدم</Badge>;
    
    const role = userRoles[0].role;
    const variants = {
      admin: "destructive",
      moderator: "secondary",
      user: "outline"
    };
    
    const labels = {
      admin: "مدير",
      moderator: "مشرف",
      user: "مستخدم"
    };
    
    return (
      <Badge variant={variants[role as keyof typeof variants] as any}>
        {labels[role as keyof typeof labels]}
      </Badge>
    );
  };

  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = profile.display_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         profile.position?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === "all" || 
                       (profile.user_roles && profile.user_roles[0]?.role === selectedRole);
    
    return matchesSearch && matchesRole;
  });

  if (isLoading) {
    return <div className="p-8 text-center">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>إدارة المستخدمين</CardTitle>
              <CardDescription>عرض وإدارة جميع مستخدمي المنصة</CardDescription>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="البحث في المستخدمين..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="تصفية حسب الدور" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأدوار</SelectItem>
                <SelectItem value="admin">مدير</SelectItem>
                <SelectItem value="moderator">مشرف</SelectItem>
                <SelectItem value="user">مستخدم</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>المستخدم</TableHead>
                <TableHead>المنصب</TableHead>
                <TableHead>الدور</TableHead>
                <TableHead>تاريخ الانضمام</TableHead>
                {userRole === "admin" && <TableHead>الإجراءات</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProfiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={profile.avatar_url} />
                        <AvatarFallback>
                          {profile.display_name?.charAt(0) || "؟"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{profile.display_name || "غير محدد"}</div>
                        <div className="text-sm text-muted-foreground">
                          {profile.bio && profile.bio.length > 50 
                            ? `${profile.bio.substring(0, 50)}...` 
                            : profile.bio}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{profile.position || "غير محدد"}</TableCell>
                  <TableCell>{getRoleBadge(profile.user_roles)}</TableCell>
                  <TableCell>
                    {new Date(profile.created_at).toLocaleDateString("ar-SA")}
                  </TableCell>
                  {userRole === "admin" && (
                    <TableCell>
                      <Select
                        value={profile.user_roles?.[0]?.role || "user"}
                        onValueChange={(value: "admin" | "moderator" | "user") => handleRoleUpdate(profile.user_id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">مستخدم</SelectItem>
                          <SelectItem value="moderator">مشرف</SelectItem>
                          <SelectItem value="admin">مدير</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredProfiles.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">لا توجد نتائج مطابقة لبحثك</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;