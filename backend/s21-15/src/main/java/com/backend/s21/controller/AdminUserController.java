package com.backend.s21.controller;

import com.backend.s21.model.dto.ChallengeDTO;
import com.backend.s21.model.dto.JuniorUserDTO;
import com.backend.s21.model.learningPath.Challenge;
import com.backend.s21.model.users.AdminUser;
import com.backend.s21.model.users.JuniorUser;
import com.backend.s21.service.IAdminUserService;
import com.backend.s21.service.IChallengeService;
import com.backend.s21.service.IJuniorUserService;
import com.backend.s21.service.IMentorUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/admin")
@Tag(name = "Administradores", description = "Operaciones relacionadas con administradores")
public class AdminUserController {

    private final IAdminUserService adminService;

    private final IChallengeService IChallengeService;

    private final IJuniorUserService juniorService;

    private final IMentorUserService mentorService;

    public AdminUserController(IAdminUserService adminService, IMentorUserService mentorService, IJuniorUserService juniorService, IChallengeService IChallengeService) {
        this.adminService = adminService;
        this.mentorService = mentorService;
        this.juniorService = juniorService;
        this.IChallengeService = IChallengeService;
    }

    @PostMapping
    @Operation(summary = "Registrar un usuario administrador", description = "Crea un nuevo usuario administrador en el sistema.")
    @ApiResponse(responseCode = "201", description = "Usuario administrador creado", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AdminUser.class)))
    @ApiResponse(responseCode = "400", description = "Solicitud inválida")
    public ResponseEntity<AdminUser> registerAdminUser(@RequestBody @Validated AdminUser user, UriComponentsBuilder uri) {
        AdminUser adminUser = adminService.save(user);
        URI url = uri.path("/admin/{id}").buildAndExpand(adminUser.getId()).toUri();
        return ResponseEntity.created(url).body(adminUser);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener un usuario administrador por ID", description = "Recupera la información de un usuario administrador específico por su ID.")
    @ApiResponse(responseCode = "200", description = "Usuario administrador encontrado", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AdminUser.class)))
    @ApiResponse(responseCode = "404", description = "Usuario administrador no encontrado")
    public ResponseEntity<AdminUser> showUser(@Parameter(description = "ID del usuario administrador", required = true) @PathVariable int id) {
        AdminUser user = adminService.findById(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/{id}/createchallenge")
    @Operation(summary = "Crear un desafío para un administrador", description = "Crea un nuevo desafío asociado a un administrador específico.")
    @ApiResponse(responseCode = "201", description = "Desafío creado", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ChallengeDTO.class)))
    @ApiResponse(responseCode = "400", description = "Solicitud inválida")
    public ResponseEntity<ChallengeDTO> createChallenge(@RequestBody @Validated Challenge challengeinfo, @Parameter(description = "ID del usuario administrador", required = true) @PathVariable int id,
                                                        UriComponentsBuilder uri) {
        Challenge challenge = IChallengeService.save(challengeinfo);
        ChallengeDTO challengeDTO = new ChallengeDTO(challenge);
        URI url = uri.path("/challenge/{id}").buildAndExpand(challengeDTO.getId()).toUri();
        return ResponseEntity.created(url).body(challengeDTO);
    }

    @GetMapping("/{id}/juniorlist")
    @Operation(summary = "Listar usuarios junior de un administrador", description = "Recupera la lista de usuarios junior asociados a un administrador específico.")
    @ApiResponse(responseCode = "200", description = "Lista de usuarios junior recuperada", content = @Content(mediaType = "application/json", schema = @Schema(implementation = JuniorUserDTO.class)))
    @ApiResponse(responseCode = "404", description = "Usuario administrador no encontrado")
    public ResponseEntity<Page<JuniorUserDTO>> showJuniorUserList(@Parameter(description = "ID del usuario administrador", required = true) @PathVariable int id) {
        List<JuniorUser> juniorList = juniorService.findAll();
        return ResponseEntity.ok(new PageImpl<>(juniorList, org.springframework.data.domain.Pageable.unpaged(),
                juniorList.size()).map(JuniorUserDTO::new));
    }

}
