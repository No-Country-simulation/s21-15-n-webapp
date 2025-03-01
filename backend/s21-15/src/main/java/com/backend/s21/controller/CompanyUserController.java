package com.backend.s21.controller;

import com.backend.s21.model.users.CompanyUser;
import com.backend.s21.service.ICompanyUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/company")
public class CompanyUserController {

    private final ICompanyUserService companyRepository;

    public CompanyUserController(ICompanyUserService companyRepository) {
        this.companyRepository = companyRepository;
    }

    @PostMapping
    public ResponseEntity<CompanyUser> registerCompanyUser(@RequestBody @Validated CompanyUser companyJson,
                                                           UriComponentsBuilder uri) {
        CompanyUser companyUser = companyRepository.save(companyJson);
        URI url = uri.path("/company/{nickname}").buildAndExpand(companyUser.getNickname()).toUri();
        return ResponseEntity.created(url).body(companyUser);
    }

//    @GetMapping("/{nickname}")
//    public ResponseEntity<CompanyUser> showCompanyUser(@PathVariable String nickname){
//        try {
//            CompanyUser user = companyRepository.getReferenceByNickname(nickname);
//            if (user != null) {
//                return ResponseEntity.ok(user);
//            } else {
//                return ResponseEntity.badRequest().build();
//            }
//        } catch (RuntimeException e) {
//            return ResponseEntity.badRequest().build();
//        }
//    }
}
