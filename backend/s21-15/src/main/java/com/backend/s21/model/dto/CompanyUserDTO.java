package com.backend.s21.model.dto;

import com.backend.s21.model.users.CompanyUser;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class CompanyUserDTO {

    private String nickname;
    private String avatar;
    private String email;
    private LocalDateTime createdAt;
    private String role;
    private String pin;
    private String name;
    private String country;

    // Constructor que recibe un CompanyUser y asigna los valores
    public CompanyUserDTO(CompanyUser companyUser) {
        this.nickname = companyUser.getNickname();
        this.avatar = companyUser.getAvatar();
        this.email = companyUser.getEmail();
        this.createdAt = companyUser.getCreatedAt();
        this.role = companyUser.getRole().name();
        this.pin = companyUser.getPin();
        this.name = companyUser.getCompanyName();
        this.country = companyUser.getCountry();
    }
}

