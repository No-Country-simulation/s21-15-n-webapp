package com.backend.s21.repository;

import com.backend.s21.model.learningPath.MentorshipHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MentorshipHistoryRepository extends JpaRepository<MentorshipHistory, Long> {

    Page<MentorshipHistory> findByJuniorUserId(Pageable pageable, Long id);
}
