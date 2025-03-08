package com.backend.s21.controller;

import com.backend.s21.model.dto.CourseDTO;
import com.backend.s21.model.learningPath.Course;
import com.backend.s21.model.users.User;
import com.backend.s21.repository.IUserRepository;
import com.backend.s21.service.ICourseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.lang.reflect.InvocationTargetException;
import java.util.Optional;

@RestController
@RequestMapping("/courses")
@Tag(name = "Cursos", description = "Operaciones relacionadas con cursos")
public class CourseController {

    private final ICourseService courseRepository;

    private final IUserRepository userRepository;

    public CourseController(ICourseService courseRepository, IUserRepository userRepository) {
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    @Operation(summary = "Listar cursos", description = "Recupera una lista paginada de todos los cursos disponibles.")
    @ApiResponse(responseCode = "200", description = "Lista de cursos recuperada", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CourseDTO.class)))
    @ApiResponse(responseCode = "400", description = "Solicitud inválida")
    public ResponseEntity<Page<CourseDTO>> showCourseList(Pageable pageable) {
        try {
            return ResponseEntity.ok(courseRepository.findAll(pageable).map(CourseDTO::new));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }

    }

    @PostMapping("/create/{id}")
    public ResponseEntity<?> createCourse(@RequestBody @Valid Course courseJson, @PathVariable int id, UriComponentsBuilder uri) {
        try {
            Optional<User> instructor = userRepository.findById(id); //Utilizado Optional mientras se implementa UserService.
            Course course = new Course(instructor.get(), courseJson);
            courseRepository.save(course);
            return ResponseEntity.ok(new CourseDTO(course));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> showCourse(@PathVariable int id) {
        try {
            return ResponseEntity.ok(new CourseDTO(courseRepository.findById(id)));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<?> updateCourse(@PathVariable int id, @RequestBody @Valid Course courseJson) {
        try {
            Course course = courseRepository.update(courseJson, id);
            return ResponseEntity.ok(new CourseDTO(course));
        } catch (InvocationTargetException | NoSuchMethodException | IllegalAccessException | RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable int id) {
        try {
            String courseName = courseRepository.findById(id).getTitle();
            courseRepository.deleteById(id);
            return ResponseEntity.ok("El curso "+courseName+" ha sido elimado con exito.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
