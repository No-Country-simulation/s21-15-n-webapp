package com.backend.s21.repository;

import com.backend.s21.model.learningPath.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {

}
