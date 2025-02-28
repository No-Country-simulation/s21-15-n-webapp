package com.backend.s21.security.service;

import com.backend.s21.security.jwt.JWTResponse;
import com.backend.s21.security.util.model.UserRecord;
import org.keycloak.representations.idm.UserRepresentation;

import java.util.List;

public interface IKeyCloakService {

    List<UserRepresentation> findAllUsers();
    UserRepresentation searchUserByUsername(String username);
    String createUser(UserRecord userRecord);
    JWTResponse login(String username, String password);
    void deleteUser(String username);
    void updateUser(UserRecord user);
    void changeRole(String username, String role);
    void changePassword(String idUser, String password);
    void changeEmail(String username, String email);
}
