package com.backend.s21.controller;

import com.backend.s21.repository.CompanyUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/company")
public class CompanyUserController {

    @Autowired
    CompanyUserRepository companyRepository;

}
