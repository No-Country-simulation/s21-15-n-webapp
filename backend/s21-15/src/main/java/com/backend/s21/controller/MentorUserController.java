package com.backend.s21.controller;

import com.backend.s21.model.dto.CourseDTO;
import com.backend.s21.model.dto.JuniorUserDTO;
import com.backend.s21.model.dto.MentorshipDTO;
import com.backend.s21.model.learningPath.Course;
import com.backend.s21.model.learningPath.Mentorship;
import com.backend.s21.model.users.JuniorUser;
import com.backend.s21.model.users.MentorUser;
import com.backend.s21.model.users.User;
import com.backend.s21.service.ICourseService;
import com.backend.s21.service.IMentorUserService;
import com.backend.s21.service.IMentorshipService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.lang.reflect.InvocationTargetException;
import java.net.URI;

@RestController
@RequestMapping("/mentor")
@Tag(name = "Mentores", description = "Operaciones relacionadas con mentores")
public class MentorUserController {

    private final IMentorUserService mentorRepository;

    private final ICourseService ICourseRepository;

    private final IMentorshipService IMentorshipRepository;

    public MentorUserController(IMentorUserService mentorRepository, ICourseService ICourseRepository,
                                IMentorshipService IMentorshipRepository) {
        this.mentorRepository = mentorRepository;
        this.ICourseRepository = ICourseRepository;
        this.IMentorshipRepository = IMentorshipRepository;
    }

    @PostMapping
    @Operation(summary = "Registrar un mentor", description = "Crea un nuevo mentor en el sistema.")
    @ApiResponse(responseCode = "201", description = "Mentor creado", content = @Content(mediaType = "application/json", schema = @Schema(implementation = MentorUser.class)))
    @ApiResponse(responseCode = "400", description = "Solicitud inválida")
    public ResponseEntity<MentorUser> registerMentorUser(@RequestBody @Validated MentorUser userJson,
                                                         UriComponentsBuilder uri) {
        MentorUser user = mentorRepository.save(userJson);
        URI url = uri.path("/mentor/{nickname}").buildAndExpand(user.getNickname()).toUri();
        return ResponseEntity.created(url).body(user);
    }


    @GetMapping("/{id}")
    @Operation(summary = "Obtener un mentor por ID", description = "Recupera la información de un mentor específico por su ID.")
    @ApiResponse(responseCode = "200", description = "Mentor encontrado", content = @Content(mediaType = "application/json", schema = @Schema(implementation = MentorUser.class)))
    @ApiResponse(responseCode = "404", description = "Mentor no encontrado")
    public ResponseEntity<MentorUser> showUser(@Parameter(description = "ID del mentor", required = true) @PathVariable int id) {
        MentorUser user = mentorRepository.findById(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/{id}/createcourse")
    @Transactional
    @Operation(summary = "Crear un curso para un mentor", description = "Crea un nuevo curso asociado a un mentor específico.")
    @ApiResponse(responseCode = "201", description = "Curso creado", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CourseDTO.class)))
    @ApiResponse(responseCode = "400", description = "Solicitud inválida")
    public ResponseEntity<CourseDTO> createCourse(@RequestBody @Validated Course courseinfo, @Parameter(description = "ID del mentor", required = true) @PathVariable int id,
                                                  UriComponentsBuilder uri) {
        Course course = ICourseRepository.save(courseinfo);
        User instructor = mentorRepository.findById(id);
        course.setInstructor(instructor);
        CourseDTO courseDTO = new CourseDTO(course);
        URI url = uri.path("/course/{id}").buildAndExpand(courseDTO.getId()).toUri();
        return ResponseEntity.created(url).body(courseDTO);
    }

    @GetMapping("/{id}/yourcourselist")
    @Operation(summary = "Listar cursos de un mentor", description = "Recupera la lista de cursos asociados a un mentor específico.")
    @ApiResponse(responseCode = "200", description = "Lista de cursos recuperada", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CourseDTO.class)))
    @ApiResponse(responseCode = "404", description = "Mentor no encontrado")
    public ResponseEntity<Page<CourseDTO>> listCoursesFromMentor(@Parameter(description = "ID del mentor", required = true) @PathVariable int id) {
        User user = mentorRepository.findById(id);
        Page<Course> listCourses = ICourseRepository.findByInstructorId(Pageable.unpaged(), user.getId());

        return ResponseEntity.ok(listCourses.map(CourseDTO::new));
    }

    @PostMapping("/{id}/creatementorship")
    @Transactional
    @Operation(summary = "Crear una mentoría para un mentor", description = "Crea una nueva mentoría asociada a un mentor específico.")
    @ApiResponse(responseCode = "201", description = "Mentoría creada", content = @Content(mediaType = "application/json", schema = @Schema(implementation = MentorshipDTO.class)))
    @ApiResponse(responseCode = "400", description = "Solicitud inválida")
    public ResponseEntity<MentorshipDTO> createMentorship(@Parameter(description = "ID del mentor", required = true) @PathVariable int id,
                                                          @RequestBody @Validated Mentorship mentorshipJson,
                                                          UriComponentsBuilder uri) {
        MentorUser mentor = mentorRepository.findById(id);
        Mentorship mentorship = new Mentorship(null, mentor, mentorshipJson.getTitle(),
                mentorshipJson.getDescription(), null, null);
        IMentorshipRepository.save(mentorship);
        URI url = uri.path("/mentorship/{id}").buildAndExpand(mentorship.getId()).toUri();
        return ResponseEntity.created(url).body(new MentorshipDTO(mentorship));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar un mentor", description = "Actualiza la información de un mentor existente.")
    @ApiResponse(responseCode = "200", description = "Mentor actualizado", content = @Content(mediaType = "application/json", schema = @Schema(implementation = MentorUser.class)))
    @ApiResponse(responseCode = "400", description = "Solicitud inválida")
    @ApiResponse(responseCode = "404", description = "Mentor no encontrado")
    public ResponseEntity<MentorUser> updateUser(@RequestBody @Validated MentorUser userJson, @Parameter(description = "ID del mentor", required = true) @PathVariable int id) {
        try {
            MentorUser user = mentorRepository.update(userJson, id);
            return ResponseEntity.ok(user);
        } catch (InvocationTargetException | IllegalAccessException | NoSuchMethodException e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/{id}")
    @Transactional
    @Operation(summary = "Eliminar un mentor", description = "Marca un mentor como eliminado (soft delete).")
    @ApiResponse(responseCode = "200", description = "Mentor eliminado")
    @ApiResponse(responseCode = "404", description = "Mentor no encontrado")
    public ResponseEntity deleteUser(@Parameter(description = "ID del mentor", required = true) @PathVariable int id) {
        MentorUser user = mentorRepository.findById(id);
        user.setDeleted(true);
        return ResponseEntity.ok("El usuario ha sido eliminado con exito.");
    }

}
