package com.backend.s21.controller;

import com.backend.s21.model.users.CompanyUser;
import com.backend.s21.repository.CompanyUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/company")
public class CompanyUserController {

    @Autowired
    private CompanyUserRepository companyRepository;

    @PostMapping
    public ResponseEntity<CompanyUser> registerCompanyUser(@RequestBody @Validated CompanyUser infoCompany, UriComponentsBuilder uri) {
        CompanyUser companyUser = companyRepository.save(infoCompany);
        URI url = uri.path("/company/{nickname}").buildAndExpand(companyUser.getNickname()).toUri();
        return ResponseEntity.created(url).body(companyUser);
    }

    @GetMapping("/{nickname}")
    public ResponseEntity<CompanyUser> showCompanyUser(@PathVariable String nickname){
        try {
            CompanyUser user = companyRepository.getReferenceByNickname(nickname);
            if (user != null) {
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.badRequest().build();
            }
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
