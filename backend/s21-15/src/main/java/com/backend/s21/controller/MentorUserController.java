package com.backend.s21.controller;

import com.backend.s21.repository.MentorUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mentor")
public class MentorUserController {

    @Autowired
    private MentorUserRepository mentorRepository;

}
