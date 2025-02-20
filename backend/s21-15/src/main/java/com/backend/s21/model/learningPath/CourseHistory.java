package com.backend.s21.model.learningPath;

import com.backend.s21.model.users.JuniorUser;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "junior_course_history")
public class CourseHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "junior_id", referencedColumnName = "id", nullable = false)
    private JuniorUser juniorUser;

    @ManyToOne
    @JoinColumn(name = "course_id", referencedColumnName = "id", nullable = false)
    private Course course;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CourseStatus status = CourseStatus.PENDING;

    @Column(name = "started_at", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime startedAt = LocalDateTime.now();

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    public enum CourseStatus {
        PENDING,
        IN_PROGRESS,
        COMPLETED,
        WITHDRAWN
    }
}

