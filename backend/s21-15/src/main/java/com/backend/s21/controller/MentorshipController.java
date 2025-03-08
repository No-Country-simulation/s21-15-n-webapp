package com.backend.s21.controller;

import com.backend.s21.model.dto.MentorshipDTO;
import com.backend.s21.model.learningPath.Mentorship;
import com.backend.s21.service.IMentorshipService;
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
import java.net.URI;

@RestController
@RequestMapping("/mentorships")
@Tag(name = "Mentorías", description = "Operaciones relacionadas con mentorías")
public class MentorshipController {

    private final IMentorshipService mentorshipRepository;

    public MentorshipController(IMentorshipService mentorshipRepository) {
        this.mentorshipRepository = mentorshipRepository;
    }

    @GetMapping
    @Operation(summary = "Listar mentorías", description = "Recupera una lista paginada de todas las mentorías disponibles.")
    @ApiResponse(responseCode = "200", description = "Lista de mentorías recuperada", content = @Content(mediaType = "application/json", schema = @Schema(implementation = MentorshipDTO.class)))
    @ApiResponse(responseCode = "400", description = "Solicitud inválida")
    public ResponseEntity<Page<MentorshipDTO>> showMentorshipList(Pageable pageable) {
        try {
            return ResponseEntity.ok(mentorshipRepository.findAll(pageable).map(MentorshipDTO::new));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createMentorship(@RequestBody @Valid Mentorship mentorshipJson,
                                              UriComponentsBuilder uri) {
        try {
            Mentorship mentorship = mentorshipRepository.save(mentorshipJson);
            URI url = uri.path("/{id}").buildAndExpand(mentorship.getId()).toUri();
            return ResponseEntity.created(url).body(new MentorshipDTO(mentorship));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> showMentorship(@PathVariable int id) {
        try {
            return ResponseEntity.ok(new MentorshipDTO(mentorshipRepository.findById(id)));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<?> updateMentoship(@PathVariable int id, @RequestBody @Valid Mentorship mentorshipJson) {
        try {
            Mentorship mentorship = mentorshipRepository.update(mentorshipJson, id);
            return ResponseEntity.ok(new MentorshipDTO(mentorship));
        } catch (InvocationTargetException | IllegalAccessException | NoSuchMethodException | RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMentorship(@PathVariable int id) {
        try {
            String mentorshipName = mentorshipRepository.findById(id).getTitle();
            mentorshipRepository.deleteById(id);
            return ResponseEntity.ok("La mentoría "+mentorshipName+" ha sido eliminada con exito.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
