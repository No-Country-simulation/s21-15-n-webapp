package com.backend.s21.model.learningPath;

import com.backend.s21.model.users.MentorUser;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "mentorships")
public class Mentorship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "mentor_id", nullable = false)
    private MentorUser mentor;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "experience_reward")
    private Integer experienceReward;

    public Mentorship(MentorUser mentor, Mentorship mentorship) {
        this.mentor = mentor;
        this.title = mentorship.getTitle();
        this.description = mentorship.getDescription();
    }
}

