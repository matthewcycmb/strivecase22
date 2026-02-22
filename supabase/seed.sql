-- ============================================================
-- DeepSeek Manufacturing Platform — Seed Data
-- ============================================================
-- Run AFTER the migration (001_initial_schema.sql).
-- All manufacturer UUIDs are deterministic so foreign keys line up.
-- Reviews have user_id = NULL (seed / imported reviews).
-- ============================================================

-- ============================================================
-- MANUFACTURERS
-- ============================================================

-- -------------------------------------------------------
-- 1. ShenzhenTech Components  (electronics_accessories)
-- -------------------------------------------------------
INSERT INTO public.manufacturers (
  id, business_name, slug, description, logo_url, cover_image_url,
  location_city, location_country, verification_status,
  categories, specialties, certifications,
  moq_min, moq_max, lead_time_days_min, lead_time_days_max,
  composite_rating, total_reviews, total_orders_completed,
  avg_response_time_hours, year_established, employee_count,
  website_url, contact_email, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'ShenzhenTech Components',
  'shenzhentech-components',
  'ShenzhenTech Components is a leading PCB assembly and injection molding factory based in Shenzhen. With over 15 years of experience, they specialize in high-volume electronics accessory production with stringent quality controls. Their state-of-the-art facility handles everything from SMT assembly to final packaging.',
  'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=400&fit=crop',
  'Shenzhen', 'China', 'verified',
  ARRAY['electronics_accessories'],
  ARRAY['PCB Assembly', 'Injection Molding', 'SMT Soldering', 'Quality Testing'],
  ARRAY['CE', 'RoHS', 'FCC', 'ISO 9001'],
  100, 10000, 14, 30,
  4.80, 47, 312,
  4, 2008, '200-500',
  'https://shenzhentech.example.com', 'sales@shenzhentech.example.com',
  now() - interval '2 years', now()
);

-- -------------------------------------------------------
-- 2. Pearl River Electronics  (electronics_accessories)
-- -------------------------------------------------------
INSERT INTO public.manufacturers (
  id, business_name, slug, description, logo_url, cover_image_url,
  location_city, location_country, verification_status,
  categories, specialties, certifications,
  moq_min, moq_max, lead_time_days_min, lead_time_days_max,
  composite_rating, total_reviews, total_orders_completed,
  avg_response_time_hours, year_established, employee_count,
  website_url, contact_email, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000002',
  'Pearl River Electronics',
  'pearl-river-electronics',
  'Pearl River Electronics specializes in cable and connector manufacturing for consumer electronics and industrial applications. Their Guangzhou-based facility produces millions of units monthly with automated quality inspection lines. They are a preferred supplier for several Fortune 500 companies.',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1200&h=400&fit=crop',
  'Guangzhou', 'China', 'verified',
  ARRAY['electronics_accessories'],
  ARRAY['Cable Manufacturing', 'Connector Assembly', 'Wire Harness', 'OEM Production'],
  ARRAY['CE', 'RoHS', 'UL', 'ISO 9001'],
  500, 50000, 21, 45,
  4.60, 38, 245,
  6, 2005, '500-1000',
  'https://pearlriverelec.example.com', 'info@pearlriverelec.example.com',
  now() - interval '3 years', now()
);

-- -------------------------------------------------------
-- 3. Dongguan Smart Devices  (electronics_accessories)
-- -------------------------------------------------------
INSERT INTO public.manufacturers (
  id, business_name, slug, description, logo_url, cover_image_url,
  location_city, location_country, verification_status,
  categories, specialties, certifications,
  moq_min, moq_max, lead_time_days_min, lead_time_days_max,
  composite_rating, total_reviews, total_orders_completed,
  avg_response_time_hours, year_established, employee_count,
  website_url, contact_email, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000003',
  'Dongguan Smart Devices',
  'dongguan-smart-devices',
  'Dongguan Smart Devices focuses on smart device assembly and firmware integration for IoT and consumer electronics. Their engineering team offers end-to-end support from prototyping to mass production. They excel at bringing complex electronic products to market quickly.',
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&h=400&fit=crop',
  'Dongguan', 'China', 'verified',
  ARRAY['electronics_accessories'],
  ARRAY['Smart Device Assembly', 'Firmware Development', 'IoT Integration', 'Bluetooth/WiFi Modules'],
  ARRAY['CE', 'FCC', 'RoHS', 'ISO 9001'],
  200, 5000, 21, 35,
  4.70, 29, 156,
  3, 2012, '100-200',
  'https://dgsmartdevices.example.com', 'contact@dgsmartdevices.example.com',
  now() - interval '18 months', now()
);

-- -------------------------------------------------------
-- 4. Foshan Circuit Solutions  (electronics_accessories)
-- -------------------------------------------------------
INSERT INTO public.manufacturers (
  id, business_name, slug, description, logo_url, cover_image_url,
  location_city, location_country, verification_status,
  categories, specialties, certifications,
  moq_min, moq_max, lead_time_days_min, lead_time_days_max,
  composite_rating, total_reviews, total_orders_completed,
  avg_response_time_hours, year_established, employee_count,
  website_url, contact_email, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000004',
  'Foshan Circuit Solutions',
  'foshan-circuit-solutions',
  'Foshan Circuit Solutions provides end-to-end circuit board design and manufacturing services. They are especially popular with startups and small businesses that need low-MOQ PCB runs with quick turnaround. Their in-house design team can help optimize layouts for manufacturability.',
  'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=1200&h=400&fit=crop',
  'Foshan', 'China', 'pending',
  ARRAY['electronics_accessories'],
  ARRAY['PCB Design', 'PCB Manufacturing', 'DFM Analysis', 'Prototype Runs'],
  ARRAY['CE', 'RoHS', 'ISO 9001'],
  50, 2000, 10, 21,
  4.30, 15, 67,
  8, 2015, '50-100',
  'https://foshancircuit.example.com', 'hello@foshancircuit.example.com',
  now() - interval '1 year', now()
);

-- -------------------------------------------------------
-- 5. Xiamen Digital Craft  (electronics_accessories)
-- -------------------------------------------------------
INSERT INTO public.manufacturers (
  id, business_name, slug, description, logo_url, cover_image_url,
  location_city, location_country, verification_status,
  categories, specialties, certifications,
  moq_min, moq_max, lead_time_days_min, lead_time_days_max,
  composite_rating, total_reviews, total_orders_completed,
  avg_response_time_hours, year_established, employee_count,
  website_url, contact_email, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000005',
  'Xiamen Digital Craft',
  'xiamen-digital-craft',
  'Xiamen Digital Craft is a rapid-prototyping specialist offering 3D printing, CNC machining, and low-volume production for electronics enclosures and accessories. Their fast response times and low MOQs make them ideal for product development and iteration phases.',
  'https://images.unsplash.com/photo-1563520239648-a24e51d4b570?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&h=400&fit=crop',
  'Xiamen', 'China', 'verified',
  ARRAY['electronics_accessories'],
  ARRAY['3D Printing', 'Rapid Prototyping', 'CNC Machining', 'Enclosure Design'],
  ARRAY['CE', 'RoHS', 'ISO 9001'],
  10, 500, 7, 14,
  4.50, 22, 89,
  2, 2018, '20-50',
  'https://xiamendigital.example.com', 'proto@xiamendigital.example.com',
  now() - interval '10 months', now()
);

