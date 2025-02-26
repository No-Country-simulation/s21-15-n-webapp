package com.backend.s21.model.dto;

import com.backend.s21.model.learningPath.MentorshipHistory;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class MentorshipHistoryDTO {
    private Integer id;
    private Integer mentorshipId;
    private String status;
    private LocalDateTime startedAt;
    private LocalDateTime completedAt;
    private MentorshipDTO mentorship;

    public MentorshipHistoryDTO(MentorshipHistory history) {
        this.id = history.getId();
        this.mentorshipId = history.getMentorship().getId();
        this.status = history.getStatus().name();
        this.startedAt = history.getStartedAt();
        this.completedAt = history.getCompletedAt();
        if (history.getMentorship() != null) {
            this.mentorship = new MentorshipDTO(history.getMentorship());
        }
    }
}

