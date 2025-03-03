package com.backend.s21.controller;

import com.backend.s21.model.dto.*;
import com.backend.s21.model.users.JuniorUser;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.lang.reflect.InvocationTargetException;
import java.net.URI;

@RestController
@RequestMapping("/junior")
@Tag(name = "Usuarios Junior", description = "Operaciones relacionadas con usuarios junior")
public class JuniorUserController {

    private final IJuniorUserService juniorRepository;

    private final IChallengeService IChallengeRepository;

    private final IChallengeHistoryService challengeHRepository;

    private final ISocialNetworkService socialNRepository;

    private final ICourseHistoryService courseHRepository;

    private final IMentorshipHistoryService mentorshipHRepository;

    public JuniorUserController(IJuniorUserService juniorRepository, IChallengeService IChallengeRepository,
                                IChallengeHistoryService challengeHRepository, ISocialNetworkService socialNRepository,
                                ICourseHistoryService courseHRepository, IMentorshipHistoryService mentorshipHRepository) {
        this.juniorRepository = juniorRepository;
        this.IChallengeRepository = IChallengeRepository;
        this.challengeHRepository = challengeHRepository;
        this.socialNRepository = socialNRepository;
        this.courseHRepository = courseHRepository;
        this.mentorshipHRepository = mentorshipHRepository;
    }

