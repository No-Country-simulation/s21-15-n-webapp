package com.backend.s21.controller;

import com.backend.s21.security.service.IKeyCloakService;
import com.backend.s21.security.util.model.UserRecord;
import com.backend.s21.service.IAdminUserService;
import com.backend.s21.service.IJuniorUserService;
import com.backend.s21.service.IMentorUserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Administración de Usuarios Keycloak", description = "Operaciones para administrar usuarios en Keycloak")
public class KeyCloakController {

    private final IAdminUserService adminService;

    private final IJuniorUserService juniorService;

    private final IMentorUserService mentorService;

    private final IKeyCloakService keyCloakService;

    @PreAuthorize("permitAll()")
    @GetMapping("/users")
    @Operation(summary = "Listar todos los usuarios", description = "Recupera una lista de todos los usuarios en Keycloak.")
    @ApiResponse(responseCode = "200", description = "Lista de usuarios recuperada", content = @Content(mediaType = "application/json", schema = @Schema(type = "array", implementation = UserRepresentation.class)))
    public ResponseEntity<?> findAllUsers() {
        return ResponseEntity.ok(keyCloakService.findAllUsers());
    }

    @PreAuthorize("permitAll()")
    @GetMapping("/user/{username}")
    @Operation(summary = "Buscar usuario por nombre de usuario", description = "Recupera la información de un usuario específico por su nombre de usuario.")
    @ApiResponse(responseCode = "200", description = "Usuario encontrado", content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserRepresentation.class)))
    @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    public ResponseEntity<UserRepresentation> searchUserByUsername(@Parameter(description = "Nombre de usuario", required = true) @PathVariable String username) {
        try {
            UserRepresentation user = keyCloakService.searchUserByUsername(username);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PreAuthorize("permitAll()")
    @PostMapping("/user")
    @Operation(summary = "Crear un usuario", description = "Crea un nuevo usuario en Keycloak.")
    @ApiResponse(responseCode = "201", description = "Usuario creado", content = @Content(mediaType = "text/plain"))
    @ApiResponse(responseCode = "400", description = "Solicitud inválida")
    public ResponseEntity<?> createUser(@RequestBody UserRecord user) throws URISyntaxException, JsonProcessingException {
        String response = keyCloakService.createUser(user);
        return ResponseEntity.created(new URI("/keycloak/user/" + user.username())).body(response);
    }

    //    @PreAuthorize("hasRole('${swagger.role.admin}')")
    @PreAuthorize("hasRole('admin')")
    @DeleteMapping("user/{username}")
    @Operation(summary = "Eliminar un usuario", description = "Elimina un usuario de Keycloak.")
    @ApiResponse(responseCode = "200", description = "Usuario eliminado")
    @ApiResponse(responseCode = "500", description = "Error al eliminar el usuario")
    public ResponseEntity<?> deleteUser(@Parameter(description = "Nombre de usuario", required = true) @PathVariable String username) {
        try {
            keyCloakService.deleteUser(username);
            return ResponseEntity.ok("User deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting user: " + e.getMessage());
        }
    }

    //    @PreAuthorize("hasRole('${swagger.role.admin}')")
    @PreAuthorize("permitAll()")
    @PutMapping("/user")
    @Operation(summary = "Actualizar un usuario", description = "Actualiza la información de un usuario existente en Keycloak.")
    @ApiResponse(responseCode = "200", description = "Usuario actualizado")
    @ApiResponse(responseCode = "500", description = "Error al actualizar el usuario")
    public ResponseEntity<?> updateUser(@RequestBody UserRecord user) {
        try {
            keyCloakService.updateUser(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating user: " + e.getMessage());
        }
        return ResponseEntity.ok("User updated successfully");

    }

    //    @PreAuthorize("false")
//    @PutMapping("/user/{username}/role")
//    @Operation(summary = "Cambiar el rol de un usuario", description = "Asigna o cambia el rol de un usuario en Keycloak.")
//    @ApiResponse(responseCode = "200", description = "Rol asignado correctamente")
//    @ApiResponse(responseCode = "500", description = "Error al asignar el rol")
//    public ResponseEntity<?> changeRole(@Parameter(description = "Nombre de usuario", required = true) @PathVariable String username, @RequestParam String role) {
//        try {
//            keyCloakService.changeRole(username, role);
//            return ResponseEntity.ok("Role assigned successfully");
//        } catch (RuntimeException e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error assigning role: " + e.getMessage());
//        }
//    }

}
