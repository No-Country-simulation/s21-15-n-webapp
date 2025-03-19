-- -----------------------------------------------------
-- Table `s2115n`.`junior_users`
-- -----------------------------------------------------
ALTER TABLE junior_users ADD COLUMN streak INT DEFAULT 0;


-- -----------------------------------------------------
-- Stored procedure `s2115n`.`UpdateStreaks`
-- -----------------------------------------------------
DELIMITER $$
CREATE PROCEDURE UpdateStreaks()
BEGIN
    -- Actualizar la racha de los usuarios que completaron un reto hoy
    UPDATE junior_users ju
    SET ju.streak = ju.streak + 1
    WHERE ju.id IN (
        SELECT DISTINCT junior_id
        FROM junior_challenge_history
        WHERE DATE(completed_at) = CURDATE()
        AND status = 'COMPLETED'
    );

    -- Reiniciar la racha de los usuarios que no completaron un reto hoy
    UPDATE junior_users ju
    SET ju.streak = 0
    WHERE ju.id NOT IN (
        SELECT DISTINCT junior_id
        FROM junior_challenge_history
        WHERE DATE(completed_at) = CURDATE()
        AND status = 'COMPLETED'
    );
END $$
DELIMITER ;

SET GLOBAL event_scheduler = ON;

DELIMITER $$

CREATE EVENT UpdateStreakEvent
ON SCHEDULE EVERY 1 DAY
STARTS TIMESTAMP(CURRENT_DATE, '00:00:00')
DO CALL UpdateStreaks();
$$
DELIMITER ;