    @PostMapping
    @Operation(summary = "Registrar un usuario junior", description = "Crea un nuevo usuario junior en el sistema.")
    @ApiResponse(responseCode = "201", description = "Usuario junior creado", content = @Content(mediaType = "application/json", schema = @Schema(implementation = JuniorUserDTO.class)))
    @ApiResponse(responseCode = "400", description = "Solicitud inválida")
    public ResponseEntity<JuniorUserDTO> registerJuniorUser(@RequestBody @Validated JuniorUser juniorUser,
                                                            UriComponentsBuilder uriComponentsBuilder) {
        JuniorUser user = juniorRepository.save(juniorUser);
        JuniorUserDTO juniorUserDto = new JuniorUserDTO(juniorUser);
        URI url = uriComponentsBuilder.path("/junior/{id}").buildAndExpand(user.getId()).toUri();
        return ResponseEntity.created(url).body(juniorUserDto);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener un usuario junior por ID", description = "Recupera la información de un usuario junior específico por su ID.")
    @ApiResponse(responseCode = "200", description = "Usuario junior encontrado", content = @Content(mediaType = "application/json", schema = @Schema(implementation = JuniorUserDTO.class)))
    @ApiResponse(responseCode = "404", description = "Usuario junior no encontrado")
    public ResponseEntity<JuniorUserDTO> showUser(@Parameter(description = "ID del usuario junior", required = true) @PathVariable int id) {
        JuniorUser user = juniorRepository.findById(id);
        return ResponseEntity.ok(new JuniorUserDTO(user));
    }

    @PostMapping("/{id}/socialnetworks")
    @Operation(summary = "Vincular una red social a un usuario junior", description = "Asocia una red social a un usuario junior específico.")
    @ApiResponse(responseCode = "200", description = "Red social vinculada", content = @Content(mediaType = "application/json", schema = @Schema(implementation = SocialNetworkDTO.class)))
    @ApiResponse(responseCode = "400", description = "Solicitud inválida")
    public ResponseEntity<SocialNetworkDTO> linkSocialNetwork(@RequestBody @Validated SocialNetwork socialNet,
                                                              @Parameter(description = "ID del usuario junior", required = true) @PathVariable int id) {
        User user = juniorRepository.findById(id);
        SocialNetwork socialNetwork = socialNRepository.save(new SocialNetwork(null, user, socialNet.getName(),
                socialNet.getUrl()));
        return ResponseEntity.ok(new SocialNetworkDTO(socialNetwork));
    }

    @GetMapping("/{id}/challengehistory")
    @Operation(summary = "Listar el historial de desafíos de un usuario junior", description = "Recupera el historial de desafíos completados por un usuario junior.")
    @ApiResponse(responseCode = "200", description = "Historial de desafíos recuperado", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ChallengeHistoryDTO.class)))
    @ApiResponse(responseCode = "404", description = "Usuario junior no encontrado")
    public ResponseEntity<Page<ChallengeHistoryDTO>> listChallengeHistory(@Parameter(description = "ID del usuario junior", required = true) @PathVariable int id) {
        JuniorUser user = juniorRepository.findById(id);
        return ResponseEntity.ok(new PageImpl<>(user.getChallengeHistory(), Pageable.unpaged(),
                user.getChallengeHistory().size()).map(ChallengeHistoryDTO::new));
    }

    @GetMapping("/{id}/coursehistory")
    @Operation(summary = "Listar el historial de cursos de un usuario junior", description = "Recupera el historial de cursos completados por un usuario junior.")
    @ApiResponse(responseCode = "200", description = "Historial de cursos recuperado", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CourseHistoryDTO.class)))
    @ApiResponse(responseCode = "404", description = "Usuario junior no encontrado")
    public ResponseEntity<Page<CourseHistoryDTO>> listCourseHistory(@Parameter(description = "ID del usuario junior", required = true) @PathVariable int id) {
        JuniorUser user = juniorRepository.findById(id);
        return ResponseEntity.ok(new PageImpl<>(user.getCourseHistory(), Pageable.unpaged(),
                user.getCourseHistory().size()).map(CourseHistoryDTO::new));
    }

    @GetMapping("/{id}/mentorshiphistory")
    @Operation(summary = "Listar el historial de mentorías de un usuario junior", description = "Recupera el historial de mentorías completadas por un usuario junior.")
    @ApiResponse(responseCode = "200", description = "Historial de mentorías recuperado", content = @Content(mediaType = "application/json", schema = @Schema(implementation = MentorshipHistoryDTO.class)))
    @ApiResponse(responseCode = "404", description = "Usuario junior no encontrado")
    public ResponseEntity<Page<MentorshipHistoryDTO>> listMentorshipHistory(@Parameter(description = "ID del usuario junior", required = true) @PathVariable int id) {
        JuniorUser user = juniorRepository.findById(id);
        return ResponseEntity.ok(new PageImpl<>(user.getMentorshipHistory(), Pageable.unpaged(),
                user.getMentorshipHistory().size()).map(MentorshipHistoryDTO::new));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar un usuario junior", description = "Actualiza la información de un usuario junior existente.")
    @ApiResponse(responseCode = "200", description = "Usuario junior actualizado", content = @Content(mediaType = "application/json", schema = @Schema(implementation = JuniorUserDTO.class)))
    @ApiResponse(responseCode = "400", description = "Solicitud inválida")
    @ApiResponse(responseCode = "404", description = "Usuario junior no encontrado")
    public ResponseEntity<JuniorUserDTO> updateUser(@RequestBody @Validated JuniorUser userJson,@Parameter(description = "ID del usuario junior", required = true) @PathVariable int id) {
        try {
            JuniorUser user = juniorRepository.update(userJson, id);
            return ResponseEntity.ok(new JuniorUserDTO(user));
        } catch (InvocationTargetException | IllegalAccessException | NoSuchMethodException e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/{id}")
    @Transactional
    @Operation(summary = "Eliminar un usuario junior", description = "Marca un usuario junior como eliminado (soft delete).")
    @ApiResponse(responseCode = "200", description = "Usuario junior eliminado")
    @ApiResponse(responseCode = "404", description = "Usuario junior no encontrado")
    public ResponseEntity deleteUser(@Parameter(description = "ID del usuario junior", required = true) @PathVariable int id) {
        JuniorUser user = juniorRepository.findById(id);
        user.setDeleted(true);
        return ResponseEntity.ok("El usuario ha sido eliminado con exito.");
    }
}