-- -------------------------------------------------------
-- 6. Guangzhou PackPro  (packaging)
-- -------------------------------------------------------
INSERT INTO public.manufacturers (
  id, business_name, slug, description, logo_url, cover_image_url,
  location_city, location_country, verification_status,
  categories, specialties, certifications,
  moq_min, moq_max, lead_time_days_min, lead_time_days_max,
  composite_rating, total_reviews, total_orders_completed,
  avg_response_time_hours, year_established, employee_count,
  website_url, contact_email, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000006',
  'Guangzhou PackPro',
  'guangzhou-packpro',
  'Guangzhou PackPro is one of South China''s premier custom packaging houses, specializing in luxury rigid boxes, magnetic closures, and premium unboxing experiences. With over two decades of experience, they serve global fashion, cosmetics, and electronics brands.',
  'https://images.unsplash.com/photo-1607166452427-7e4477079cb9?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=400&fit=crop',
  'Guangzhou', 'China', 'verified',
  ARRAY['packaging'],
  ARRAY['Custom Boxes', 'Luxury Packaging', 'Rigid Boxes', 'Magnetic Closure Boxes'],
  ARRAY['FSC', 'ISO 9001', 'ISO 14001', 'SEDEX'],
  500, 100000, 10, 25,
  4.90, 62, 534,
  3, 2003, '500-1000',
  'https://gzpackpro.example.com', 'sales@gzpackpro.example.com',
  now() - interval '4 years', now()
);

-- -------------------------------------------------------
-- 7. Hangzhou EcoPack  (packaging)
-- -------------------------------------------------------
INSERT INTO public.manufacturers (
  id, business_name, slug, description, logo_url, cover_image_url,
  location_city, location_country, verification_status,
  categories, specialties, certifications,
  moq_min, moq_max, lead_time_days_min, lead_time_days_max,
  composite_rating, total_reviews, total_orders_completed,
  avg_response_time_hours, year_established, employee_count,
  website_url, contact_email, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000007',
  'Hangzhou EcoPack',
  'hangzhou-ecopack',
  'Hangzhou EcoPack pioneers sustainable and biodegradable packaging solutions using plant-based materials, recycled pulp, and compostable films. They help brands meet environmental commitments without compromising on presentation or durability.',
  'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&h=400&fit=crop',
  'Hangzhou', 'China', 'verified',
  ARRAY['packaging'],
  ARRAY['Biodegradable Packaging', 'Sustainable Materials', 'Compostable Pouches', 'Recycled Paperboard'],
  ARRAY['FSC', 'ISO 14001', 'ISO 9001', 'OK Compost'],
  1000, 50000, 14, 30,
  4.70, 28, 178,
  5, 2016, '100-200',
  'https://hzecopack.example.com', 'green@hzecopack.example.com',
  now() - interval '2 years', now()
);

-- -------------------------------------------------------
-- 8. Wenzhou PrintMaster  (packaging)
-- -------------------------------------------------------
INSERT INTO public.manufacturers (
  id, business_name, slug, description, logo_url, cover_image_url,
  location_city, location_country, verification_status,
  categories, specialties, certifications,
  moq_min, moq_max, lead_time_days_min, lead_time_days_max,
  composite_rating, total_reviews, total_orders_completed,
  avg_response_time_hours, year_established, employee_count,
  website_url, contact_email, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000008',
  'Wenzhou PrintMaster',
  'wenzhou-printmaster',
  'Wenzhou PrintMaster is a high-capacity printing and packaging facility producing labels, shrink sleeves, stand-up pouches, and flexible printed packaging. They run 24/7 with Heidelberg and HP Indigo presses for both offset and digital workflows.',
  'https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&h=400&fit=crop',
  'Wenzhou', 'China', 'verified',
  ARRAY['packaging'],
  ARRAY['Label Printing', 'Flexible Packaging', 'Shrink Sleeves', 'Stand-Up Pouches'],
  ARRAY['FSC', 'ISO 9001', 'BRC Packaging', 'ISO 14001'],
  2000, 200000, 7, 21,
  4.40, 35, 423,
  6, 2001, '200-500',
  'https://wzprintmaster.example.com', 'orders@wzprintmaster.example.com',
  now() - interval '5 years', now()
);

-- -------------------------------------------------------
-- 9. Ningbo FlexiPack  (packaging)
-- -------------------------------------------------------
INSERT INTO public.manufacturers (
  id, business_name, slug, description, logo_url, cover_image_url,
  location_city, location_country, verification_status,
  categories, specialties, certifications,
  moq_min, moq_max, lead_time_days_min, lead_time_days_max,
  composite_rating, total_reviews, total_orders_completed,
  avg_response_time_hours, year_established, employee_count,
  website_url, contact_email, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000009',
  'Ningbo FlexiPack',
  'ningbo-flexipack',
  'Ningbo FlexiPack manufactures flexible packaging including resealable bags, vacuum pouches, and multi-layer laminated wraps. They serve food, supplements, and pet-care brands with competitive pricing at scale.',
  'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1200&h=400&fit=crop',
  'Ningbo', 'China', 'pending',
  ARRAY['packaging'],
  ARRAY['Flexible Packaging', 'Resealable Bags', 'Vacuum Pouches', 'Laminated Films'],
  ARRAY['ISO 9001', 'ISO 14001', 'FDA Compliant'],
  5000, 100000, 14, 28,
  4.20, 12, 89,
  12, 2010, '100-200',
  'https://nbflexipack.example.com', 'sales@nbflexipack.example.com',
  now() - interval '14 months', now()
);

-- -------------------------------------------------------
-- 10. Suzhou BoxCraft  (packaging)
-- -------------------------------------------------------
INSERT INTO public.manufacturers (
  id, business_name, slug, description, logo_url, cover_image_url,
  location_city, location_country, verification_status,
  categories, specialties, certifications,
  moq_min, moq_max, lead_time_days_min, lead_time_days_max,
  composite_rating, total_reviews, total_orders_completed,
  avg_response_time_hours, year_established, employee_count,
  website_url, contact_email, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000010',
  'Suzhou BoxCraft',
  'suzhou-boxcraft',
  'Suzhou BoxCraft specializes in corrugated shipping boxes, branded mailer boxes, and e-commerce packaging. Their automated die-cutting and folding lines deliver consistent quality and fast turnaround for direct-to-consumer brands.',
  'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&h=400&fit=crop',
  'Suzhou', 'China', 'verified',
  ARRAY['packaging'],
  ARRAY['Corrugated Boxes', 'Mailer Boxes', 'E-Commerce Packaging', 'Die-Cut Inserts'],
  ARRAY['FSC', 'ISO 9001', 'ISO 14001'],
  300, 20000, 7, 18,
  4.60, 41, 267,
  4, 2007, '50-200',
  'https://szboxcraft.example.com', 'info@szboxcraft.example.com',
  now() - interval '3 years', now()
);

