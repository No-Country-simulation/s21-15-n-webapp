-- -----------------------------------------------------
-- Table `s2115n`.`users`
-- -----------------------------------------------------
    ALTER TABLE users
    ADD COLUMN pin VARCHAR(4)
    CHECK (pin REGEXP '^[0-9]{4}$');
