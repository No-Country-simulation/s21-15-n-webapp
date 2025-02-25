package com.backend.s21.security.service.impl;

import com.backend.s21.security.jwt.JWTResponse;
import com.backend.s21.security.service.IKeyCloakService;
import com.backend.s21.security.util.KeyCloak;
import com.backend.s21.security.util.model.UserRecord;
import jakarta.ws.rs.core.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.RoleResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RequiredArgsConstructor
@Slf4j
public class KeyCloakServiceImpl implements IKeyCloakService {

    private final KeyCloak keyService;
    private RestTemplate restTemplate;
    private UserRecord userRecord;
    @Value("${keycloak.client-id}")
    private String clientId;
    @Value("${keycloak.client-secret}")
    private String clientSecret;
    @Value("${keycloak.token-url}")
    private String tokenUrl;

    @Override
    public List<UserRepresentation> findAllUsers() {
        try {
            return keyService.getUserResource().list();
        } catch (Exception e) {
            throw new RuntimeException("Error to get all users");
        }
    }

    @Override
    public UserRepresentation searchUserByUsername(String username) {
        try {
            return keyService
                    .getUserResource()
                    .search(username)
                    .stream().findFirst()
                    .orElseThrow(() -> new RuntimeException("User not found"));
        } catch (Exception e) {
            throw new RuntimeException("Error to get user by username");
        }
    }

    @Override
    public String createUser(UserRecord user) {

        UsersResource usersResource = keyService.getUserResource();
        UserRepresentation userRepresentation = getUserRepresentation(user);

        try (Response response = usersResource.create(userRepresentation)) {
            int status = response.getStatus();

            if (status == 201) {
                String path = response.getLocation().getPath();
                String idUser = path.substring(path.lastIndexOf("/") + 1);

                // Asignar la contraseña al usuario
                CredentialRepresentation credentialRepresentation = getCredentialRepresentation(user);
                usersResource.get(idUser)
                        .resetPassword(credentialRepresentation);

                RealmResource realmResource = keyService.getRealmResource();
                List<RoleRepresentation> rolesRepresentation = null;
                // Asignar roles al usuario
                assignRoles(user, realmResource, idUser);
                UserRepresentation representation = usersResource.get(idUser).toRepresentation();
                log.info("Id creacion de usuario"+ representation.getId());

                return "User created successfully!!";
            } else if (status == 409) {
                log.error("User already exists!");
                return "User already exists!";
            } else {
                log.error("Error creating user, please contact the administrator.");
                return "Error creating user, please contact the administrator.";
            }
        }
    }

    private static void assignRoles(UserRecord user, RealmResource realmResource, String idUser) {
        List<RoleRepresentation> rolesRepresentation;
        if (user.roles() == null || user.roles().isEmpty() ) {
            rolesRepresentation = List.of(realmResource.roles().get("user").toRepresentation()); //default role
        } else {
            rolesRepresentation = realmResource.roles()
                    .list()
                    .stream()
                    .filter(role -> user.roles()
                            .stream()
                            .anyMatch(roleName -> roleName.equalsIgnoreCase(role.getName())))
                    .toList();
        }
        realmResource.users()
                .get(idUser)
                .roles().realmLevel()
                .add(rolesRepresentation);
    }

    private static UserRepresentation getUserRepresentation(UserRecord user) {
        UserRepresentation userRepresentation = new UserRepresentation();
        userRepresentation.setFirstName(user.firstName());
        userRepresentation.setLastName(user.lastName());
        userRepresentation.setEmail(user.email());
        userRepresentation.setUsername(user.username());
        userRepresentation.setEnabled(true);
        userRepresentation.setEmailVerified(true);
        return userRepresentation;
    }

    public JWTResponse login(String username, String password) {

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("grant_type", "password");
        map.add("client_id", clientId);
        map.add("client_secret", clientSecret);
        map.add("username", username);
        map.add("password", password);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);

