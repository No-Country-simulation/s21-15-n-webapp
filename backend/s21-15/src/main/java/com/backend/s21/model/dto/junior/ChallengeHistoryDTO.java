package com.backend.s21.model.dto.junior;

import com.backend.s21.model.learningPath.ChallengeHistory;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ChallengeHistoryDTO {
    private Integer id;
    private String status;
    private LocalDateTime startedAt;
    private LocalDateTime completedAt;
    private ChallengeDTO challenge; // Incluye la información completa del desafío

    public ChallengeHistoryDTO(ChallengeHistory history) {
        this.id = history.getId();
        this.status = history.getStatus().name();
        this.startedAt = history.getStartedAt();
        this.completedAt = history.getCompletedAt();

        if (history.getChallenge() != null) {
            this.challenge = new ChallengeDTO(history.getChallenge());
        }
    }
}


