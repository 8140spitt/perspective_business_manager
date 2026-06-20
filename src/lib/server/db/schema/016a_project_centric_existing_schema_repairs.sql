-- PBM v1 project-centric ERP: repair existing prototype tables before views
-- The migration runner replays every SQL file. These statements safely add v1 columns
-- when a developer database already has earlier prototype tables created manually.

SET @schema_name := DATABASE();

-- ------------------------------------------------------------
-- project repairs
-- ------------------------------------------------------------

SELECT COUNT(*) INTO @has_col FROM information_schema.columns WHERE table_schema = @schema_name AND table_name = 'project' AND column_name = 'project_type_code';
SET @sql := IF(@has_col = 0, 'ALTER TABLE project ADD COLUMN project_type_code VARCHAR(100) NULL', 'SELECT ''project.project_type_code exists'' AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SELECT COUNT(*) INTO @has_col FROM information_schema.columns WHERE table_schema = @schema_name AND table_name = 'project' AND column_name = 'project_state_code';
SET @sql := IF(@has_col = 0, 'ALTER TABLE project ADD COLUMN project_state_code VARCHAR(100) NOT NULL DEFAULT ''enquiry''', 'SELECT ''project.project_state_code exists'' AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SELECT COUNT(*) INTO @has_col FROM information_schema.columns WHERE table_schema = @schema_name AND table_name = 'project' AND column_name = 'primary_client_business_partner_id';
SET @sql := IF(@has_col = 0, 'ALTER TABLE project ADD COLUMN primary_client_business_partner_id BIGINT UNSIGNED NULL', 'SELECT ''project.primary_client_business_partner_id exists'' AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SELECT COUNT(*) INTO @has_col FROM information_schema.columns WHERE table_schema = @schema_name AND table_name = 'project' AND column_name = 'enquiry_date';
SET @sql := IF(@has_col = 0, 'ALTER TABLE project ADD COLUMN enquiry_date DATE NULL', 'SELECT ''project.enquiry_date exists'' AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SELECT COUNT(*) INTO @has_col FROM information_schema.columns WHERE table_schema = @schema_name AND table_name = 'project' AND column_name = 'expected_start_date';
SET @sql := IF(@has_col = 0, 'ALTER TABLE project ADD COLUMN expected_start_date DATE NULL', 'SELECT ''project.expected_start_date exists'' AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SELECT COUNT(*) INTO @has_col FROM information_schema.columns WHERE table_schema = @schema_name AND table_name = 'project' AND column_name = 'expected_completion_date';
SET @sql := IF(@has_col = 0, 'ALTER TABLE project ADD COLUMN expected_completion_date DATE NULL', 'SELECT ''project.expected_completion_date exists'' AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SELECT COUNT(*) INTO @has_col FROM information_schema.columns WHERE table_schema = @schema_name AND table_name = 'project' AND column_name = 'actual_start_date';
SET @sql := IF(@has_col = 0, 'ALTER TABLE project ADD COLUMN actual_start_date DATE NULL', 'SELECT ''project.actual_start_date exists'' AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SELECT COUNT(*) INTO @has_col FROM information_schema.columns WHERE table_schema = @schema_name AND table_name = 'project' AND column_name = 'actual_completion_date';
SET @sql := IF(@has_col = 0, 'ALTER TABLE project ADD COLUMN actual_completion_date DATE NULL', 'SELECT ''project.actual_completion_date exists'' AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SELECT COUNT(*) INTO @has_col FROM information_schema.columns WHERE table_schema = @schema_name AND table_name = 'project' AND column_name = 'description';
SET @sql := IF(@has_col = 0, 'ALTER TABLE project ADD COLUMN description TEXT NULL', 'SELECT ''project.description exists'' AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SELECT COUNT(*) INTO @has_col FROM information_schema.columns WHERE table_schema = @schema_name AND table_name = 'project' AND column_name = 'notes';
SET @sql := IF(@has_col = 0, 'ALTER TABLE project ADD COLUMN notes TEXT NULL', 'SELECT ''project.notes exists'' AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SELECT COUNT(*) INTO @has_col FROM information_schema.columns WHERE table_schema = @schema_name AND table_name = 'project' AND column_name = 'created_at';
SET @sql := IF(@has_col = 0, 'ALTER TABLE project ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP', 'SELECT ''project.created_at exists'' AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SELECT COUNT(*) INTO @has_col FROM information_schema.columns WHERE table_schema = @schema_name AND table_name = 'project' AND column_name = 'updated_at';
SET @sql := IF(@has_col = 0, 'ALTER TABLE project ADD COLUMN updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP', 'SELECT ''project.updated_at exists'' AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- ------------------------------------------------------------
-- project_quote repairs
-- ------------------------------------------------------------

SELECT COUNT(*) INTO @has_col FROM information_schema.columns WHERE table_schema = @schema_name AND table_name = 'project_quote' AND column_name = 'quote_type_code';
SET @sql := IF(@has_col = 0, 'ALTER TABLE project_quote ADD COLUMN quote_type_code VARCHAR(100) NOT NULL DEFAULT ''fee_proposal''', 'SELECT ''project_quote.quote_type_code exists'' AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SELECT COUNT(*) INTO @has_col FROM information_schema.columns WHERE table_schema = @schema_name AND table_name = 'project_quote' AND column_name = 'quote_status_code';
SET @sql := IF(@has_col = 0, 'ALTER TABLE project_quote ADD COLUMN quote_status_code VARCHAR(100) NOT NULL DEFAULT ''draft''', 'SELECT ''project_quote.quote_status_code exists'' AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SELECT COUNT(*) INTO @has_col FROM information_schema.columns WHERE table_schema = @schema_name AND table_name = 'project_quote' AND column_name = 'issue_date';
SET @sql := IF(@has_col = 0, 'ALTER TABLE project_quote ADD COLUMN issue_date DATE NULL', 'SELECT ''project_quote.issue_date exists'' AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SELECT COUNT(*) INTO @has_col FROM information_schema.columns WHERE table_schema = @schema_name AND table_name = 'project_quote' AND column_name = 'expiry_date';
SET @sql := IF(@has_col = 0, 'ALTER TABLE project_quote ADD COLUMN expiry_date DATE NULL', 'SELECT ''project_quote.expiry_date exists'' AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SELECT COUNT(*) INTO @has_col FROM information_schema.columns WHERE table_schema = @schema_name AND table_name = 'project_quote' AND column_name = 'accepted_date';
SET @sql := IF(@has_col = 0, 'ALTER TABLE project_quote ADD COLUMN accepted_date DATE NULL', 'SELECT ''project_quote.accepted_date exists'' AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SELECT COUNT(*) INTO @has_col FROM information_schema.columns WHERE table_schema = @schema_name AND table_name = 'project_quote' AND column_name = 'rejected_date';
SET @sql := IF(@has_col = 0, 'ALTER TABLE project_quote ADD COLUMN rejected_date DATE NULL', 'SELECT ''project_quote.rejected_date exists'' AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SELECT COUNT(*) INTO @has_col FROM information_schema.columns WHERE table_schema = @schema_name AND table_name = 'project_quote' AND column_name = 'subtotal_amount';
SET @sql := IF(@has_col = 0, 'ALTER TABLE project_quote ADD COLUMN subtotal_amount DECIMAL(18,2) NULL', 'SELECT ''project_quote.subtotal_amount exists'' AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SELECT COUNT(*) INTO @has_col FROM information_schema.columns WHERE table_schema = @schema_name AND table_name = 'project_quote' AND column_name = 'tax_amount';
SET @sql := IF(@has_col = 0, 'ALTER TABLE project_quote ADD COLUMN tax_amount DECIMAL(18,2) NULL', 'SELECT ''project_quote.tax_amount exists'' AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SELECT COUNT(*) INTO @has_col FROM information_schema.columns WHERE table_schema = @schema_name AND table_name = 'project_quote' AND column_name = 'total_amount';
SET @sql := IF(@has_col = 0, 'ALTER TABLE project_quote ADD COLUMN total_amount DECIMAL(18,2) NULL', 'SELECT ''project_quote.total_amount exists'' AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SELECT COUNT(*) INTO @has_col FROM information_schema.columns WHERE table_schema = @schema_name AND table_name = 'project_quote' AND column_name = 'currency_code';
SET @sql := IF(@has_col = 0, 'ALTER TABLE project_quote ADD COLUMN currency_code CHAR(3) NOT NULL DEFAULT ''GBP''', 'SELECT ''project_quote.currency_code exists'' AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- ------------------------------------------------------------
-- project delivery table repairs
-- ------------------------------------------------------------

SELECT COUNT(*) INTO @has_col FROM information_schema.columns WHERE table_schema = @schema_name AND table_name = 'project_contact' AND column_name = 'is_active';
SET @sql := IF(@has_col = 0, 'ALTER TABLE project_contact ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT TRUE', 'SELECT ''project_contact.is_active exists'' AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SELECT COUNT(*) INTO @has_col FROM information_schema.columns WHERE table_schema = @schema_name AND table_name = 'project_assignment' AND column_name = 'is_primary';
SET @sql := IF(@has_col = 0, 'ALTER TABLE project_assignment ADD COLUMN is_primary BOOLEAN NOT NULL DEFAULT FALSE', 'SELECT ''project_assignment.is_primary exists'' AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SELECT COUNT(*) INTO @has_col FROM information_schema.columns WHERE table_schema = @schema_name AND table_name = 'project_assignment' AND column_name = 'is_active';
SET @sql := IF(@has_col = 0, 'ALTER TABLE project_assignment ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT TRUE', 'SELECT ''project_assignment.is_active exists'' AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SELECT COUNT(*) INTO @has_col FROM information_schema.columns WHERE table_schema = @schema_name AND table_name = 'project_service' AND column_name = 'status_code';
SET @sql := IF(@has_col = 0, 'ALTER TABLE project_service ADD COLUMN status_code VARCHAR(100) NOT NULL DEFAULT ''required''', 'SELECT ''project_service.status_code exists'' AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- ------------------------------------------------------------
-- finance table repairs used by dashboard views
-- ------------------------------------------------------------

SELECT COUNT(*) INTO @has_col FROM information_schema.columns WHERE table_schema = @schema_name AND table_name = 'sales_invoice' AND column_name = 'subtotal_amount';
SET @sql := IF(@has_col = 0, 'ALTER TABLE sales_invoice ADD COLUMN subtotal_amount DECIMAL(18,2) NULL', 'SELECT ''sales_invoice.subtotal_amount exists'' AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SELECT COUNT(*) INTO @has_col FROM information_schema.columns WHERE table_schema = @schema_name AND table_name = 'sales_invoice' AND column_name = 'total_amount';
SET @sql := IF(@has_col = 0, 'ALTER TABLE sales_invoice ADD COLUMN total_amount DECIMAL(18,2) NULL', 'SELECT ''sales_invoice.total_amount exists'' AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SELECT COUNT(*) INTO @has_col FROM information_schema.columns WHERE table_schema = @schema_name AND table_name = 'supplier_invoice' AND column_name = 'subtotal_amount';
SET @sql := IF(@has_col = 0, 'ALTER TABLE supplier_invoice ADD COLUMN subtotal_amount DECIMAL(18,2) NULL', 'SELECT ''supplier_invoice.subtotal_amount exists'' AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SELECT COUNT(*) INTO @has_col FROM information_schema.columns WHERE table_schema = @schema_name AND table_name = 'supplier_invoice' AND column_name = 'total_amount';
SET @sql := IF(@has_col = 0, 'ALTER TABLE supplier_invoice ADD COLUMN total_amount DECIMAL(18,2) NULL', 'SELECT ''supplier_invoice.total_amount exists'' AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
