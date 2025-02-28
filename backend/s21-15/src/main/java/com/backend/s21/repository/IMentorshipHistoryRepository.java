package com.backend.s21.repository;

import com.backend.s21.model.learningPath.MentorshipHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IMentorshipHistoryRepository extends IGenericRepo<MentorshipHistory, Integer> {

    Page<MentorshipHistory> findByJuniorUserId(Pageable pageable, Integer id);
}