-- -------------------------------------------------------
-- 11. Dongguan Stitch & Style  (apparel)
-- -------------------------------------------------------
INSERT INTO public.manufacturers (
  id, business_name, slug, description, logo_url, cover_image_url,
  location_city, location_country, verification_status,
  categories, specialties, certifications,
  moq_min, moq_max, lead_time_days_min, lead_time_days_max,
  composite_rating, total_reviews, total_orders_completed,
  avg_response_time_hours, year_established, employee_count,
  website_url, contact_email, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000011',
  'Dongguan Stitch & Style',
  'dongguan-stitch-and-style',
  'Dongguan Stitch & Style is a full-service cut-and-sew factory offering screen printing, embroidery, and custom labeling for streetwear and casual apparel. They work with indie brands and established labels alike, delivering consistent quality from sample to bulk.',
  'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
  'Dongguan', 'China', 'verified',
  ARRAY['apparel'],
  ARRAY['Cut-and-Sew', 'Screen Printing', 'Embroidery', 'Custom Labels'],
  ARRAY['OEKO-TEX Standard 100', 'ISO 9001', 'BSCI'],
  100, 5000, 21, 35,
  4.80, 51, 389,
  5, 2006, '200-500',
  'https://dgstitchstyle.example.com', 'orders@dgstitchstyle.example.com',
  now() - interval '4 years', now()
);

-- -------------------------------------------------------
-- 12. Shaoxing Fabric Works  (apparel)
-- -------------------------------------------------------
INSERT INTO public.manufacturers (
  id, business_name, slug, description, logo_url, cover_image_url,
  location_city, location_country, verification_status,
  categories, specialties, certifications,
  moq_min, moq_max, lead_time_days_min, lead_time_days_max,
  composite_rating, total_reviews, total_orders_completed,
  avg_response_time_hours, year_established, employee_count,
  website_url, contact_email, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000012',
  'Shaoxing Fabric Works',
  'shaoxing-fabric-works',
  'Shaoxing Fabric Works offers vertically integrated garment manufacturing from fabric sourcing through finished goods. Located in China''s textile capital, they have direct access to thousands of fabric mills and deliver competitive pricing on woven and knit apparel.',
  'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1503342217505-b0a15ec515c0?w=1200&h=400&fit=crop',
  'Shaoxing', 'China', 'verified',
  ARRAY['apparel'],
  ARRAY['Fabric Sourcing', 'Garment Manufacturing', 'Woven Apparel', 'Knit Apparel'],
  ARRAY['OEKO-TEX Standard 100', 'GOTS', 'ISO 9001'],
  200, 10000, 28, 45,
  4.50, 33, 234,
  7, 2004, '500-1000',
  'https://sxfabricworks.example.com', 'sourcing@sxfabricworks.example.com',
  now() - interval '5 years', now()
);

-- -------------------------------------------------------
-- 13. Quanzhou Active Wear  (apparel)
-- -------------------------------------------------------
INSERT INTO public.manufacturers (
  id, business_name, slug, description, logo_url, cover_image_url,
  location_city, location_country, verification_status,
  categories, specialties, certifications,
  moq_min, moq_max, lead_time_days_min, lead_time_days_max,
  composite_rating, total_reviews, total_orders_completed,
  avg_response_time_hours, year_established, employee_count,
  website_url, contact_email, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000013',
  'Quanzhou Active Wear',
  'quanzhou-active-wear',
  'Quanzhou Active Wear produces athletic and performance apparel using moisture-wicking, four-way stretch, and antimicrobial fabrics. They serve fitness brands, yoga labels, and sportswear companies with sublimation printing and bonded-seam construction.',
  'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&h=400&fit=crop',
  'Quanzhou', 'China', 'verified',
  ARRAY['apparel'],
  ARRAY['Athletic Apparel', 'Performance Fabrics', 'Sublimation Printing', 'Activewear'],
  ARRAY['OEKO-TEX Standard 100', 'ISO 9001', 'GRS'],
  300, 8000, 21, 40,
  4.60, 27, 178,
  4, 2011, '200-500',
  'https://qzactivewear.example.com', 'sales@qzactivewear.example.com',
  now() - interval '2 years', now()
);

-- -------------------------------------------------------
-- 14. Nanjing Thread Co.  (apparel)
-- -------------------------------------------------------
INSERT INTO public.manufacturers (
  id, business_name, slug, description, logo_url, cover_image_url,
  location_city, location_country, verification_status,
  categories, specialties, certifications,
  moq_min, moq_max, lead_time_days_min, lead_time_days_max,
  composite_rating, total_reviews, total_orders_completed,
  avg_response_time_hours, year_established, employee_count,
  website_url, contact_email, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000014',
  'Nanjing Thread Co.',
  'nanjing-thread-co',
  'Nanjing Thread Co. is a boutique apparel manufacturer specializing in embroidered basics and premium essentials. Their small-batch approach is ideal for emerging brands that need low MOQs with meticulous stitch quality and attention to detail.',
  'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200&h=400&fit=crop',
  'Nanjing', 'China', 'pending',
  ARRAY['apparel'],
  ARRAY['Embroidery', 'Premium Basics', 'Small-Batch Production', 'Custom Labels'],
  ARRAY['OEKO-TEX Standard 100', 'ISO 9001'],
  50, 2000, 14, 28,
  4.10, 9, 34,
  10, 2019, '20-50',
  'https://njthreadco.example.com', 'hello@njthreadco.example.com',
  now() - interval '8 months', now()
);

