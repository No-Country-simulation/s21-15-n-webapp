package com.backend.s21.controller;

import com.backend.s21.model.dto.MentorshipDTO;
import com.backend.s21.service.IMentorshipService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mentorship")
public class MentorshipController {

    private final IMentorshipService mentorshipRepository;

    public MentorshipController(IMentorshipService mentorshipRepository) {
        this.mentorshipRepository = mentorshipRepository;
    }

    @GetMapping
    public ResponseEntity<Page<MentorshipDTO>> showCourseList(Pageable pageable) {
        return ResponseEntity.ok(mentorshipRepository.findAll(pageable).map(MentorshipDTO::new));
    }

}
