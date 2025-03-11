package com.backend.s21.security.service.impl;

import com.backend.s21.model.users.*;
import com.backend.s21.security.factory.UserFactory;
import com.backend.s21.security.jwt.JWTResponse;
import com.backend.s21.security.service.IKeyCloakService;
import com.backend.s21.security.util.KeyCloak;
import com.backend.s21.security.util.model.UserRecord;
import com.backend.s21.service.IAdminUserService;
import com.backend.s21.service.ICompanyUserService;
import com.backend.s21.service.IJuniorUserService;
import com.backend.s21.service.IMentorUserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.ws.rs.core.Response;
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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Slf4j
@Service
public class KeyCloakServiceImpl implements IKeyCloakService {

    private final KeyCloak keyService;
    private RestTemplate restTemplate;
    private UserRecord userRecord;
    @Value("${keycloak.idResource}")
    private String clientId;
    @Value("${keycloak.client-secret}")
    private String clientSecret;
    @Value("${keycloak.url.token}")
    private String tokenUrl;

    private final IJuniorUserService juniorService;
    private final IAdminUserService adminService;
    private final IMentorUserService mentorService;
    private final ICompanyUserService companyService;

    public KeyCloakServiceImpl(KeyCloak keyService, IJuniorUserService juniorService, IAdminUserService adminService, IMentorUserService mentorService, ICompanyUserService companyService) {
        this.keyService = keyService;
        this.juniorService = juniorService;
        this.adminService = adminService;
        this.mentorService = mentorService;
        this.companyService = companyService;
    }

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
                    .stream()
                    .filter(x -> x.isEnabled())
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("User not found"));
        } catch (Exception e) {
            throw new RuntimeException("Error to get user by username");
        }
    }

    @Override
    @Transactional
    public String createUser(UserRecord user) throws JsonProcessingException {
        UsersResource usersResource = keyService.getUserResource();
        UserRepresentation userRepresentation = createUserRepresentation(user);
        try (Response response = usersResource.create(userRepresentation)) {
            return userCreationWithResponse(user, response, usersResource);
        }
    }

    @Transactional
    @Override
    public void deleteUser(String username) {
        try {
            String existingUser = searchUserByUsername(username).getId();
            if (existingUser != null) {
                UserResource userResource =
                        keyService.getUserResource().get(existingUser);
                UserRepresentation user = userResource.toRepresentation();
                user.setEnabled(false);
                userResource.update(user);
                log.info("User {} deleted successfully", username);
            }
        } catch (RuntimeException e) {
            log.error("Error deleting user {}: {}", username, e.getMessage());
            throw new RuntimeException("Error deleting user ID not found: " + e.getMessage());
        }
    }

    @Override
    public void updateUser(UserRecord user) {
        try {
            UserRepresentation existingUser = searchUserByUsername(user.username());
            if (existingUser != null) {
                UserResource usersResource =
                        keyService.getUserResource().get(existingUser.getId());
                UserRepresentation userRepresentation = usersResource.toRepresentation();
                validateInfoOfUser(user, userRepresentation);
                usersResource.update(userRepresentation);
            }
            log.info("User {} updated successfully", user.username());
        } catch (RuntimeException e) {
            log.error("Error updating user {}: {}", user.username(), e.getMessage());
            throw new RuntimeException("Error updating user: " + e.getMessage(), e);
        }
    }

    private void validateInfoOfUser(UserRecord user, UserRepresentation userRepresentation) {
        Optional.ofNullable(user.roles())
                .filter(roles -> !roles.isEmpty())
                .ifPresent(roles -> roles.stream().findFirst().ifPresent(role -> changeRole(user.username(), role)));

        Optional.ofNullable(user.email())
                .filter(email -> !email.isBlank())
                .ifPresent(userRepresentation::setEmail);

        Optional.ofNullable(user.username())
                .filter(username -> !username.isBlank())
                .ifPresent(userRepresentation::setUsername);

        Optional.ofNullable(user.lastName())
                .filter(lastName -> !lastName.isBlank())
                .ifPresent(userRepresentation::setLastName);

        Optional.ofNullable(user.password())
                .filter(password -> !password.isBlank())
                .map(this::getCredentialRepresentation)
                .ifPresent(cred -> userRepresentation.setCredentials(List.of(cred)));
    }

    @Override
    public void changeRole(String username, String role) {

        try {
            UserRepresentation user = searchUserByUsername(username);
            UserResource userResource = keyService.getUserResource().get(user.getId());
            if (user != null) {
                List<RoleRepresentation> currentRoles = userResource.roles().realmLevel().listAll();
                if (!currentRoles.isEmpty()) {
                    userResource.roles().realmLevel().remove(currentRoles);
                }
            }
            RoleResource newRoleResource = keyService.getRealmResource().roles().get(role.toLowerCase());
            userResource.roles().realmLevel().add(List.of(newRoleResource.toRepresentation()));

        } catch (RuntimeException e) {
            log.error("Error assigning role {} to user {}: {}", role, username, e.getMessage());
            throw new RuntimeException("Error assigning role to user: " + e.getMessage(), e);
        }
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

    private String userCreationWithResponse(UserRecord user, Response response, UsersResource usersResource) {
        int status = response.getStatus();
        response.close();
        if (status == 201) {
            String idUser = getIdUser(response);
            processUserCreation(user, idUser, usersResource);
            return "User created successfully!!";
        } else if (status == 409) {
            log.error("User already exists!");
            return "User already exists!";
        } else {
            log.error("Error creating user, please contact the administrator.");
            return "Error creating user, please contact the administrator.";
        }
    }

    private void processUserCreation(UserRecord user, String idUser, UsersResource usersResource) {
        RealmResource realmResource = keyService.getRealmResource();
        List<RoleRepresentation> roleRepresentations = assignRoles(user.roles(), realmResource, idUser);
        UserRepresentation
                representation = usersResource.get(idUser).toRepresentation();
        saveInstanceOfClass(UserFactory.createUser(roleRepresentations, representation,user.pin()));
    }

    private void saveInstanceOfClass(User newUser) {
        if (newUser instanceof AdminUser) {
            adminService.save((AdminUser) newUser);
        } else if (newUser instanceof JuniorUser) {
            juniorService.save((JuniorUser) newUser);
        } else if (newUser instanceof MentorUser) {
            mentorService.save((MentorUser) newUser);
        } else if (newUser instanceof CompanyUser) {
            companyService.save((CompanyUser) newUser);
        }
    }

    private String getIdUser(Response response) {
        if (response.getLocation() != null) {
            String path = response.getLocation().getPath();
            String idUser = path.substring(path.lastIndexOf("/") + 1);
            return idUser;
        }
        throw new IllegalStateException("Response does not contain a location header");
    }

    private UserRepresentation createUserRepresentation(UserRecord user) {
        UserRepresentation userRepresentation = new UserRepresentation();
        userRepresentation.setEmail(user.email());
        userRepresentation.setUsername(user.username());
        userRepresentation.setFirstName(
                Optional.ofNullable(user.firstName())
                        .filter(name -> !name.isBlank())
                        .orElse(user.username())
        );
        userRepresentation.setLastName(
                Optional.ofNullable(user.lastName())
                        .filter(name -> !name.isBlank())
                        .orElse(user.username())
        );
        userRepresentation.setEnabled(true);
        userRepresentation.setEmailVerified(true);
        userRepresentation.setCredentials(List.of(getCredentialRepresentation(user.password())));
        return userRepresentation;
    }

    private List<RoleRepresentation> assignRoles(Set<String> roles, RealmResource realmResource, String idUser) {
        List<RoleRepresentation> rolesRepresentation;
        if (roles == null || roles.isEmpty()) {
            log.info("No roles assigned, assigning default role");
            rolesRepresentation = List.of(realmResource.roles().get("junior").toRepresentation());
        } else {
            rolesRepresentation = realmResource.roles()
                    .list()
                    .stream()
                    .filter(role -> roles.stream().anyMatch(roleName -> roleName.equalsIgnoreCase(role.getName())))
                    .toList();
        }
        try {
            realmResource.users()
                    .get(idUser)
                    .roles().realmLevel()
                    .add(rolesRepresentation);
            log.info("Roles assigned successfully to user ID: " + idUser);
        } catch (Exception e) {
            log.error("User ID not found in Keycloak when assigning roles: " + idUser, e);
            throw new IllegalStateException("User ID not found in Keycloak when assigning roles: " + idUser);
        }
        return rolesRepresentation;
    }

    private CredentialRepresentation getCredentialRepresentation(String password) {
        CredentialRepresentation credentialRepresentation = new CredentialRepresentation();
        credentialRepresentation.setType(CredentialRepresentation.PASSWORD);
        credentialRepresentation.setValue(password);
        credentialRepresentation.setTemporary(false);
        return credentialRepresentation;
    }


}
