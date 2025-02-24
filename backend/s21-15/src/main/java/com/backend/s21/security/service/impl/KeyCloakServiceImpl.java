package com.backend.s21.security.service.impl;

import com.backend.s21.security.jwt.JWTResponse;
import com.backend.s21.security.service.IKeyCloakService;
import com.backend.s21.security.util.model.UserRecord;
import lombok.RequiredArgsConstructor;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RequiredArgsConstructor
public class KeyCloakServiceImpl implements IKeyCloakService {

    private final IKeyCloakService keyService;
    private RestTemplate restTemplate;

    @Override
    public List<UserRepresentation> findAllUsers() {
        return keyService.findAllUsers().stream().toList();
    }

    @Override
    public UserRepresentation searchUserByUsername(String username) {
        return keyService.searchUserByUsername(username);
    }

    @Override
    public String createUser(UserRecord userRecord) {

        return "";
    }

    @Override
    public JWTResponse login(String username, String password) {
        return null;
    }

    @Override
    public void deleteUser(String username) {

    }

    @Override
    public void changeRole(String username, String role) {

    }

    @Override
    public void changePassword(String idUser, String password) {

    }

    @Override
    public void changeEmail(String username, String email) {

    }

    @Override
    public void updateUser(UserRecord userRecord) {

    }
}
