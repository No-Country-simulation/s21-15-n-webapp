package com.backend.s21.repository;

import com.backend.s21.model.learningPath.ChallengeHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeHistoryRepository extends JpaRepository<ChallengeHistory, Long> {

}
