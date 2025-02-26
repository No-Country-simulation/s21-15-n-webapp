package com.backend.s21.repository;

import com.backend.s21.model.learningPath.ChallengeHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeHistoryRepository extends IGenericRepo<ChallengeHistory, Long> {

    Page<ChallengeHistory> findByJuniorUserId(Pageable pageable, long l);
}
