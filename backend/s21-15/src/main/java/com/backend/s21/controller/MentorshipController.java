package com.backend.s21.controller;

import com.backend.s21.model.dto.MentorshipDTO;
import com.backend.s21.service.IMentorshipService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mentorship")
@Tag(name = "Mentorías", description = "Operaciones relacionadas con mentorías")
public class MentorshipController {

    private final IMentorshipService mentorshipRepository;

    public MentorshipController(IMentorshipService mentorshipRepository) {
        this.mentorshipRepository = mentorshipRepository;
    }

    @GetMapping
    @Operation(summary = "Listar mentorías", description = "Recupera una lista paginada de todas las mentorías disponibles.")
    @ApiResponse(responseCode = "200", description = "Lista de mentorías recuperada", content = @Content(mediaType = "application/json", schema = @Schema(implementation = MentorshipDTO.class)))
    public ResponseEntity<Page<MentorshipDTO>> showCourseList(Pageable pageable) {
        return ResponseEntity.ok(mentorshipRepository.findAll(pageable).map(MentorshipDTO::new));
    }

}
