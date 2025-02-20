package com.backend.s21.model.dto.junior;

import com.backend.s21.model.learningPath.Course;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CourseDTO {
    private Integer id;
    private String title;
    private String description;
    private Integer duration;
    private Integer experienceReward;

    public CourseDTO(Course course) {
        this.id = course.getId();
        this.title = course.getTitle();
        this.description = course.getDescription();
        this.duration = course.getDuration();
        this.experienceReward = course.getExperienceReward();
    }
}
