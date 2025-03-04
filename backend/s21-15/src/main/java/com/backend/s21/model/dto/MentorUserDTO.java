package com.backend.s21.model.dto;

import com.backend.s21.model.users.MentorUser;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class MentorUserDTO {

    private String nickname;
    private String avatar;
    private String email;
    private LocalDateTime createdAt;
    private String role;
    private String pin;

    private String firstName;
    private String lastName;

    private List<MentorshipHistoryDTO> mentorshipHistory;


    // Constructor que recibe un MentorUser y asigna los valores
    public MentorUserDTO(MentorUser mentorUser) {
        this.nickname = mentorUser.getNickname();
        this.avatar = mentorUser.getAvatar();
        this.email = mentorUser.getEmail();
        this.createdAt = mentorUser.getCreatedAt();
        this.role = mentorUser.getRole().name();
        this.pin = mentorUser.getPin();
        this.firstName = mentorUser.getFirstName();
        this.lastName = mentorUser.getLastName();

        if (mentorUser.getMentorshipHistory() != null) {
            this.mentorshipHistory = mentorUser.getMentorshipHistory()
                    .stream()
                    .map(MentorshipHistoryDTO::new)
                    .collect(Collectors.toList());
        }
    }
}

