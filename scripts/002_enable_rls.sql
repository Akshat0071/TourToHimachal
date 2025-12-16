-- Enable Row Level Security on all tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE taxi_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE diaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- Leads policies (anyone can insert for contact form, admins can read/update)
CREATE POLICY "Anyone can submit leads" ON leads 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Admins can view all leads" ON leads 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE admin_profiles.id = auth.uid()
    )
  );

CREATE POLICY "Admins can update leads" ON leads 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE admin_profiles.id = auth.uid()
    )
  );

CREATE POLICY "Admins can delete leads" ON leads 
  FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE admin_profiles.id = auth.uid()
    )
  );

-- Packages policies (public can view active, admins can manage all)
CREATE POLICY "Anyone can view active packages" ON packages 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Admins can view all packages" ON packages 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE admin_profiles.id = auth.uid()
    )
  );

CREATE POLICY "Admins can insert packages" ON packages 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE admin_profiles.id = auth.uid()
    )
  );

CREATE POLICY "Admins can update packages" ON packages 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE admin_profiles.id = auth.uid()
    )
  );

CREATE POLICY "Admins can delete packages" ON packages 
  FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE admin_profiles.id = auth.uid()
    )
  );

-- Vehicles policies (public can view available, admins can manage all)
CREATE POLICY "Anyone can view available vehicles" ON vehicles 
  FOR SELECT 
  USING (is_available = true);

CREATE POLICY "Admins can view all vehicles" ON vehicles 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE admin_profiles.id = auth.uid()
    )
  );

CREATE POLICY "Admins can insert vehicles" ON vehicles 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE admin_profiles.id = auth.uid()
    )
  );

CREATE POLICY "Admins can update vehicles" ON vehicles 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE admin_profiles.id = auth.uid()
    )
  );

CREATE POLICY "Admins can delete vehicles" ON vehicles 
  FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE admin_profiles.id = auth.uid()
    )
  );

-- Taxi routes policies
CREATE POLICY "Anyone can view active routes" ON taxi_routes 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Admins can view all routes" ON taxi_routes 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE admin_profiles.id = auth.uid()
    )
  );

CREATE POLICY "Admins can insert routes" ON taxi_routes 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE admin_profiles.id = auth.uid()
    )
  );

CREATE POLICY "Admins can update routes" ON taxi_routes 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE admin_profiles.id = auth.uid()
    )
  );

CREATE POLICY "Admins can delete routes" ON taxi_routes 
  FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE admin_profiles.id = auth.uid()
    )
  );

-- Blogs policies
CREATE POLICY "Anyone can view published blogs" ON blogs 
  FOR SELECT 
  USING (is_published = true);

CREATE POLICY "Admins can view all blogs" ON blogs 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE admin_profiles.id = auth.uid()
    )
  );

CREATE POLICY "Admins can insert blogs" ON blogs 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE admin_profiles.id = auth.uid()
    )
  );

CREATE POLICY "Admins can update blogs" ON blogs 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE admin_profiles.id = auth.uid()
    )
  );

CREATE POLICY "Admins can delete blogs" ON blogs 
  FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE admin_profiles.id = auth.uid()
    )
  );

-- Diaries policies
CREATE POLICY "Anyone can view published diaries" ON diaries 
  FOR SELECT 
  USING (is_published = true);

CREATE POLICY "Admins can view all diaries" ON diaries 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE admin_profiles.id = auth.uid()
    )
  );

CREATE POLICY "Admins can insert diaries" ON diaries 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE admin_profiles.id = auth.uid()
    )
  );

CREATE POLICY "Admins can update diaries" ON diaries 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE admin_profiles.id = auth.uid()
    )
  );

CREATE POLICY "Admins can delete diaries" ON diaries 
  FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE admin_profiles.id = auth.uid()
    )
  );

-- Media policies (admins only)
CREATE POLICY "Admins can view media" ON media 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE admin_profiles.id = auth.uid()
    )
  );

CREATE POLICY "Admins can insert media" ON media 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE admin_profiles.id = auth.uid()
    )
  );

CREATE POLICY "Admins can delete media" ON media 
  FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE admin_profiles.id = auth.uid()
    )
  );

-- Settings policies (admins only)
CREATE POLICY "Admins can view settings" ON settings 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE admin_profiles.id = auth.uid()
    )
  );

CREATE POLICY "Admins can insert settings" ON settings 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE admin_profiles.id = auth.uid()
    )
  );

CREATE POLICY "Admins can update settings" ON settings 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE admin_profiles.id = auth.uid()
    )
  );

-- Admin profiles policies
CREATE POLICY "Admins can view own profile" ON admin_profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Admins can update own profile" ON admin_profiles 
  FOR UPDATE 
  USING (auth.uid() = id);
