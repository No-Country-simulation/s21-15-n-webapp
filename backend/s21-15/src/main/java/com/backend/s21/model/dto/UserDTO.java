package com.backend.s21.model.dto;

import com.backend.s21.model.users.SocialNetwork;
import com.backend.s21.model.users.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
public class UserDTO {

    private String nickname;
    private String avatar;
    private String email;
    private LocalDateTime createdAt;
    private String pin;
    private User.Role role;

    // Constructor que recibe un User y asigna los valores

    public UserDTO(User user) {
        this.nickname = user.getNickname();
        this.avatar = user.getAvatar();
        this.email = user.getEmail();
        this.createdAt = user.getCreatedAt();
        this.pin = user.getPin();
        this.role = user.getRole();
    }
}