-- -------------------------------------------------------
-- 15. Suzhou Silk Studio  (apparel)
-- -------------------------------------------------------
INSERT INTO public.manufacturers (
  id, business_name, slug, description, logo_url, cover_image_url,
  location_city, location_country, verification_status,
  categories, specialties, certifications,
  moq_min, moq_max, lead_time_days_min, lead_time_days_max,
  composite_rating, total_reviews, total_orders_completed,
  avg_response_time_hours, year_established, employee_count,
  website_url, contact_email, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000015',
  'Suzhou Silk Studio',
  'suzhou-silk-studio',
  'Suzhou Silk Studio crafts luxury silk scarves, ties, pillowcases, and accessories using traditional Suzhou weaving techniques combined with modern digital printing. Their products are sold in high-end department stores and boutiques worldwide.',
  'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1524041255072-7da0525d6b34?w=1200&h=400&fit=crop',
  'Suzhou', 'China', 'verified',
  ARRAY['apparel'],
  ARRAY['Silk Products', 'Luxury Scarves', 'Silk Ties', 'Digital Printing on Silk'],
  ARRAY['OEKO-TEX Standard 100', 'GOTS', 'ISO 9001'],
  50, 1000, 14, 21,
  4.70, 24, 145,
  3, 2009, '50-100',
  'https://szsilkstudio.example.com', 'luxury@szsilkstudio.example.com',
  now() - interval '3 years', now()
);


-- ============================================================
-- MANUFACTURER PORTFOLIO ITEMS
-- ============================================================

-- --- ShenzhenTech Components (m01) ---
INSERT INTO public.manufacturer_portfolio (manufacturer_id, image_url, title, description, category) VALUES
('00000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&fit=crop', 'SMT Assembly Line', 'High-speed surface-mount technology line producing 50,000 placements per hour with automated optical inspection.', 'electronics_accessories'),
('00000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&fit=crop', 'Custom PCB Boards', 'Multi-layer PCB boards manufactured for a consumer electronics client, featuring gold-plated contacts and impedance-controlled traces.', 'electronics_accessories'),
('00000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&fit=crop', 'Injection-Molded Enclosures', 'Precision ABS and polycarbonate enclosures for IoT sensor devices, produced with tight ±0.05mm tolerances.', 'electronics_accessories'),
('00000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&fit=crop', 'Final Assembly & QC', 'Finished assembled Bluetooth speakers going through a 12-point quality check before packaging.', 'electronics_accessories');

-- --- Pearl River Electronics (m02) ---
INSERT INTO public.manufacturer_portfolio (manufacturer_id, image_url, title, description, category) VALUES
('00000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&fit=crop', 'USB-C Cable Production', 'High-speed USB-C cables with braided nylon sheathing, tested to 10,000 bend cycles.', 'electronics_accessories'),
('00000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&fit=crop', 'Connector Assembly Floor', 'Automated connector crimping and soldering line running three shifts daily.', 'electronics_accessories'),
('00000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&fit=crop', 'Wire Harness Bundles', 'Custom wire harnesses for automotive infotainment systems, built to OEM specifications.', 'electronics_accessories');

-- --- Dongguan Smart Devices (m03) ---
INSERT INTO public.manufacturer_portfolio (manufacturer_id, image_url, title, description, category) VALUES
('00000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&fit=crop', 'Smart Home Hub Assembly', 'Assembly of WiFi-enabled smart home hubs with custom firmware and OTA update capability.', 'electronics_accessories'),
('00000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&fit=crop', 'IoT Sensor Module', 'Compact environmental sensor modules integrating temperature, humidity, and air quality sensors.', 'electronics_accessories'),
('00000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&fit=crop', 'Firmware Testing Lab', 'Dedicated testing stations for firmware validation, RF compliance, and burn-in tests.', 'electronics_accessories'),
('00000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1563520239648-a24e51d4b570?w=800&fit=crop', 'Bluetooth Speaker Prototype', 'Rapid prototyping of a Bluetooth speaker with custom acoustic tuning and branded enclosure.', 'electronics_accessories');

-- --- Foshan Circuit Solutions (m04) ---
INSERT INTO public.manufacturer_portfolio (manufacturer_id, image_url, title, description, category) VALUES
('00000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&fit=crop', 'Prototype PCB Run', 'Quick-turn 4-layer prototype boards delivered in 72 hours for a robotics startup.', 'electronics_accessories'),
('00000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&fit=crop', 'Flexible PCBs', 'Flexible circuit boards designed for wearable health monitors, produced in a 200-unit pilot run.', 'electronics_accessories'),
('00000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&fit=crop', 'DFM Consultation', 'Design-for-manufacturability review session that reduced a client''s BOM cost by 18%.', 'electronics_accessories');

