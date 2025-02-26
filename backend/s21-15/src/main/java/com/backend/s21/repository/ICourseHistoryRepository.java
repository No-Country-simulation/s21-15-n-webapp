package com.backend.s21.repository;

import com.backend.s21.model.learningPath.CourseHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ICourseHistoryRepository extends IGenericRepo<CourseHistory, Integer> {

    Page<CourseHistory> findByJuniorUserId(Pageable pageable, long l);

}
