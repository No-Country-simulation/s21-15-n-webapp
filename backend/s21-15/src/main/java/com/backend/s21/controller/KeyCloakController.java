package com.backend.s21.controller;

import com.backend.s21.security.service.IKeyCloakService;
import com.backend.s21.security.util.model.UserRecord;
import com.backend.s21.service.IAdminUserService;
import com.backend.s21.service.IJuniorUserService;
import com.backend.s21.service.IMentorUserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/api/keycloak")
@Slf4j
@RequiredArgsConstructor
public class KeyCloakController {

    private final IAdminUserService adminService;

    private final IJuniorUserService juniorService;

    private final IMentorUserService mentorService;

    private final IKeyCloakService keyCloakService;

    @PreAuthorize("permitAll()")
    @GetMapping("/users")
    public ResponseEntity<?> findAllUsers() {
        return ResponseEntity.ok(keyCloakService.findAllUsers());
    }

    @PreAuthorize("permitAll()")
    @GetMapping("/user/{username}")
    public ResponseEntity<UserRepresentation> searchUserByUsername(@PathVariable String username) {
        try {
            UserRepresentation user = keyCloakService.searchUserByUsername(username);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PreAuthorize("permitAll()")
    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody UserRecord user) throws URISyntaxException, JsonProcessingException {
        String response = keyCloakService.createUser(user);
        return ResponseEntity.created(new URI("/keycloak/user/" + user.username())).body(response);
    }

    //    @PreAuthorize("hasRole('${swagger.role.admin}')")
    @PreAuthorize("permitAll()")
    @DeleteMapping("delete/{username}")
    public ResponseEntity<?> deleteUser(@PathVariable String username) {
        try {
            keyCloakService.deleteUser(username);
            return ResponseEntity.ok("User deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting user: " + e.getMessage());
        }
    }

    //    @PreAuthorize("hasRole('${swagger.role.admin}')")
    @PreAuthorize("permitAll()")
    @PutMapping("update/user")
    public ResponseEntity<?> updateUser(@RequestBody UserRecord user) {
        try {
            keyCloakService.updateUser(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating user: " + e.getMessage());
        }
        return ResponseEntity.ok("User updated successfully");

    }

    //    @PreAuthorize("false")
    @PutMapping("/user/{username}/role")
    public ResponseEntity<?> changeRole(@PathVariable String username, @RequestParam String role) {
        try {
            keyCloakService.changeRole(username, role);
            return ResponseEntity.ok("Role assigned successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error assigning role: " + e.getMessage());
        }
    }

}
