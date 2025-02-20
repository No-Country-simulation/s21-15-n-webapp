package com.backend.s21.controller;

import com.backend.s21.repository.JuniorUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/junior")
public class JuniorUserController {

    @Autowired
    private JuniorUserRepository juniorRepository;

}
