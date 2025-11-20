CREATE DATABASE medirwanda CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `consultations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` char(36) NOT NULL DEFAULT uuid(),
  `patient_id` bigint(20) UNSIGNED NOT NULL,
  `doctor_id` bigint(20) UNSIGNED NOT NULL,
  `consultation_type` enum('VIDEO','AUDIO','CHAT','EMERGENCY') DEFAULT 'VIDEO',
  `status` enum('SCHEDULED','WAITING','ONGOING','COMPLETED','CANCELLED','NO_SHOW') DEFAULT 'WAITING',
  `chief_complaint` text DEFAULT NULL COMMENT 'Patient symptoms',
  `diagnosis` text DEFAULT NULL COMMENT 'Doctor diagnosis',
  `doctor_notes` text DEFAULT NULL COMMENT 'Encrypted clinical notes',
  `consultation_fee` decimal(10,2) NOT NULL,
  `patient_copay` decimal(10,2) DEFAULT 0.00,
  `insurance_coverage` decimal(10,2) DEFAULT 0.00,
  `scheduled_at` timestamp NULL DEFAULT NULL,
  `started_at` timestamp NULL DEFAULT NULL,
  `ended_at` timestamp NULL DEFAULT NULL,
  `duration_minutes` int(10) UNSIGNED DEFAULT NULL,
  `patient_rating` tinyint(4) DEFAULT NULL,
  `patient_feedback` text DEFAULT NULL,
  `webrtc_session_id` varchar(100) DEFAULT NULL COMMENT 'Video call session ID',
  `recording_url` varchar(255) DEFAULT NULL COMMENT 'Encrypted storage URL',
  `recording_consent` tinyint(1) DEFAULT 0,
  `follow_up_required` tinyint(1) DEFAULT 0,
  `follow_up_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `consultation_vitals`
--

CREATE TABLE `consultation_vitals` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `consultation_id` bigint(20) UNSIGNED NOT NULL,
  `blood_pressure_systolic` int(11) DEFAULT NULL,
  `blood_pressure_diastolic` int(11) DEFAULT NULL,
  `heart_rate` int(11) DEFAULT NULL COMMENT 'BPM',
  `temperature` decimal(4,1) DEFAULT NULL COMMENT 'Celsius',
  `oxygen_saturation` int(11) DEFAULT NULL COMMENT 'SpO2 percentage',
  `respiratory_rate` int(11) DEFAULT NULL,
  `weight_kg` decimal(5,2) DEFAULT NULL,
  `height_cm` decimal(5,2) DEFAULT NULL,
  `bmi` decimal(4,2) DEFAULT NULL,
  `recorded_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `deliveries`
--

