package com.backend.s21.model.dto;

import com.backend.s21.model.learningPath.Mentorship;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MentorshipDTO {
    private Integer id;
    private String title;
    private String description;
    private Integer experienceReward;

    public MentorshipDTO(Mentorship mentorship) {
        this.id = mentorship.getId();
        this.title = mentorship.getTitle();
        this.description = mentorship.getDescription();
        this.experienceReward = mentorship.getExperienceReward();
    }
}

