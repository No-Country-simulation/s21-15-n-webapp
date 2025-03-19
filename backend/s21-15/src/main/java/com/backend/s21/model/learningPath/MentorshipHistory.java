package com.backend.s21.model.learningPath;

import com.backend.s21.model.users.JuniorUser;
import com.backend.s21.model.users.MentorUser;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "junior_mentorship_history")
public class MentorshipHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "junior_id", nullable = false)
    private JuniorUser juniorUser;

    @ManyToOne
    @JoinColumn(name = "mentor_id", nullable = false)
    private MentorUser mentorUser;

    @ManyToOne
    @JoinColumn(name = "mentorship_id", nullable = false)
    private Mentorship mentorship;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MentorshipStatus status;

    @Column(name = "started_at", nullable = false)
    private LocalDateTime startedAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    // Enum for status
    public enum MentorshipStatus {
        REQUESTED,
        ACCEPTED,
        COMPLETED,
        CANCELED
    }
}
