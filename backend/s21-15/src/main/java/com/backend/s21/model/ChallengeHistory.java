package com.backend.s21.model;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "junior_challenge_history")
public class ChallengeHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "junior_id", nullable = false)
    private JuniorUser juniorUser;

    @ManyToOne
    @JoinColumn(name = "challenge_id", nullable = false)
    private Challenge challenge;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ChallengeStatus status = ChallengeStatus.PENDING;

    @Column(name = "started_at", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime startedAt = LocalDateTime.now();

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    public enum ChallengeStatus {
        PENDING, IN_PROGRESS, COMPLETED, WITHDRAWN
    }
}

