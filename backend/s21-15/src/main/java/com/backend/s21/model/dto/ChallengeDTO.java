package com.backend.s21.model.dto;

import com.backend.s21.model.Challenge;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChallengeDTO {
    private Integer id;
    private String title;
    private String description;
    private String difficulty;
    private Integer experienceReward;

    public ChallengeDTO(Challenge challenge) {
        this.id = challenge.getId();
        this.title = challenge.getTitle();
        this.description = challenge.getDescription();
        this.difficulty = challenge.getDifficulty().name();
        this.experienceReward = challenge.getExperienceReward();
    }
}