CREATE TABLE `deliveries` (
  `id` int(11) NOT NULL,
  `order_ref` varchar(60) DEFAULT NULL,
  `status` varchar(30) DEFAULT NULL,
  `eta_minutes` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `license_number` varchar(20) NOT NULL,
  `license_expiry_date` date NOT NULL,
  `specialty` varchar(100) NOT NULL,
  `sub_specialty` varchar(100) DEFAULT NULL,
  `qualification` text DEFAULT NULL COMMENT 'Medical degrees, certifications',
  `years_of_experience` tinyint(4) DEFAULT NULL,
  `hospital_affiliation` varchar(100) DEFAULT NULL,
  `consultation_fee` decimal(10,2) NOT NULL DEFAULT 5000.00 COMMENT 'Base fee in RWF',
  `is_online` tinyint(1) DEFAULT 0,
  `is_accepting_patients` tinyint(1) DEFAULT 1,
  `average_rating` decimal(3,2) DEFAULT 0.00,
  `total_reviews` int(10) UNSIGNED DEFAULT 0,
  `total_consultations` int(10) UNSIGNED DEFAULT 0,
  `bio` text DEFAULT NULL,
  `languages_spoken` text DEFAULT NULL COMMENT 'JSON array',
  `availability_schedule` text DEFAULT NULL COMMENT 'JSON weekly schedule'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `doctor_availability`
--

CREATE TABLE `doctor_availability` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `doctor_id` bigint(20) UNSIGNED NOT NULL,
  `day_of_week` tinyint(4) NOT NULL COMMENT '0=Sunday, 6=Saturday',
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `max_patients_per_hour` tinyint(4) DEFAULT 4
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `drug_catalog`
--

CREATE TABLE `drug_catalog` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `drug_code` varchar(20) NOT NULL COMMENT 'Rwanda FDA code',
  `generic_name` varchar(200) NOT NULL,
  `brand_name` varchar(200) DEFAULT NULL,
  `dosage_form` enum('TABLET','CAPSULE','SYRUP','INJECTION','CREAM','INHALER','DROPS','OTHER') NOT NULL,
  `strength` varchar(50) NOT NULL COMMENT 'e.g., 500mg, 10ml',
  `manufacturer` varchar(100) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL COMMENT 'Antibiotic, Analgesic, etc.',
  `requires_prescription` tinyint(1) DEFAULT 1,
  `is_controlled_substance` tinyint(1) DEFAULT 0,
  `standard_price` decimal(10,2) DEFAULT NULL COMMENT 'Reference price in RWF',
  `nhis_covered` tinyint(1) DEFAULT 0,
  `nhis_copay_percentage` decimal(5,2) DEFAULT 0.00,
  `description` text DEFAULT NULL,
  `side_effects` text DEFAULT NULL COMMENT 'JSON array',
  `contraindications` text DEFAULT NULL COMMENT 'JSON array',
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `insurance_claims`
--

CREATE TABLE `insurance_claims` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` char(36) NOT NULL DEFAULT uuid(),
  `claim_number` varchar(30) NOT NULL COMMENT 'Format: CLM-YYYYMMDD-XXXXX',
  `prescription_id` bigint(20) UNSIGNED NOT NULL,
  `consultation_id` bigint(20) UNSIGNED DEFAULT NULL,
  `patient_id` bigint(20) UNSIGNED NOT NULL,
  `insurer_id` bigint(20) UNSIGNED NOT NULL,
  `pharmacy_id` bigint(20) UNSIGNED DEFAULT NULL,
  `claim_type` enum('CONSULTATION','PRESCRIPTION','BOTH') NOT NULL,
  `total_claimed_amount` decimal(12,2) NOT NULL,
  `approved_amount` decimal(12,2) DEFAULT 0.00,
  `rejected_amount` decimal(12,2) DEFAULT 0.00,
  `patient_copay` decimal(12,2) NOT NULL,
  `status` enum('DRAFT','SUBMITTED','UNDER_REVIEW','APPROVED','PARTIALLY_APPROVED','REJECTED','PAID') DEFAULT 'DRAFT',
  `rejection_reason` text DEFAULT NULL,
  `submitted_at` timestamp NULL DEFAULT NULL,
  `reviewed_at` timestamp NULL DEFAULT NULL,
  `approved_at` timestamp NULL DEFAULT NULL,
  `paid_at` timestamp NULL DEFAULT NULL,
  `payment_reference` varchar(50) DEFAULT NULL,
  `reviewer_notes` text DEFAULT NULL,
  `supporting_documents` text DEFAULT NULL COMMENT 'JSON array of file URLs',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `insurance_coverages`
--

CREATE TABLE `insurance_coverages` (
  `id` int(11) NOT NULL,
  `nid` varchar(30) DEFAULT NULL,
  `plan` varchar(60) DEFAULT NULL,
  `covered` int(11) DEFAULT NULL,
  `copay` int(11) DEFAULT NULL,
  `valid` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `insurers`
--

CREATE TABLE `insurers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `insurer_type` enum('NHIS','RSSB','PRIVATE','MILITARY') NOT NULL,
  `contact_email` varchar(100) DEFAULT NULL,
  `contact_phone` varchar(15) DEFAULT NULL,
  `api_endpoint` varchar(255) DEFAULT NULL,
  `api_key_encrypted` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `insurers`
--

INSERT INTO `insurers` (`id`, `name`, `insurer_type`, `contact_email`, `contact_phone`, `api_endpoint`, `api_key_encrypted`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Mutuelle de Santé - Ubudehe Category 1', 'NHIS', NULL, '+250788100000', NULL, NULL, 1, '2025-11-17 15:28:08', '2025-11-17 15:28:08'),
(2, 'Mutuelle de Santé - Ubudehe Category 2', 'NHIS', NULL, '+250788100001', NULL, NULL, 1, '2025-11-17 15:28:08', '2025-11-17 15:28:08'),
(3, 'Mutuelle de Santé - Ubudehe Category 3', 'NHIS', NULL, '+250788100002', NULL, NULL, 1, '2025-11-17 15:28:08', '2025-11-17 15:28:08'),
(4, 'Mutuelle de Santé - Premium', 'NHIS', NULL, '+250788100003', NULL, NULL, 1, '2025-11-17 15:28:08', '2025-11-17 15:28:08'),
(5, 'RSSB - Community Based Health Insurance', 'RSSB', NULL, '+250788100004', NULL, NULL, 1, '2025-11-17 15:28:08', '2025-11-17 15:28:08'),
(6, 'RSSB - RAMA', 'RSSB', NULL, '+250788100005', NULL, NULL, 1, '2025-11-17 15:28:08', '2025-11-17 15:28:08'),
(7, 'RSSB - MMI', 'RSSB', NULL, '+250788100006', NULL, NULL, 1, '2025-11-17 15:28:08', '2025-11-17 15:28:08'),
(8, 'Sanlam Rwanda', 'PRIVATE', NULL, '+250788100007', NULL, NULL, 1, '2025-11-17 15:28:08', '2025-11-17 15:28:08'),
(9, 'Sonarwa', 'PRIVATE', NULL, '+250788100008', NULL, NULL, 1, '2025-11-17 15:28:08', '2025-11-17 15:28:08'),
(10, 'Rwanda Defense Force Medical Insurance', 'MILITARY', NULL, '+250788100009', NULL, NULL, 1, '2025-11-17 15:28:08', '2025-11-17 15:28:08');

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `id` int(11) NOT NULL,
  `pharmacy` varchar(120) DEFAULT NULL,
  `drug` varchar(120) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `nhis_member_id` varchar(20) DEFAULT NULL COMMENT 'Mutuelle de Santé number',
  `nhis_category` tinyint(4) DEFAULT NULL COMMENT '1=Ubudehe Cat 1, 2=Cat 2, 3=Cat 3, 4=Premium',
  `nhis_expiry_date` date DEFAULT NULL,
  `primary_insurer_id` bigint(20) UNSIGNED DEFAULT NULL COMMENT 'Private insurance',
  `secondary_insurer_id` bigint(20) UNSIGNED DEFAULT NULL COMMENT 'Additional coverage',
  `blood_type` varchar(3) DEFAULT NULL,
  `blood_group` enum('A+','A-','B+','B-','AB+','AB-','O+','O-') DEFAULT NULL,
  `height_cm` decimal(5,2) DEFAULT NULL,
  `weight_kg` decimal(5,2) DEFAULT NULL,
  `allergies` text DEFAULT NULL COMMENT 'JSON array of allergy objects',
  `chronic_conditions` text DEFAULT NULL COMMENT 'JSON array of conditions',
  `emergency_contact_name` varchar(100) DEFAULT NULL,
  `emergency_contact_phone` varchar(15) DEFAULT NULL,
  `emergency_contact_relation` varchar(50) DEFAULT NULL,
  `preferred_language` enum('KINYARWANDA','ENGLISH','FRENCH','SWAHILI') DEFAULT 'KINYARWANDA'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `patient_addresses`
--

CREATE TABLE `patient_addresses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `patient_id` bigint(20) UNSIGNED NOT NULL,
  `address_type` enum('HOME','WORK','DELIVERY','OTHER') DEFAULT 'HOME',
  `province` varchar(50) NOT NULL,
  `district` varchar(50) NOT NULL,
  `sector` varchar(50) NOT NULL,
  `cell` varchar(50) NOT NULL,
  `village` varchar(50) NOT NULL,
  `street_address` text DEFAULT NULL,
  `location` point NOT NULL COMMENT 'GPS: POINT(longitude, latitude)',
  `landmark` text DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT 0,
  `is_verified` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pharmacies`
--

CREATE TABLE `pharmacies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `owner_id` bigint(20) UNSIGNED DEFAULT NULL COMMENT 'User ID of owner',
  `name` varchar(100) NOT NULL,
  `license_number` varchar(30) NOT NULL,
  `license_expiry_date` date NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `province` varchar(50) NOT NULL,
  `district` varchar(50) NOT NULL,
  `sector` varchar(50) NOT NULL,
  `location` point NOT NULL COMMENT 'GPS coordinates',
  `street_address` text DEFAULT NULL,
  `is_24_hours` tinyint(1) DEFAULT 0,
  `opening_time` time DEFAULT NULL,
  `closing_time` time DEFAULT NULL,
  `accepts_delivery` tinyint(1) DEFAULT 1,
  `accepts_insurance` tinyint(1) DEFAULT 1,
  `average_rating` decimal(3,2) DEFAULT 0.00,
  `total_reviews` int(10) UNSIGNED DEFAULT 0,
  `total_orders` int(10) UNSIGNED DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pharmacy_inventory`
--

CREATE TABLE `pharmacy_inventory` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `pharmacy_id` bigint(20) UNSIGNED NOT NULL,
  `drug_id` bigint(20) UNSIGNED NOT NULL,
  `batch_number` varchar(30) NOT NULL,
  `quantity` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `unit_price` decimal(10,2) NOT NULL COMMENT 'Price per unit in RWF',
  `expiry_date` date NOT NULL,
  `manufacture_date` date DEFAULT NULL,
  `reorder_level` int(10) UNSIGNED DEFAULT 10,
  `last_restocked_at` timestamp NULL DEFAULT NULL,
  `is_available` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pharmacy_staff`
--

CREATE TABLE `pharmacy_staff` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `pharmacy_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `position` enum('PHARMACIST','ASSISTANT','MANAGER','CASHIER') NOT NULL,
  `hired_at` date NOT NULL,
  `terminated_at` date DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `prescriptions`
--

CREATE TABLE `prescriptions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` char(36) NOT NULL DEFAULT uuid(),
  `consultation_id` bigint(20) UNSIGNED NOT NULL,
  `patient_id` bigint(20) UNSIGNED NOT NULL,
  `doctor_id` bigint(20) UNSIGNED NOT NULL,
  `prescription_number` varchar(30) NOT NULL COMMENT 'Format: RX-YYYYMMDD-XXXXX',
  `status` enum('PENDING','PHARMACY_ACCEPTED','PREPARING','DISPENSED','DELIVERED','CANCELLED','EXPIRED') DEFAULT 'PENDING',
  `total_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `patient_copay` decimal(10,2) DEFAULT 0.00,
  `insurance_coverage` decimal(10,2) DEFAULT 0.00,
  `issued_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `expires_at` datetime NOT NULL COMMENT 'Prescription validity',
  `filled_at` timestamp NULL DEFAULT NULL,
  `pharmacy_id` bigint(20) UNSIGNED DEFAULT NULL COMMENT 'Pharmacy that filled it',
  `pharmacist_id` bigint(20) UNSIGNED DEFAULT NULL,
  `doctor_signature` blob DEFAULT NULL COMMENT 'Digital signature',
  `qr_code` blob DEFAULT NULL COMMENT 'QR code for verification',
  `special_instructions` text DEFAULT NULL,
  `is_renewable` tinyint(1) DEFAULT 0,
  `renewals_allowed` tinyint(4) DEFAULT 0,
  `times_renewed` tinyint(4) DEFAULT 0,
  `ref` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` char(36) NOT NULL DEFAULT uuid(),
  `national_id` varchar(16) NOT NULL COMMENT 'Rwanda National ID',
  `phone` varchar(15) NOT NULL COMMENT 'Format: +250788123456',
  `email` varchar(100) DEFAULT NULL,
  `full_name` varchar(100) NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` enum('MALE','FEMALE','OTHER') NOT NULL,
  `role` enum('PATIENT','DOCTOR','PHARMACIST','DELIVERY_AGENT','INSURER_ADMIN','MOH_ADMIN','SUPER_ADMIN') NOT NULL DEFAULT 'PATIENT',
  `password_hash` varchar(255) NOT NULL COMMENT 'Bcrypt hash',
  `is_active` tinyint(1) DEFAULT 1,
  `is_verified` tinyint(1) DEFAULT 0,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `phone_verified_at` timestamp NULL DEFAULT NULL,
  `last_login_at` timestamp NULL DEFAULT NULL,
  `last_login_ip` varchar(45) DEFAULT NULL,
  `failed_login_attempts` tinyint(4) DEFAULT 0,
  `locked_until` timestamp NULL DEFAULT NULL,
  `two_factor_secret` varchar(32) DEFAULT NULL COMMENT 'TOTP secret for 2FA',
  `two_factor_enabled` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL COMMENT 'Soft delete'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_tokens`
--

CREATE TABLE `user_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `token_hash` varchar(255) NOT NULL,
  `token_type` enum('ACCESS','REFRESH','RESET_PASSWORD','EMAIL_VERIFY') NOT NULL,
  `expires_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `revoked_at` timestamp NULL DEFAULT NULL,
  `device_info` text DEFAULT NULL COMMENT 'User agent, IP, device fingerprint',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `consultations`
--
ALTER TABLE `consultations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`),
  ADD KEY `idx_patient` (`patient_id`,`created_at`),
  ADD KEY `idx_doctor` (`doctor_id`,`status`,`scheduled_at`),
  ADD KEY `idx_status` (`status`,`scheduled_at`);

--
-- Indexes for table `consultation_vitals`
--
ALTER TABLE `consultation_vitals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_consultation` (`consultation_id`);

--
-- Indexes for table `deliveries`
--
ALTER TABLE `deliveries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `license_number` (`license_number`),
  ADD KEY `idx_specialty` (`specialty`),
  ADD KEY `idx_online` (`is_online`,`is_accepting_patients`),
  ADD KEY `idx_rating` (`average_rating`);

--
-- Indexes for table `doctor_availability`
--
ALTER TABLE `doctor_availability`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_doctor_slot` (`doctor_id`,`day_of_week`,`start_time`),
  ADD KEY `idx_doctor_day` (`doctor_id`,`day_of_week`,`is_active`);

--
-- Indexes for table `drug_catalog`
--
ALTER TABLE `drug_catalog`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `drug_code` (`drug_code`),
  ADD KEY `idx_category` (`category`),
  ADD KEY `idx_nhis_covered` (`nhis_covered`);
ALTER TABLE `drug_catalog` ADD FULLTEXT KEY `idx_drug_search` (`generic_name`,`brand_name`);

--
-- Indexes for table `insurance_claims`
--
ALTER TABLE `insurance_claims`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`),
  ADD UNIQUE KEY `claim_number` (`claim_number`),
  ADD KEY `prescription_id` (`prescription_id`),
  ADD KEY `consultation_id` (`consultation_id`),
  ADD KEY `idx_patient` (`patient_id`,`created_at`),
  ADD KEY `idx_insurer` (`insurer_id`,`status`),
  ADD KEY `idx_pharmacy` (`pharmacy_id`,`status`),
  ADD KEY `idx_status` (`status`,`submitted_at`);

--
-- Indexes for table `insurance_coverages`
--
ALTER TABLE `insurance_coverages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nid` (`nid`);

--
-- Indexes for table `insurers`
--
ALTER TABLE `insurers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `nhis_member_id` (`nhis_member_id`),
  ADD KEY `idx_nhis` (`nhis_member_id`),
  ADD KEY `idx_insurer` (`primary_insurer_id`);

--
-- Indexes for table `patient_addresses`
--
ALTER TABLE `patient_addresses`
  ADD PRIMARY KEY (`id`),
  ADD SPATIAL KEY `idx_location` (`location`),
  ADD KEY `idx_patient_default` (`patient_id`,`is_default`);

--
-- Indexes for table `pharmacies`
--
ALTER TABLE `pharmacies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `license_number` (`license_number`),
  ADD KEY `owner_id` (`owner_id`),
  ADD SPATIAL KEY `idx_location` (`location`),
  ADD KEY `idx_active` (`is_active`),
  ADD KEY `idx_district` (`district`);

--
-- Indexes for table `pharmacy_inventory`
--
ALTER TABLE `pharmacy_inventory`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_pharmacy_batch` (`pharmacy_id`,`drug_id`,`batch_number`),
  ADD KEY `drug_id` (`drug_id`),
  ADD KEY `idx_pharmacy_drug` (`pharmacy_id`,`drug_id`),
  ADD KEY `idx_available` (`is_available`,`pharmacy_id`),
  ADD KEY `idx_expiry` (`expiry_date`);

--
-- Indexes for table `pharmacy_staff`
--
ALTER TABLE `pharmacy_staff`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_staff_pharmacy` (`pharmacy_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `prescriptions`
--
ALTER TABLE `prescriptions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`),
  ADD UNIQUE KEY `prescription_number` (`prescription_number`),
  ADD UNIQUE KEY `ref` (`ref`),
  ADD KEY `consultation_id` (`consultation_id`),
  ADD KEY `doctor_id` (`doctor_id`),
  ADD KEY `idx_patient` (`patient_id`,`issued_at`),
  ADD KEY `idx_status` (`status`,`expires_at`),
  ADD KEY `idx_pharmacy` (`pharmacy_id`,`status`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`),
  ADD UNIQUE KEY `national_id` (`national_id`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_phone` (`phone`),
  ADD KEY `idx_national_id` (`national_id`),
  ADD KEY `idx_role` (`role`),
  ADD KEY `idx_active` (`is_active`,`deleted_at`);

--
-- Indexes for table `user_tokens`
--
ALTER TABLE `user_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token_hash` (`token_hash`),
  ADD KEY `idx_user_token` (`user_id`,`token_type`),
  ADD KEY `idx_expires` (`expires_at`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `consultations`
--
ALTER TABLE `consultations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `consultation_vitals`
--
ALTER TABLE `consultation_vitals`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `deliveries`
--
ALTER TABLE `deliveries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `doctor_availability`
--
ALTER TABLE `doctor_availability`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `drug_catalog`
--
ALTER TABLE `drug_catalog`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `insurance_claims`
--
ALTER TABLE `insurance_claims`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `insurance_coverages`
--
ALTER TABLE `insurance_coverages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `insurers`
--
ALTER TABLE `insurers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `patient_addresses`
--
ALTER TABLE `patient_addresses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pharmacies`
--
ALTER TABLE `pharmacies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pharmacy_inventory`
--
ALTER TABLE `pharmacy_inventory`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pharmacy_staff`
--
ALTER TABLE `pharmacy_staff`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `prescriptions`
--
ALTER TABLE `prescriptions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_tokens`
--
ALTER TABLE `user_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `consultations`
--
ALTER TABLE `consultations`
  ADD CONSTRAINT `consultations_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `consultations_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `consultation_vitals`
--
ALTER TABLE `consultation_vitals`
  ADD CONSTRAINT `consultation_vitals_ibfk_1` FOREIGN KEY (`consultation_id`) REFERENCES `consultations` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `doctors`
--
ALTER TABLE `doctors`
  ADD CONSTRAINT `doctors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `doctor_availability`
--
ALTER TABLE `doctor_availability`
  ADD CONSTRAINT `doctor_availability_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `insurance_claims`
--
ALTER TABLE `insurance_claims`
  ADD CONSTRAINT `insurance_claims_ibfk_1` FOREIGN KEY (`prescription_id`) REFERENCES `prescriptions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `insurance_claims_ibfk_2` FOREIGN KEY (`consultation_id`) REFERENCES `consultations` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `insurance_claims_ibfk_3` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `insurance_claims_ibfk_4` FOREIGN KEY (`insurer_id`) REFERENCES `insurers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `insurance_claims_ibfk_5` FOREIGN KEY (`pharmacy_id`) REFERENCES `pharmacies` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `patients`
--
ALTER TABLE `patients`
  ADD CONSTRAINT `patients_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `patient_addresses`
--
ALTER TABLE `patient_addresses`
  ADD CONSTRAINT `patient_addresses_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `pharmacies`
--
ALTER TABLE `pharmacies`
  ADD CONSTRAINT `pharmacies_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `pharmacy_inventory`
--
ALTER TABLE `pharmacy_inventory`
  ADD CONSTRAINT `pharmacy_inventory_ibfk_1` FOREIGN KEY (`pharmacy_id`) REFERENCES `pharmacies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `pharmacy_inventory_ibfk_2` FOREIGN KEY (`drug_id`) REFERENCES `drug_catalog` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pharmacy_staff`
--
ALTER TABLE `pharmacy_staff`
  ADD CONSTRAINT `pharmacy_staff_ibfk_1` FOREIGN KEY (`pharmacy_id`) REFERENCES `pharmacies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `pharmacy_staff_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `prescriptions`
--
ALTER TABLE `prescriptions`
  ADD CONSTRAINT `prescriptions_ibfk_1` FOREIGN KEY (`consultation_id`) REFERENCES `consultations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `prescriptions_ibfk_2` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `prescriptions_ibfk_3` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `prescriptions_ibfk_4` FOREIGN KEY (`pharmacy_id`) REFERENCES `pharmacies` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `user_tokens`
--
ALTER TABLE `user_tokens`
  ADD CONSTRAINT `user_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