        try {
            ResponseEntity<JWTResponse> response = restTemplate.postForEntity(tokenUrl, request, JWTResponse.class);
            if (response.getStatusCode() == HttpStatus.OK) {
                JWTResponse responseBody = response.getBody();
                if (responseBody != null) {
                    return responseBody;
                } else {
                    throw new RuntimeException("Response body is null");
                }
            } else {
                throw new RuntimeException("Invalid credentials");
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to login", e);
        }
    }

    @Transactional
    @Override
    public void deleteUser(String username) {
        try {
            String userId = searchUserByUsername(username).getId();
            if (userId != null) {
                keyService.getUserResource()
                        .get(userId)
                        .remove();
//                userService.deleteByIdKeycloak(userId);
                log.info("User {} deleted successfully", username);
            }
        } catch (RuntimeException e) {
            log.error("Error deleting user {}: {}", username, e.getMessage());
            throw new RuntimeException("Error deleting user: " + e.getMessage(), e);
        }
    }

    @Override
    public void updateUser(UserRecord user) {
        try {
            // Buscar usuario por nombre de usuario
            UserRepresentation existingUser = searchUserByUsername(user.username());
//            String idUserDB = userService.findByIdKeycloak(existingUser.getId()).getIdKeycloak();
            if (existingUser == null) {
                throw new RuntimeException("User not found: " + user.username());
            }
            CredentialRepresentation credentialRepresentation = getCredentialRepresentation(user);
            UserRepresentation userRepresentation = getUserRepresentation(user);
            userRepresentation.setCredentials(List.of(credentialRepresentation));
            UserResource usersResource = keyService.getUserResource().get(existingUser.getId());
            assignRoles(user, keyService.getRealmResource(), existingUser.getId());
//            builders = com.back.model.entities.User.builder()
//                    .name(user.firstName())
//                    .email(user.email())
//                    .idKeycloak(userRepresentation.getId())
//                    .roles(user.roles())
//                    .build();
//            userService.updateUser(idUserDB, builders);
            usersResource.update(userRepresentation);

            log.info("User {} updated successfully", user.username());
        } catch (RuntimeException e) {
            log.error("Error updating user {}: {}", user.username(), e.getMessage());
            throw new RuntimeException("Error updating user: " + e.getMessage(), e);
        }
    }

    private static CredentialRepresentation getCredentialRepresentation(UserRecord user) {
        CredentialRepresentation credentialRepresentation = new CredentialRepresentation();
        credentialRepresentation.setType(CredentialRepresentation.PASSWORD);
        credentialRepresentation.setValue(user.password());
        credentialRepresentation.setTemporary(false);
        return credentialRepresentation;
    }

    @Override
    public void changeRole(String username, String role) {

        // Implementar lógica para cambiar el rol del usuario (In progress)
        try {
            // Buscar usuario por nombre de usuario
            UserRepresentation user = searchUserByUsername(username);
            // Obtener el rol del realm
            RoleResource roleBasic = keyService.getRealmResource().roles().get(role);
            // Asignar el rol al usuario a nivel de realm
            keyService.getUserResource()
                    .get(user.getId())
                    .roles()
                    .realmLevel()
                    .add(List.of(roleBasic.toRepresentation()));
        } catch (RuntimeException e) {
            // Registrar y lanzar cualquier excepción que ocurra
            log.error("Error assigning role {} to user {}: {}", role, username, e.getMessage());
            throw new RuntimeException("Error assigning role to user: " + e.getMessage(), e);
        }
    }

    @Override
    public void changePassword(String idUser, String password) {

//        UsersResource usersResource = keyService.getUserResource();
//        CredentialRepresentation credentialRepresentation = new CredentialRepresentation();
//        credentialRepresentation.setTemporary(false);
//        credentialRepresentation.setType(CredentialRepresentation.PASSWORD);
//        credentialRepresentation.setValue(password);
//
//        usersResource.get(idUser).resetPassword(credentialRepresentation);
    }

    @Override
    public void changeEmail(String username, String email) {
        // Implementar lógica para cambiar el email del usuario si es necesario
    }

}