-- --- Xiamen Digital Craft (m05) ---
INSERT INTO public.manufacturer_portfolio (manufacturer_id, image_url, title, description, category) VALUES
('00000000-0000-0000-0000-000000000005', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&fit=crop', 'SLA 3D Printed Enclosure', 'High-resolution stereolithography prints for a medical device prototype, finished to production-grade smoothness.', 'electronics_accessories'),
('00000000-0000-0000-0000-000000000005', 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&fit=crop', 'CNC Aluminum Parts', 'CNC-machined aluminum heat sinks for a GPU cooling accessory, anodized in matte black.', 'electronics_accessories'),
('00000000-0000-0000-0000-000000000005', 'https://images.unsplash.com/photo-1563520239648-a24e51d4b570?w=800&fit=crop', 'Rapid Iteration Set', 'Five design iterations of a phone stand produced in one week, from concept to functional prototype.', 'electronics_accessories');

-- --- Guangzhou PackPro (m06) ---
INSERT INTO public.manufacturer_portfolio (manufacturer_id, image_url, title, description, category) VALUES
('00000000-0000-0000-0000-000000000006', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&fit=crop', 'Luxury Perfume Box', 'Custom rigid box with soft-touch lamination, hot-foil stamping, and magnetic closure for a fragrance brand.', 'packaging'),
('00000000-0000-0000-0000-000000000006', 'https://images.unsplash.com/photo-1607166452427-7e4477079cb9?w=800&fit=crop', 'Electronics Retail Packaging', 'Premium retail packaging for wireless earbuds featuring window cut-outs and EVA foam inserts.', 'packaging'),
('00000000-0000-0000-0000-000000000006', 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&fit=crop', 'Cosmetics Gift Set', 'Hinged lid gift set packaging for a skincare brand with custom tissue paper and ribbon pulls.', 'packaging'),
('00000000-0000-0000-0000-000000000006', 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&fit=crop', 'Subscription Box Design', 'Monthly subscription box with full CMYK printing, custom die-cut inserts, and branded tape.', 'packaging');

-- --- Hangzhou EcoPack (m07) ---
INSERT INTO public.manufacturer_portfolio (manufacturer_id, image_url, title, description, category) VALUES
('00000000-0000-0000-0000-000000000007', 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&fit=crop', 'Compostable Mailer Bags', 'Plant-based compostable poly mailers that break down in 180 days, printed with soy-based inks.', 'packaging'),
('00000000-0000-0000-0000-000000000007', 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&fit=crop', 'Recycled Pulp Trays', 'Molded fiber trays from 100% post-consumer recycled paper, used for cosmetics and food packaging.', 'packaging'),
('00000000-0000-0000-0000-000000000007', 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&fit=crop', 'Kraft Paper Tubes', 'Biodegradable kraft paper tubes for lip balm, deodorant, and solid shampoo bars.', 'packaging');

-- --- Wenzhou PrintMaster (m08) ---
INSERT INTO public.manufacturer_portfolio (manufacturer_id, image_url, title, description, category) VALUES
('00000000-0000-0000-0000-000000000008', 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&fit=crop', 'Shrink Sleeve Labels', 'Full-body shrink sleeve labels for beverage bottles with 360-degree vibrant graphics.', 'packaging'),
('00000000-0000-0000-0000-000000000008', 'https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=800&fit=crop', 'Stand-Up Pouches', 'Matte-finish stand-up pouches with zip-lock closure for coffee and snack brands.', 'packaging'),
('00000000-0000-0000-0000-000000000008', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&fit=crop', 'Pressure-Sensitive Labels', 'High-volume roll-fed pressure-sensitive labels for skincare product lines.', 'packaging'),
('00000000-0000-0000-0000-000000000008', 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&fit=crop', 'Printed Flat Pouches', 'Digitally printed flat pouches for sample sachets and single-serve products.', 'packaging');

-- --- Ningbo FlexiPack (m09) ---
INSERT INTO public.manufacturer_portfolio (manufacturer_id, image_url, title, description, category) VALUES
('00000000-0000-0000-0000-000000000009', 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&fit=crop', 'Vacuum-Sealed Food Bags', 'Multi-layer vacuum bags for meat and cheese packaging, extending shelf life by up to 3x.', 'packaging'),
('00000000-0000-0000-0000-000000000009', 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&fit=crop', 'Resealable Snack Bags', 'Printed resealable bags with clear window for granola, dried fruit, and nut brands.', 'packaging'),
('00000000-0000-0000-0000-000000000009', 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&fit=crop', 'Laminated Roll Stock', 'Laminated packaging film rolls for automatic form-fill-seal machines.', 'packaging');

-- --- Suzhou BoxCraft (m10) ---
INSERT INTO public.manufacturer_portfolio (manufacturer_id, image_url, title, description, category) VALUES
('00000000-0000-0000-0000-000000000010', 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&fit=crop', 'Branded Mailer Boxes', 'Custom-printed corrugated mailer boxes for a DTC sneaker brand with tear-strip opening.', 'packaging'),
('00000000-0000-0000-0000-000000000010', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&fit=crop', 'Heavy-Duty Shipping Cartons', 'Double-wall corrugated cartons for shipping electronics, passing ISTA 3A transit testing.', 'packaging'),
('00000000-0000-0000-0000-000000000010', 'https://images.unsplash.com/photo-1607166452427-7e4477079cb9?w=800&fit=crop', 'Die-Cut Inserts', 'Custom corrugated inserts that cradle fragile products, replacing styrofoam packing.', 'packaging'),
('00000000-0000-0000-0000-000000000010', 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&fit=crop', 'Pizza-Style Mailers', 'Flat-pack pizza-style mailer boxes for books, prints, and flat merchandise.', 'packaging');

-- --- Dongguan Stitch & Style (m11) ---
INSERT INTO public.manufacturer_portfolio (manufacturer_id, image_url, title, description, category) VALUES
('00000000-0000-0000-0000-000000000011', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&fit=crop', 'Streetwear Hoodie Collection', 'Heavyweight 400gsm French terry hoodies with puff-print graphics for an LA streetwear label.', 'apparel'),
('00000000-0000-0000-0000-000000000011', 'https://images.unsplash.com/photo-1503342217505-b0a15ec515c0?w=800&fit=crop', 'Screen-Printed Tees', 'Water-based screen-printed t-shirts on 100% organic ring-spun cotton blanks.', 'apparel'),
('00000000-0000-0000-0000-000000000011', 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&fit=crop', 'Embroidered Caps', 'Custom 3D embroidered snapback caps with woven labels and custom pantone matching.', 'apparel'),
('00000000-0000-0000-0000-000000000011', 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&fit=crop', 'Cut-and-Sew Shorts', 'Custom cut-and-sew mesh basketball shorts with sublimated side panels.', 'apparel');

-- --- Shaoxing Fabric Works (m12) ---
INSERT INTO public.manufacturer_portfolio (manufacturer_id, image_url, title, description, category) VALUES
('00000000-0000-0000-0000-000000000012', 'https://images.unsplash.com/photo-1503342217505-b0a15ec515c0?w=800&fit=crop', 'Linen Shirt Collection', 'Enzyme-washed linen shirts produced for a European fashion brand, available in 12 colorways.', 'apparel'),
('00000000-0000-0000-0000-000000000012', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&fit=crop', 'Woven Fabric Swatches', 'A selection of in-stock woven fabrics available for immediate sampling and development.', 'apparel'),
('00000000-0000-0000-0000-000000000012', 'https://images.unsplash.com/photo-1524041255072-7da0525d6b34?w=800&fit=crop', 'Viscose Dress Production', 'Printed viscose midi dresses from fabric development through finished garment.', 'apparel');

-- --- Quanzhou Active Wear (m13) ---
INSERT INTO public.manufacturer_portfolio (manufacturer_id, image_url, title, description, category) VALUES
('00000000-0000-0000-0000-000000000013', 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&fit=crop', 'Yoga Leggings Line', 'High-waist yoga leggings with squat-proof 4-way stretch fabric and hidden waistband pocket.', 'apparel'),
('00000000-0000-0000-0000-000000000013', 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&fit=crop', 'Running Shorts', 'Lightweight running shorts with built-in liner, reflective details, and zip pocket.', 'apparel'),
('00000000-0000-0000-0000-000000000013', 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&fit=crop', 'Sublimated Sports Jerseys', 'Full-sublimation polyester jerseys for a recreational soccer league, vibrant and wash-resistant.', 'apparel'),
('00000000-0000-0000-0000-000000000013', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&fit=crop', 'Compression Base Layer', 'Moisture-wicking compression tops with flatlock seams for gym and training use.', 'apparel');

-- --- Nanjing Thread Co. (m14) ---
INSERT INTO public.manufacturer_portfolio (manufacturer_id, image_url, title, description, category) VALUES
('00000000-0000-0000-0000-000000000014', 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&fit=crop', 'Embroidered Crewneck', 'Heavyweight 320gsm crewneck with tonal chain-stitch embroidery on the chest.', 'apparel'),
('00000000-0000-0000-0000-000000000014', 'https://images.unsplash.com/photo-1503342217505-b0a15ec515c0?w=800&fit=crop', 'Premium Blank Tees', 'Garment-dyed premium cotton tees in 8 vintage wash colors, pre-shrunk and relaxed fit.', 'apparel'),
('00000000-0000-0000-0000-000000000014', 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&fit=crop', 'Embroidered Tote Bag', 'Heavy canvas tote bags with custom embroidered artwork, reinforced handles.', 'apparel');

-- --- Suzhou Silk Studio (m15) ---
INSERT INTO public.manufacturer_portfolio (manufacturer_id, image_url, title, description, category) VALUES
('00000000-0000-0000-0000-000000000015', 'https://images.unsplash.com/photo-1524041255072-7da0525d6b34?w=800&fit=crop', 'Silk Scarf Collection', 'Hand-rolled edges on 100% mulberry silk twill scarves with custom digital prints.', 'apparel'),
('00000000-0000-0000-0000-000000000015', 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&fit=crop', 'Silk Pillowcase Set', 'Grade 6A 22-momme mulberry silk pillowcases in 15 colors, gift-boxed.', 'apparel'),
('00000000-0000-0000-0000-000000000015', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&fit=crop', 'Silk Tie Production', 'Seven-fold silk ties with custom jacquard weaving for a luxury menswear brand.', 'apparel'),
('00000000-0000-0000-0000-000000000015', 'https://images.unsplash.com/photo-1503342217505-b0a15ec515c0?w=800&fit=crop', 'Silk Kimono Robes', 'Digitally printed silk satin kimono robes for a resort-wear collection.', 'apparel');


-- ============================================================
-- REVIEWS
-- ============================================================

-- -------------------------------------------------------
-- ShenzhenTech Components (m01) — 3 reviews
-- -------------------------------------------------------
INSERT INTO public.reviews (manufacturer_id, user_id, order_id, rating, title, content, quality_rating, communication_rating, delivery_rating, reviewer_name, created_at) VALUES
('00000000-0000-0000-0000-000000000001', NULL, NULL, 5, 'Outstanding PCB quality', 'We ordered 2,000 custom PCBs for our smart home product and the quality was impeccable. Every board passed our AOI testing with zero defects. The injection-molded enclosures fit perfectly on the first sample run.', 5, 5, 5, 'James K.', now() - interval '6 months'),
('00000000-0000-0000-0000-000000000001', NULL, NULL, 5, 'Great partner for scaling production', 'ShenzhenTech helped us scale from 500 to 5,000 units seamlessly. Their project manager was proactive about flagging potential issues before they became problems. Lead time was exactly as quoted.', 5, 5, 4, 'Rachel T.', now() - interval '3 months'),
('00000000-0000-0000-0000-000000000001', NULL, NULL, 4, 'Solid work, minor delays on tooling', 'The PCB assembly was flawless. There was a slight delay on the injection mold tooling — about 5 days — but once production started, everything ran smoothly. Would order again.', 5, 4, 3, 'David L.', now() - interval '1 month');

-- -------------------------------------------------------
-- Pearl River Electronics (m02) — 3 reviews
-- -------------------------------------------------------
INSERT INTO public.reviews (manufacturer_id, user_id, order_id, rating, title, content, quality_rating, communication_rating, delivery_rating, reviewer_name, created_at) VALUES
('00000000-0000-0000-0000-000000000002', NULL, NULL, 5, 'Reliable cable supplier', 'We''ve been working with Pearl River for over two years now. Their USB-C cables consistently pass our bend and pull tests. Pricing is very competitive at the 10K+ unit level.', 5, 4, 5, 'Michael S.', now() - interval '4 months'),
('00000000-0000-0000-0000-000000000002', NULL, NULL, 4, 'Good quality, communication could improve', 'Product quality is excellent — the connectors are sturdy and well-soldered. Communication can be slow on weekends and holidays, so plan accordingly if you have tight deadlines.', 5, 3, 4, 'Lisa W.', now() - interval '2 months'),
('00000000-0000-0000-0000-000000000002', NULL, NULL, 5, 'Exceeded expectations on custom harness', 'Needed a custom wire harness for our EV charging station prototype. They nailed the specs on the first revision and delivered samples in 10 days. Highly recommended for wire/cable work.', 5, 5, 5, 'Tom R.', now() - interval '5 weeks');

-- -------------------------------------------------------
-- Dongguan Smart Devices (m03) — 3 reviews
-- -------------------------------------------------------
INSERT INTO public.reviews (manufacturer_id, user_id, order_id, rating, title, content, quality_rating, communication_rating, delivery_rating, reviewer_name, created_at) VALUES
('00000000-0000-0000-0000-000000000003', NULL, NULL, 5, 'True one-stop smart device partner', 'From firmware integration to final assembly, Dongguan Smart Devices handled our entire product. Their engineers caught a Bluetooth antenna placement issue during DFM review that would have cost us weeks.', 5, 5, 5, 'Sarah P.', now() - interval '7 months'),
('00000000-0000-0000-0000-000000000003', NULL, NULL, 5, 'Fast prototyping turnaround', 'Got functional prototypes in just 12 days. The firmware team was responsive and made three revisions at no extra charge. Final production quality matched the approved samples perfectly.', 5, 5, 4, 'Kevin Z.', now() - interval '2 months'),
('00000000-0000-0000-0000-000000000003', NULL, NULL, 4, 'Good but not cheap', 'Quality is top-tier and their engineering support is genuinely helpful. However, pricing is on the higher side compared to pure assembly houses. You''re paying for the engineering value though.', 4, 5, 4, 'Anna M.', now() - interval '3 weeks');

-- -------------------------------------------------------
-- Foshan Circuit Solutions (m04) — 2 reviews
-- -------------------------------------------------------
INSERT INTO public.reviews (manufacturer_id, user_id, order_id, rating, title, content, quality_rating, communication_rating, delivery_rating, reviewer_name, created_at) VALUES
('00000000-0000-0000-0000-000000000004', NULL, NULL, 4, 'Good for small prototype runs', 'Ordered 100 PCBs for our prototype run. Quality was solid — no shorts or open circuits. Communication was a bit slow with about a day between replies, but the end result was good.', 4, 3, 4, 'Brian J.', now() - interval '5 months'),
('00000000-0000-0000-0000-000000000004', NULL, NULL, 5, 'DFM feedback was incredibly helpful', 'Their design team reviewed our Gerber files and suggested three changes that improved yield and reduced our unit cost by 12%. The boards arrived on time and all passed testing. Great for startups.', 5, 5, 5, 'Emily C.', now() - interval '2 months');

-- -------------------------------------------------------
-- Xiamen Digital Craft (m05) — 3 reviews
-- -------------------------------------------------------
INSERT INTO public.reviews (manufacturer_id, user_id, order_id, rating, title, content, quality_rating, communication_rating, delivery_rating, reviewer_name, created_at) VALUES
('00000000-0000-0000-0000-000000000005', NULL, NULL, 5, 'Fastest prototyping I have experienced', 'Sent STL files Monday morning, had SLA prints by Wednesday afternoon. Surface finish was smooth enough for investor demos. Cannot beat their speed.', 5, 5, 5, 'Marcus H.', now() - interval '3 months'),
('00000000-0000-0000-0000-000000000005', NULL, NULL, 4, 'CNC quality is good, FDM less so', 'CNC aluminum parts were excellent — great tolerances and anodizing finish. The FDM 3D prints were acceptable for fit checks but had visible layer lines. Use SLA for anything cosmetic.', 4, 5, 5, 'Diana F.', now() - interval '6 weeks'),
('00000000-0000-0000-0000-000000000005', NULL, NULL, 5, 'Perfect for iteration', 'We went through four design revisions in two weeks. Each time they turned parts around in 2-3 days. Pricing was very fair for the quantities. Essential partner during our development phase.', 5, 5, 5, 'Chris N.', now() - interval '2 weeks');

-- -------------------------------------------------------
-- Guangzhou PackPro (m06) — 3 reviews
-- -------------------------------------------------------
INSERT INTO public.reviews (manufacturer_id, user_id, order_id, rating, title, content, quality_rating, communication_rating, delivery_rating, reviewer_name, created_at) VALUES
('00000000-0000-0000-0000-000000000006', NULL, NULL, 5, 'Luxury packaging that wows customers', 'PackPro produced 10,000 rigid boxes for our skincare launch and every single one was flawless. The hot-foil stamping was crisp and the magnetic closure has a satisfying snap. Our unboxing videos went viral.', 5, 5, 5, 'Olivia R.', now() - interval '8 months'),
('00000000-0000-0000-0000-000000000006', NULL, NULL, 5, 'Best packaging supplier we have worked with', 'Third order with PackPro and they keep delivering. They proactively suggested a soft-touch lamination upgrade that elevated our brand perception significantly. Turnaround was faster than quoted.', 5, 5, 5, 'Nathan B.', now() - interval '3 months'),
('00000000-0000-0000-0000-000000000006', NULL, NULL, 5, 'Incredible attention to detail', 'Ordered custom perfume boxes with embossed logos and ribbon pulls. The samples were perfect and production matched exactly. Color consistency across the entire run was outstanding.', 5, 5, 4, 'Sophie L.', now() - interval '1 month');

-- -------------------------------------------------------
-- Hangzhou EcoPack (m07) — 3 reviews
-- -------------------------------------------------------
INSERT INTO public.reviews (manufacturer_id, user_id, order_id, rating, title, content, quality_rating, communication_rating, delivery_rating, reviewer_name, created_at) VALUES
('00000000-0000-0000-0000-000000000007', NULL, NULL, 5, 'Finally, truly sustainable packaging', 'Our customers love knowing our packaging is 100% compostable. EcoPack helped us redesign from plastic clamshells to molded pulp trays without sacrificing product protection. A game changer for our brand.', 5, 5, 4, 'Maya G.', now() - interval '5 months'),
('00000000-0000-0000-0000-000000000007', NULL, NULL, 4, 'Good eco options, limited color range', 'The compostable mailers are genuinely impressive and our customers appreciate them. Only downside is that printing options are more limited than conventional packaging — fewer colors and no metallic finishes.', 4, 4, 5, 'Jordan K.', now() - interval '2 months'),
('00000000-0000-0000-0000-000000000007', NULL, NULL, 5, 'Helped us get B Corp certified', 'Switching to EcoPack was a key part of our sustainability strategy. They provided full lifecycle documentation and certifications that helped with our B Corp application. Packaging quality exceeded expectations.', 5, 5, 4, 'Hannah D.', now() - interval '3 weeks');

-- -------------------------------------------------------
-- Wenzhou PrintMaster (m08) — 3 reviews
-- -------------------------------------------------------
INSERT INTO public.reviews (manufacturer_id, user_id, order_id, rating, title, content, quality_rating, communication_rating, delivery_rating, reviewer_name, created_at) VALUES
('00000000-0000-0000-0000-000000000008', NULL, NULL, 5, 'Excellent label quality at scale', 'Ordered 500,000 pressure-sensitive labels across 12 SKUs. Color matching was spot-on and adhesion is perfect — no peeling or bubbling even in refrigerated conditions.', 5, 4, 5, 'William T.', now() - interval '6 months'),
('00000000-0000-0000-0000-000000000008', NULL, NULL, 4, 'Decent pouches, setup took time', 'Stand-up pouches turned out well — good zip closure and print quality. Initial setup and plate proofing took longer than expected (about 3 weeks), but reorders are quick.', 4, 3, 4, 'Grace Y.', now() - interval '3 months'),
('00000000-0000-0000-0000-000000000008', NULL, NULL, 4, 'Reliable for repeat orders', 'We''ve run six reorders now and consistency is excellent. The only thing I''d improve is their response time — sometimes takes a full business day to get answers to questions.', 4, 3, 5, 'Alex P.', now() - interval '5 weeks');

-- -------------------------------------------------------
-- Ningbo FlexiPack (m09) — 2 reviews
-- -------------------------------------------------------
INSERT INTO public.reviews (manufacturer_id, user_id, order_id, rating, title, content, quality_rating, communication_rating, delivery_rating, reviewer_name, created_at) VALUES
('00000000-0000-0000-0000-000000000009', NULL, NULL, 4, 'Competitive pricing on bulk bags', 'Ordered 20,000 resealable bags for our granola line. Print quality was clean and the reseal mechanism works well after multiple open-close cycles. Took a while to get initial samples though.', 4, 3, 4, 'Robert M.', now() - interval '4 months'),
('00000000-0000-0000-0000-000000000009', NULL, NULL, 3, 'Okay quality, slow communication', 'The vacuum pouches work fine for basic use but the seal width was slightly narrower than specified. Communication was very slow — had to follow up multiple times to get responses. Pricing is good though.', 3, 2, 3, 'Jessica H.', now() - interval '6 weeks');

-- -------------------------------------------------------
-- Suzhou BoxCraft (m10) — 3 reviews
-- -------------------------------------------------------
INSERT INTO public.reviews (manufacturer_id, user_id, order_id, rating, title, content, quality_rating, communication_rating, delivery_rating, reviewer_name, created_at) VALUES
('00000000-0000-0000-0000-000000000010', NULL, NULL, 5, 'Perfect mailer boxes for our DTC brand', 'BoxCraft produced 5,000 branded mailer boxes that are sturdy, print beautifully, and fold easily. Our fulfillment team loves them and our customers always comment on the packaging.', 5, 5, 5, 'Samantha V.', now() - interval '5 months'),
('00000000-0000-0000-0000-000000000010', NULL, NULL, 5, 'Fast turnaround on repeat orders', 'After the initial order, reorders take just 8-10 days to arrive. Quality is consistent across batches and they keep our die templates on file so there is no setup fee.', 5, 4, 5, 'Derek C.', now() - interval '2 months'),
('00000000-0000-0000-0000-000000000010', NULL, NULL, 4, 'Solid shipping boxes', 'Ordered double-wall corrugated cartons for shipping fragile ceramics. Zero breakage in over 1,000 shipments. Printing could be sharper on brown kraft — would recommend white liner for detailed graphics.', 4, 4, 5, 'Laura B.', now() - interval '3 weeks');

-- -------------------------------------------------------
-- Dongguan Stitch & Style (m11) — 3 reviews
-- -------------------------------------------------------
INSERT INTO public.reviews (manufacturer_id, user_id, order_id, rating, title, content, quality_rating, communication_rating, delivery_rating, reviewer_name, created_at) VALUES
('00000000-0000-0000-0000-000000000011', NULL, NULL, 5, 'Best cut-and-sew factory for streetwear', 'We launched our entire hoodie line with Stitch & Style. The 400gsm French terry is buttery soft, stitching is immaculate, and their puff-print application rivals anything you see from major brands.', 5, 5, 5, 'Tyler J.', now() - interval '7 months'),
('00000000-0000-0000-0000-000000000011', NULL, NULL, 5, 'Incredible screen print quality', 'Water-based screen prints on organic cotton came out perfectly — soft hand feel, vibrant colors, and no cracking after 20+ washes. They really know their craft.', 5, 5, 4, 'Megan A.', now() - interval '3 months'),
('00000000-0000-0000-0000-000000000011', NULL, NULL, 4, 'Good but plan for holiday delays', 'Quality is consistently excellent. One thing to note — plan around Chinese New Year and Golden Week. We experienced a 2-week delay in February. Outside of holidays, they hit every deadline.', 4, 4, 3, 'Austin K.', now() - interval '1 month');

-- -------------------------------------------------------
-- Shaoxing Fabric Works (m12) — 3 reviews
-- -------------------------------------------------------
INSERT INTO public.reviews (manufacturer_id, user_id, order_id, rating, title, content, quality_rating, communication_rating, delivery_rating, reviewer_name, created_at) VALUES
('00000000-0000-0000-0000-000000000012', NULL, NULL, 5, 'Unbeatable fabric access in Shaoxing', 'Being located in the heart of China''s textile hub means they can source virtually any fabric at wholesale prices. They found us a beautiful organic linen within 48 hours of our request.', 5, 4, 4, 'Nicole P.', now() - interval '6 months'),
('00000000-0000-0000-0000-000000000012', NULL, NULL, 4, 'Good garments, lead times can stretch', 'The finished garments are well-constructed and true to spec. However, lead times can stretch beyond the quoted range if there are fabric supply chain issues. Build in buffer time.', 4, 4, 3, 'Patrick O.', now() - interval '3 months'),
('00000000-0000-0000-0000-000000000012', NULL, NULL, 5, 'Full vertical integration is a huge plus', 'Having fabric sourcing and garment production under one roof simplifies everything. They managed our entire collection — from fabric development through packing — and the quality was consistent throughout.', 5, 4, 5, 'Isabelle F.', now() - interval '4 weeks');

-- -------------------------------------------------------
-- Quanzhou Active Wear (m13) — 3 reviews
-- -------------------------------------------------------
INSERT INTO public.reviews (manufacturer_id, user_id, order_id, rating, title, content, quality_rating, communication_rating, delivery_rating, reviewer_name, created_at) VALUES
('00000000-0000-0000-0000-000000000013', NULL, NULL, 5, 'Performance fabrics that actually perform', 'Our yoga leggings have been through rigorous stretch testing and wash testing — colors stay vibrant and fabric maintains compression after 50 washes. Customers rave about the quality.', 5, 4, 5, 'Jennifer W.', now() - interval '5 months'),
('00000000-0000-0000-0000-000000000013', NULL, NULL, 4, 'Good activewear, sizing ran slightly small', 'The fabric quality and construction are excellent. We did have an issue where the first batch ran about half a size small due to a grading adjustment. They corrected it immediately for the reorder.', 4, 4, 4, 'Mark D.', now() - interval '2 months'),
('00000000-0000-0000-0000-000000000013', NULL, NULL, 5, 'Sublimation printing is top-notch', 'Full-sublimation jerseys for our sports league came out incredibly vibrant. No fading, no peeling, and the moisture-wicking fabric keeps players comfortable. Already placed a second order.', 5, 5, 5, 'Ryan T.', now() - interval '3 weeks');

-- -------------------------------------------------------
-- Nanjing Thread Co. (m14) — 2 reviews
-- -------------------------------------------------------
INSERT INTO public.reviews (manufacturer_id, user_id, order_id, rating, title, content, quality_rating, communication_rating, delivery_rating, reviewer_name, created_at) VALUES
('00000000-0000-0000-0000-000000000014', NULL, NULL, 4, 'Nice embroidery work for a small shop', 'The chain-stitch embroidery on our crewnecks looks great — very clean and consistent. Being a smaller operation, their capacity is limited, so do not expect fast turnarounds on large orders.', 4, 4, 4, 'Chloe R.', now() - interval '3 months'),
('00000000-0000-0000-0000-000000000014', NULL, NULL, 4, 'Perfect for low-MOQ basics', 'We only needed 100 tees and most factories would not even take the order. Nanjing Thread Co. was happy to help and the garment-dyed tees turned out beautifully. Slightly slow on communication but worth the wait.', 4, 3, 4, 'Ethan S.', now() - interval '5 weeks');

-- -------------------------------------------------------
-- Suzhou Silk Studio (m15) — 3 reviews
-- -------------------------------------------------------
INSERT INTO public.reviews (manufacturer_id, user_id, order_id, rating, title, content, quality_rating, communication_rating, delivery_rating, reviewer_name, created_at) VALUES
('00000000-0000-0000-0000-000000000015', NULL, NULL, 5, 'Exquisite silk quality', 'The 22-momme silk pillowcases are absolutely luxurious. Our customers cannot believe the quality at our price point. The hand-rolled edges and packaging are a beautiful touch.', 5, 5, 5, 'Victoria L.', now() - interval '6 months'),
('00000000-0000-0000-0000-000000000015', NULL, NULL, 5, 'Stunning custom scarves', 'We designed custom digital prints and Suzhou Silk Studio brought them to life on charmeuse silk. The colors are vivid and the fabric drapes beautifully. They truly understand silk craftsmanship.', 5, 5, 4, 'Daniel G.', now() - interval '2 months'),
('00000000-0000-0000-0000-000000000015', NULL, NULL, 4, 'Beautiful product, higher pricing', 'The silk ties and pocket squares were gorgeous — perfect stitching and rich color. Pricing is higher than mass-market silk goods, but you are absolutely getting what you pay for in terms of quality.', 4, 4, 5, 'Simon H.', now() - interval '3 weeks');
