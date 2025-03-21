-- -----------------------------------------------------
-- Table `s2115n`.`junior_users`
-- -----------------------------------------------------
    ALTER TABLE junior_users
    MODIFY COLUMN first_name VARCHAR(100) NULL,
    MODIFY COLUMN last_name VARCHAR(100) NULL;

-- -----------------------------------------------------
-- Table `s2115n`.`mentor_users`
-- -----------------------------------------------------
    ALTER TABLE mentor_users
    MODIFY COLUMN first_name VARCHAR(100) NULL,
    MODIFY COLUMN last_name VARCHAR(100) NULL;

-- -----------------------------------------------------
-- Table `s2115n`.`admin_users`
-- -----------------------------------------------------
    ALTER TABLE admin_users
    MODIFY COLUMN first_name VARCHAR(100) NULL,
    MODIFY COLUMN last_name VARCHAR(100) NULL;
