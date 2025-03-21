package com.backend.s21.repository;

import com.backend.s21.model.learningPath.ChallengeHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IChallengeHistoryRepository extends IGenericRepo<ChallengeHistory, Integer> {

    Page<ChallengeHistory> findByJuniorUserId(Pageable pageable, Integer l);
}
