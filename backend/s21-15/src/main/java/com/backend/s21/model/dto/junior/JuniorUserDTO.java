package com.backend.s21.model.dto.junior;

import com.backend.s21.model.users.JuniorStack;
import com.backend.s21.model.users.JuniorUser;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class JuniorUserDTO {

    private String nickname;
    private String avatar;
    private String email;
    private LocalDateTime createdAt;
    private String role;

    private String firstName;
    private String lastName;
    private BigDecimal ranking;
    private List<SocialNetworkDTO> socialNetworks;
    private List<CourseHistoryDTO> courseHistory;
    private List<MentorshipHistoryDTO> mentorshipHistory;
    private List<ChallengeHistoryDTO> challengeHistory;
    private List<String> stack;

    // Constructor que recibe un JuniorUser y asigna los valores
    public JuniorUserDTO(JuniorUser juniorUser) {
        this.nickname = juniorUser.getNickname();
        this.avatar = juniorUser.getAvatar();
        this.email = juniorUser.getEmail();
        this.createdAt = juniorUser.getCreatedAt();
        this.role = juniorUser.getRole().name();
        this.firstName = juniorUser.getFirstName();
        this.lastName = juniorUser.getLastName();
        this.ranking = juniorUser.getRanking();

        if (juniorUser.getSocialNetworks() != null) {
            this.socialNetworks = juniorUser.getSocialNetworks()
                    .stream()
                    .map(SocialNetworkDTO::new)
                    .collect(Collectors.toList());
        }
        if (juniorUser.getCourseHistory() != null) {
            this.courseHistory = juniorUser.getCourseHistory()
                    .stream()
                    .map(CourseHistoryDTO::new)
                    .collect(Collectors.toList());
        }

        if (juniorUser.getMentorshipHistory() != null) {
            this.mentorshipHistory = juniorUser.getMentorshipHistory()
                    .stream()
                    .map(MentorshipHistoryDTO::new)
                    .collect(Collectors.toList());
        }

        if (juniorUser.getChallengeHistory() != null) {
            this.challengeHistory = juniorUser.getChallengeHistory()
                    .stream()
                    .map(ChallengeHistoryDTO::new)
                    .collect(Collectors.toList());
        }
        if (juniorUser.getJuniorStack() != null) {
            this.stack = juniorUser.getJuniorStack().stream()
                    .map(JuniorStack::getProgrammingLanguage)
                    .toList();
        }
    }
}

