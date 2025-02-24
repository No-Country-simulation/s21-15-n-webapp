package com.backend.s21.repository;

import com.backend.s21.model.learningPath.CourseHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseHistoryRepository extends JpaRepository<CourseHistory, Long> {

    Page<CourseHistory> findByJuniorUserId(Pageable pageable, long l);

}
