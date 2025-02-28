package com.backend.s21.controller;

import com.backend.s21.model.dto.ChallengeDTO;
import com.backend.s21.service.IChallengeService;
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
    private IChallengeService IChallengeRepository;

    @GetMapping
    public ResponseEntity<Page<ChallengeDTO>> showChallengeList(Pageable pageable) {
        return ResponseEntity.ok(IChallengeRepository.findAll(pageable).map(ChallengeDTO::new));
    }
}
