package com.backend.s21.repository;

import com.backend.s21.model.learningPath.CourseHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseHistoryRepository extends JpaRepository<CourseHistory, Long> {

}
