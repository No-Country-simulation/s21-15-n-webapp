package com.backend.s21.controller;

import com.backend.s21.model.dto.junior.ChallengeDTO;
import com.backend.s21.repository.ChallengeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/challenges")
public class ChallengeControlller {

    @Autowired
    private ChallengeRepository challengeRepository;

    @GetMapping
    public ResponseEntity<Page<ChallengeDTO>> showChallengeList(Pageable pageable) {
        return ResponseEntity.ok(challengeRepository.findAll(pageable).map(ChallengeDTO::new));
    }
}
