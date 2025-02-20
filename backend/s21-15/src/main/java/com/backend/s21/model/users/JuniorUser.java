package com.backend.s21.model.users;

import com.backend.s21.model.learningPath.ChallengeHistory;
import com.backend.s21.model.learningPath.CourseHistory;
import com.backend.s21.model.learningPath.MentorshipHistory;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "junior_users")
public class JuniorUser extends User {

    @Column(name = "first_name", nullable = false, length = 100)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 100)
    private String lastName;

    @Column(name = "ranking", precision = 5, scale = 2, columnDefinition = "DECIMAL(5,2) DEFAULT 0.00")
    private BigDecimal ranking = BigDecimal.valueOf(0.00);

    @Column(name = "stack_id")
    private Integer stackId;

    @OneToMany(mappedBy = "juniorUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChallengeHistory> challengeHistory;

    @OneToMany(mappedBy = "juniorUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CourseHistory> courseHistory;

    @OneToMany(mappedBy = "juniorUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MentorshipHistory> mentorshipHistory;

    @OneToMany(mappedBy = "juniorUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<JuniorStack> juniorStack;

}

