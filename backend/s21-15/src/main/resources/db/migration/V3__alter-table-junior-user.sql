ALTER TABLE junior_users DROP COLUMN stack_id;
ALTER TABLE junior_users ADD COLUMN country VARCHAR(50);
-- Add any country -- remove for production
UPDATE junior_users SET country = 'Belize' WHERE country IS NULL;

