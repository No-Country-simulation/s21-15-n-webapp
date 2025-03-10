package com.backend.s21.controller;

import com.backend.s21.model.dto.AdminUserDTO;
import com.backend.s21.model.dto.ChallengeDTO;
import com.backend.s21.model.dto.JuniorUserDTO;
import com.backend.s21.model.dto.SocialNetworkDTO;
import com.backend.s21.model.learningPath.Challenge;
import com.backend.s21.model.users.AdminUser;
import com.backend.s21.model.users.SocialNetwork;
import com.backend.s21.model.users.User;
import com.backend.s21.service.IAdminUserService;
import com.backend.s21.service.IChallengeService;
import com.backend.s21.service.IJuniorUserService;
import com.backend.s21.service.ISocialNetworkService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.lang.reflect.InvocationTargetException;
import java.net.URI;

@RestController
@RequestMapping("/admin")
@Tag(name = "Administradores", description = "Operaciones relacionadas con administradores")
public class AdminUserController {

    private final IAdminUserService adminService;

    private final IChallengeService challengeService;

    private final IJuniorUserService juniorService;

    private final ISocialNetworkService socialNetworkService;

    public AdminUserController(IAdminUserService adminService, IJuniorUserService juniorService, IChallengeService challengeService, ISocialNetworkService socialNetworkService) {
        this.adminService = adminService;
        this.juniorService = juniorService;
        this.challengeService = challengeService;
        this.socialNetworkService = socialNetworkService;
    }

    @PostMapping
    @Operation(summary = "Registrar un usuario administrador", description = "Crea un nuevo usuario administrador en el sistema.")
    @ApiResponse(responseCode = "201", description = "Usuario administrador creado", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AdminUser.class)))
    @ApiResponse(responseCode = "400", description = "Solicitud inválida")
    public ResponseEntity<?> registerAdminUser(@RequestBody @Validated AdminUser user, UriComponentsBuilder uri) {
        try {
            AdminUser adminUser = adminService.save(user);
            URI url = uri.path("/admin/{id}").buildAndExpand(adminUser.getId()).toUri();
            return ResponseEntity.created(url).body(new AdminUserDTO(adminUser));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener un usuario administrador por ID", description = "Recupera la información de un usuario administrador específico por su ID.")
    @ApiResponse(responseCode = "200", description = "Usuario administrador encontrado", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AdminUser.class)))
    @ApiResponse(responseCode = "404", description = "Usuario administrador no encontrado")
    public ResponseEntity<?> showUser(@Parameter(description = "ID del usuario administrador", required = true) @PathVariable int id) {
        try {
            AdminUser user = adminService.findById(id);
            return ResponseEntity.ok(new AdminUserDTO(user));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<?> updateUser(@RequestBody @Valid AdminUser userJson, @PathVariable int id) {
        try {
            AdminUser user = adminService.update(userJson, id);
            return ResponseEntity.ok(new AdminUserDTO(user));
        } catch (InvocationTargetException | NoSuchMethodException | IllegalAccessException | RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable int id) {
        try {
            AdminUser user = adminService.findById(id);
            user.setDeleted(true);
            return ResponseEntity.ok("El usuario ha sido eliminado con exito.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{ida}/challengelist/createchallenge")
    @Operation(summary = "Crear un desafío para un administrador", description = "Crea un nuevo desafío asociado a un administrador específico.")
    @ApiResponse(responseCode = "201", description = "Desafío creado", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ChallengeDTO.class)))
    @ApiResponse(responseCode = "400", description = "Solicitud inválida")
    public ResponseEntity<?> createChallenge(@RequestBody @Validated Challenge challengeinfo, @Parameter(description = "ID del usuario administrador", required = true) @PathVariable int ida,
                                                        UriComponentsBuilder uri) {
        try {
            Challenge challenge = challengeService.save(challengeinfo);
            ChallengeDTO challengeDTO = new ChallengeDTO(challenge);
            URI url = uri.path("/{ida}/challengelist/{id}").buildAndExpand(ida, challengeDTO.getId()).toUri();
            return ResponseEntity.created(url).body(challengeDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{ida}/challengelist/{id}")
    public ResponseEntity<?> showChallenge(@PathVariable int id) {
        try {
            return ResponseEntity.ok(new ChallengeDTO(challengeService.findById(id)));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{ida}/challengelist/{id}")
    @Transactional
    public ResponseEntity<?> updateChallenge(@PathVariable int id, @RequestBody @Valid Challenge challengeJson) {
        try {
            Challenge challenge = challengeService.update(challengeJson, id);
            return ResponseEntity.ok(new ChallengeDTO(challenge));
        } catch (InvocationTargetException | NoSuchMethodException | IllegalAccessException | RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{ida}/challengelist/{id}")
    public ResponseEntity<String> deleteChallenge(@PathVariable int id) {
        try {
            String challengeName = challengeService.findById(id).getTitle();
            return ResponseEntity.ok("El reto "+challengeName+", ha sido eliminado con exito.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}/challengelist")
    public ResponseEntity<Page<ChallengeDTO>> showChallengeList(Pageable pageable) {
        try {
            return ResponseEntity.ok(challengeService.findAll(pageable).map(ChallengeDTO::new));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}/juniorlist")
    @Operation(summary = "Listar usuarios junior de un administrador", description = "Recupera la lista de usuarios junior asociados a un administrador específico.")
    @ApiResponse(responseCode = "200", description = "Lista de usuarios junior recuperada", content = @Content(mediaType = "application/json", schema = @Schema(implementation = JuniorUserDTO.class)))
    @ApiResponse(responseCode = "404", description = "Lista usuarios junior no encontrado")
    public ResponseEntity<Page<JuniorUserDTO>> showJuniorUserList(Pageable pageable) {
        try {
            return ResponseEntity.ok(juniorService.findAll(pageable).map(JuniorUserDTO::new));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/{id}/socialnetworks")
    public ResponseEntity<?> linkSocialNetwork(@RequestBody @Valid SocialNetwork socialNet,
                                               @PathVariable int id) {
        try {
            User user = adminService.findById(id);
            SocialNetwork socialNetwork = socialNetworkService.save(new SocialNetwork(null, user, socialNet.getName(),
                    socialNet.getUrl()));
            return ResponseEntity.ok(new SocialNetworkDTO(socialNetwork));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
