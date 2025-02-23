
-- -----------------------------------------------------
-- Table `s2115n`.`challenges`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `s2115n`.`challenges` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `difficulty` ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED'),
  `experience_reward` INT NULL DEFAULT '0',
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`));

-- -----------------------------------------------------
-- Table `s2115n`.`users`
-- -----------------------------------------------------
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    keycloak_id VARCHAR(255) UNIQUE NULL DEFAULT NULL,
    nickname VARCHAR(50) NOT NULL UNIQUE,
    avatar VARCHAR(255) NULL DEFAULT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    role ENUM('ADMIN', 'COMPANY', 'JUNIOR', 'MENTOR') NOT NULL,
    deleted BOOLEAN NOT NULL DEFAULT FALSE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- -----------------------------------------------------
-- Table `s2115n`.`junior_users`
-- -----------------------------------------------------
CREATE TABLE junior_users (
    id INT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    ranking DECIMAL(5,2) DEFAULT 0.00,
    country VARCHAR(50),
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table `s2115n`.`mentor_users`
-- -----------------------------------------------------
CREATE TABLE mentor_users (
    id INT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table `s2115n`.`courses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `s2115n`.`courses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `instructor_id` INT,
  `duration` INT NULL DEFAULT NULL,
  `experience_reward` INT NULL DEFAULT '0',
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `instructor_id` (`instructor_id` ASC) VISIBLE,
  CONSTRAINT `courses_ibfk_1`
    FOREIGN KEY (`instructor_id`)
    REFERENCES `s2115n`.`users` (`id`)
    ON DELETE CASCADE);

-- -----------------------------------------------------
-- Table `s2115n`.`mentorships`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `s2115n`.`mentorships` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `mentor_id` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `experience_reward` INT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  CONSTRAINT `mentorships_ibfk_1`
    FOREIGN KEY (`mentor_id`)
    REFERENCES `s2115n`.`mentor_users` (`id`)
    ON DELETE CASCADE);

-- -----------------------------------------------------
-- Table `s2115n`.`social_networks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `s2115n`.`social_networks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `url` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
 CONSTRAINT `social_networks_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `s2115n`.`users` (`id`)
    ON DELETE CASCADE);

-- -----------------------------------------------------
-- Table `s2115n`.`user_challenge_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `s2115n`.`junior_challenge_history` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `junior_id` INT NOT NULL,
  `challenge_id` INT NOT NULL,
  `status` ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED', 'WITHDRAWN') NULL DEFAULT 'PENDING',
  `started_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `completed_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `user_challenge_history_ibfk_1`
    FOREIGN KEY (`junior_id`)
    REFERENCES `s2115n`.`junior_users` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `user_challenge_history_ibfk_2`
    FOREIGN KEY (`challenge_id`)
    REFERENCES `s2115n`.`challenges` (`id`)
    ON DELETE CASCADE);

-- -----------------------------------------------------
-- Table `s2115n`.`user_course_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `s2115n`.`junior_course_history` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `junior_id` INT NOT NULL,
  `course_id` INT NOT NULL,
  `status` ENUM('PENDING', 'IN_PROGRES', 'COMPLETED', 'WITHDRAWN') NULL DEFAULT 'PENDING',
  `started_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `completed_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `user_course_history_ibfk_1`
    FOREIGN KEY (`junior_id`)
    REFERENCES `s2115n`.`junior_users` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `user_course_history_ibfk_2`
    FOREIGN KEY (`course_id`)
    REFERENCES `s2115n`.`courses` (`id`)
    ON DELETE CASCADE);

-- -----------------------------------------------------
-- Table `s2115n`.`user_mentorship_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `s2115n`.`junior_mentorship_history` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `junior_id` INT NOT NULL,
    `mentorship_id` INT NOT NULL,
    `status` ENUM('REQUESTED', 'ACCEPTED', 'COMPLETED', 'CANCELED') NULL DEFAULT 'REQUESTED',
    `started_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    `completed_at` DATETIME NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `user_mentorship_history_ibfk_1` FOREIGN KEY (`junior_id`)
        REFERENCES `s2115n`.`junior_users` (`id`)
        ON DELETE CASCADE,
    CONSTRAINT `user_mentorship_history_ibfk_2` FOREIGN KEY (`mentorship_id`)
        REFERENCES `s2115n`.`mentorships` (`id`)
        ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table `s2115n`.`admin_users`
-- -----------------------------------------------------
CREATE TABLE admin_users (
    id INT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table `s2115n`.`company_users`
-- -----------------------------------------------------
CREATE TABLE company_users (
    id INT PRIMARY KEY,
    company_name VARCHAR(150) NOT NULL,
    country VARCHAR(100) NOT NULL,
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table `s2115n`.`junior_stacks`
-- -----------------------------------------------------
CREATE TABLE junior_stacks (
    id_junior INT NOT NULL,
    programming_language VARCHAR(50) NOT NULL,
    PRIMARY KEY (id_junior, programming_language),
    FOREIGN KEY (id_junior) REFERENCES junior_users(id) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- TRIGGERS
-- -----------------------------------------------------
-- trigger update_junior_ranking_from_challenge
-- -----------------------------------------------------
DELIMITER $$

CREATE TRIGGER update_junior_ranking_from_challenge
AFTER UPDATE ON junior_challenge_history
FOR EACH ROW
BEGIN
    -- Verificar si el challenge se completó en esta actualización
    IF NEW.status = 'Completed' AND OLD.status <> 'Completed' THEN
        -- Actualizar el ranking del usuario sumando el experience_reward del challenge completado
        UPDATE junior_users j
        JOIN challenges c ON NEW.challenge_id = c.id
        SET j.ranking = j.ranking + c.experience_reward
        WHERE j.id = NEW.junior_id;
    END IF;
END $$

DELIMITER ;

-- -----------------------------------------------------
-- trigger update_junior_ranking_from_mentorship
-- -----------------------------------------------------
DELIMITER $$

CREATE TRIGGER update_junior_ranking_from_mentorship
AFTER UPDATE ON junior_mentorship_history
FOR EACH ROW
BEGIN
    -- Verificar si la mentoría se completó en esta actualización
    IF NEW.status = 'Completed' AND OLD.status <> 'Completed' THEN
        -- Actualizar el ranking del usuario sumando el experience_reward de la mentoría completada
        UPDATE junior_users j
        JOIN mentorships m ON NEW.mentorship_id = m.id
        SET j.ranking = j.ranking + m.experience_reward
        WHERE j.id = NEW.junior_id;
    END IF;
END $$

DELIMITER ;

-- -----------------------------------------------------
-- trigger update_junior_ranking_from_course
-- -----------------------------------------------------
DELIMITER $$

CREATE TRIGGER update_junior_ranking_from_course
AFTER UPDATE ON junior_course_history
FOR EACH ROW
BEGIN
    -- Verificar si el curso se completó en esta actualización
    IF NEW.status = 'Completed' AND OLD.status <> 'Completed' THEN
        -- Actualizar el ranking del usuario sumando el experience_reward del curso completado
        UPDATE junior_users j
        JOIN courses c ON NEW.course_id = c.id
        SET j.ranking = j.ranking + c.experience_reward
        WHERE j.id = NEW.junior_id;
    END IF;
END $$

DELIMITER ;