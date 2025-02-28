package com.backend.s21.model.dto;

import com.backend.s21.model.users.AdminUser;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AdminUserDTO {

    private String nickname;
    private String avatar;
    private String email;
    private LocalDateTime createdAt;
    private String role;
    private String pin;

    private String firstName;
    private String lastName;


    // Constructor que recibe un JuniorUser y asigna los valores
    public AdminUserDTO(AdminUser adminUser) {
        this.nickname = adminUser.getNickname();
        this.avatar = adminUser.getAvatar();
        this.email = adminUser.getEmail();
        this.createdAt = adminUser.getCreatedAt();
        this.role = adminUser.getRole().name();
        this.pin = adminUser.getPin();
        this.firstName = adminUser.getFirstName();
        this.lastName = adminUser.getLastName();
    }
}

