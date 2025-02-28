package com.backend.s21.model.users;
import com.backend.s21.model.learningPath.MentorshipHistory;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "mentor_users")
public class MentorUser extends User {

    @Column(name = "first_name", length = 100)
    private String firstName;

    @Column(name = "last_name", length = 100)
    private String lastName;

    @OneToMany(mappedBy = "mentorUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MentorshipHistory> mentorshipHistory;
}

