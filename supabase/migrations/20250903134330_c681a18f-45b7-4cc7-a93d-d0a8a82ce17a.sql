-- إعطاء صلاحية admin للمستخدم الحالي
UPDATE public.user_roles 
SET role = 'admin' 
WHERE user_id = '0d709985-9614-4a23-8187-e34c485644a4';