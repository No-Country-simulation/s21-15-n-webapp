package com.backend.s21.controller;

import com.backend.s21.model.dto.*;
import com.backend.s21.model.learningPath.Challenge;
import com.backend.s21.model.users.AdminUser;
import com.backend.s21.model.users.SocialNetwork;
import com.backend.s21.model.users.User;
import com.backend.s21.service.*;
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

    private final IMentorUserService mentorRepository;

    private final ICompanyUserService companyRepository;

    public AdminUserController(IAdminUserService adminService, IChallengeService challengeService, IJuniorUserService juniorService,
                               ISocialNetworkService socialNetworkService, IMentorUserService mentorRepository, ICompanyUserService companyRepository) {
        this.adminService = adminService;
        this.challengeService = challengeService;
        this.juniorService = juniorService;
        this.socialNetworkService = socialNetworkService;
        this.mentorRepository = mentorRepository;
        this.companyRepository = companyRepository;
    }

    @PostMapping
    @Operation(summary = "Registrar un usuario administrador", description = "Crea un nuevo usuario administrador en el sistema.")
    @ApiResponse(responseCode = "201", description = "Usuario administrador creado", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AdminUserDTO.class)))
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
    @ApiResponse(responseCode = "200", description = "Usuario administrador encontrado", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AdminUserDTO.class)))
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
    @Operation(summary = "Actualizar un usuario administrador por ID", description = "Actualiza la información de un usuario administrador específico por su ID.")
    @ApiResponse(responseCode = "200", description = "Usuario administrador actualizado", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AdminUserDTO.class)))
    @ApiResponse(responseCode = "404", description = "Usuario administrador no encontrado")
    public ResponseEntity<?> updateUser(@RequestBody @Valid AdminUser userJson, @PathVariable int id) {
        try {
            AdminUser user = adminService.update(userJson, id);
            return ResponseEntity.ok(new AdminUserDTO(user));
        } catch (InvocationTargetException | NoSuchMethodException | IllegalAccessException | RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/admin/{id}")
    @Operation(summary = "Elimina un usuario administrador por ID", description = "Elimina a un usuario administrador específico por su ID.")
    @ApiResponse(responseCode = "200", description = "Usuario administrador eliminado", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AdminUserDTO.class)))
    @ApiResponse(responseCode = "404", description = "Usuario administrador no encontrado")
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
    @Operation(summary = "Crear un desafío por un administrador", description = "Crea un nuevo desafío asociado a un administrador específico.")
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
    @Operation(summary = "Muestra un desafío desde la pagina de administrador", description = "Muestra la información de un desafío por su ID desde de un usuario administrador específico.")
    @ApiResponse(responseCode = "200", description = "Desafío encontrado", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ChallengeDTO.class)))
    @ApiResponse(responseCode = "404", description = "Desafío no encontrado")
    public ResponseEntity<?> showChallenge(@PathVariable int id) {
        try {
            return ResponseEntity.ok(new ChallengeDTO(challengeService.findById(id)));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{ida}/challengelist/{id}")
    @Transactional
    @Operation(summary = "Actualiza un desafío desde la pagina de administrador", description = "Actualiza la información de un desafío por su ID desde de un usuario administrador específico.")
    @ApiResponse(responseCode = "200", description = "Desafío actualizado", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ChallengeDTO.class)))
    @ApiResponse(responseCode = "404", description = "Solicitud inválida")
    public ResponseEntity<?> updateChallenge(@PathVariable int id, @RequestBody @Valid Challenge challengeJson) {
        try {
            Challenge challenge = challengeService.update(challengeJson, id);
            return ResponseEntity.ok(new ChallengeDTO(challenge));
        } catch (InvocationTargetException | NoSuchMethodException | IllegalAccessException | RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{ida}/challengelist/{id}")
    @Operation(summary = "Elimina un desafío desde la pagina de administrador", description = "Elimina la información de un desafío por su ID desde de un usuario administrador específico.")
    @ApiResponse(responseCode = "200", description = "Desafío eliminado", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ChallengeDTO.class)))
    @ApiResponse(responseCode = "404", description = "Desafío no encontrado")
    public ResponseEntity<String> deleteChallenge(@PathVariable int id) {
        try {
            String challengeName = challengeService.findById(id).getTitle();
            return ResponseEntity.ok("El reto "+challengeName+", ha sido eliminado con exito.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}/challengelist")
    @Operation(summary = "Listar desafíos", description = "Recupera la lista de desafíos asociados a un administrador específico.")
    @ApiResponse(responseCode = "200", description = "Lista de desafíos recuperada", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ChallengeDTO.class)))
    @ApiResponse(responseCode = "404", description = "Lista de desafíos no encontrado")
    public ResponseEntity<Page<ChallengeDTO>> showChallengeList(Pageable pageable) {
        try {
            return ResponseEntity.ok(challengeService.findAll(pageable).map(ChallengeDTO::new));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}/juniorlist")
    @Operation(summary = "Listar usuarios junior", description = "Recupera la lista de usuarios junior desde un administrador específico.")
    @ApiResponse(responseCode = "200", description = "Lista de usuarios junior recuperada", content = @Content(mediaType = "application/json", schema = @Schema(implementation = JuniorUserDTO.class)))
    @ApiResponse(responseCode = "404", description = "Lista usuarios junior no encontrado")
    public ResponseEntity<Page<JuniorUserDTO>> showJuniorUserList(Pageable pageable) {
        try {
            return ResponseEntity.ok(juniorService.findAll(pageable).map(JuniorUserDTO::new));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}/mentorlist")
    @Operation(summary = "Listar usuarios mentor", description = "Recupera la lista de usuarios mentor desde un administrador específico.")
    @ApiResponse(responseCode = "200", description = "Lista de usuarios mentor recuperada", content = @Content(mediaType = "application/json", schema = @Schema(implementation = MentorUserDTO.class)))
    @ApiResponse(responseCode = "404", description = "Lista usuarios mentor no encontrado")
    public ResponseEntity<Page<MentorUserDTO>> showMentorUserList(Pageable pageable) {
        try {
            return ResponseEntity.ok(mentorRepository.findAll(pageable).map(MentorUserDTO::new));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}/companylist")
    @Operation(summary = "Listar usuarios company", description = "Recupera la lista de usuarios company desde un administrador específico.")
    @ApiResponse(responseCode = "200", description = "Lista de usuarios company recuperada", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CompanyUserDTO.class)))
    @ApiResponse(responseCode = "404", description = "Lista usuarios company no encontrado")
    public ResponseEntity<Page<CompanyUserDTO>> showCompanyUserList(Pageable pageable) {
        try {
            return ResponseEntity.ok(companyRepository.findAll(pageable).map(CompanyUserDTO::new));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}/adminlist")
    @Operation(summary = "Listar usuarios admin", description = "Recupera la lista de usuarios admin desde un administrador específico.")
    @ApiResponse(responseCode = "200", description = "Lista de usuarios admin recuperada", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AdminUserDTO.class)))
    @ApiResponse(responseCode = "404", description = "Lista usuarios admin no encontrado")
    public ResponseEntity<Page<AdminUserDTO>> showAdminUserList(Pageable pageable) {
        try {
            return ResponseEntity.ok(adminService.findAll(pageable).map(AdminUserDTO::new));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/{id}/socialnetworks")
    @Operation(summary = "Ligar Red Social a usuario administrador", description = "Liga una red social a un administrador específico.")
    @ApiResponse(responseCode = "200", description = "Red Social asociada con exito", content = @Content(mediaType = "application/json", schema = @Schema(implementation = SocialNetworkDTO.class)))
    @ApiResponse(responseCode = "404", description = "Solicitud inváldia")
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
