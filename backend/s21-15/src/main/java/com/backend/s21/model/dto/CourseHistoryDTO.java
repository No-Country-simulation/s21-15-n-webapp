package com.backend.s21.model.dto;

import com.backend.s21.model.learningPath.CourseHistory;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class CourseHistoryDTO {
    private Integer id;
    private Integer courseId;
    private String status;
    private LocalDateTime startedAt;
    private LocalDateTime completedAt;
    private CourseDTO course;

    public CourseHistoryDTO(CourseHistory history) {
        this.id = history.getId();
        this.courseId = history.getCourse().getId();
        this.status = history.getStatus().name();
        this.startedAt = history.getStartedAt();
        this.completedAt = history.getCompletedAt();

        if (history.getCourse() != null) {
            this.course = new CourseDTO(history.getCourse());
        }
    }
}

