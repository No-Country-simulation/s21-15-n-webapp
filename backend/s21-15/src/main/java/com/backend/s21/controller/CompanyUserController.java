package com.backend.s21.controller;

import com.backend.s21.model.dto.CompanyUserDTO;
import com.backend.s21.model.dto.SocialNetworkDTO;
import com.backend.s21.model.users.CompanyUser;
import com.backend.s21.model.users.SocialNetwork;
import com.backend.s21.model.users.User;
import com.backend.s21.service.ICompanyUserService;
import com.backend.s21.service.ISocialNetworkService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.lang.reflect.InvocationTargetException;
import java.net.URI;

@RestController
@RequestMapping("/companies")
@Tag(name = "Usuarios de Compañías", description = "Operaciones relacionadas con usuarios de compañías")
public class CompanyUserController {

    private final ICompanyUserService companyRepository;

    private final ISocialNetworkService socialNetworkService;

    public CompanyUserController(ICompanyUserService companyRepository, ISocialNetworkService socialNetworkService) {
        this.companyRepository = companyRepository;
        this.socialNetworkService = socialNetworkService;
    }

    @PostMapping
    @Operation(summary = "Registrar un usuario de compañía", description = "Crea un nuevo usuario de compañía en el sistema.")
    @ApiResponse(responseCode = "201", description = "Usuario de compañía creado", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CompanyUser.class)))
    @ApiResponse(responseCode = "400", description = "Solicitud inválida")
    public ResponseEntity<?> registerCompanyUser(@RequestBody @Valid CompanyUser companyJson,
                                                           UriComponentsBuilder uri) {
        try {
            CompanyUser companyUser = companyRepository.save(companyJson);
            URI url = uri.path("/{id}").buildAndExpand(companyUser.getId()).toUri();
            return ResponseEntity.created(url).body(new CompanyUserDTO(companyUser));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> showCompanyUser(@PathVariable int id){
        try {
            CompanyUser user = companyRepository.findById(id);
            return ResponseEntity.ok(new CompanyUserDTO(user));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCompanyUser(@PathVariable int id, @RequestBody @Valid CompanyUser userJson) {
        try {
            CompanyUser user = companyRepository.update(userJson, id);
            return ResponseEntity.ok(new CompanyUserDTO(user));
        } catch (InvocationTargetException | IllegalAccessException | NoSuchMethodException | RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCompanyUser(@PathVariable int id) {
        try {
            CompanyUser user = companyRepository.findById(id);
            user.setDeleted(true);
            return ResponseEntity.ok("El usuario ha sido eliminado con exito.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/socialnetworks")
    public ResponseEntity<?> linkSocialNetwork(@RequestBody @Valid SocialNetwork socialNet,
                                               @PathVariable int id) {
        try {
            User user = companyRepository.findById(id);
            SocialNetwork socialNetwork = socialNetworkService.save(new SocialNetwork(null, user, socialNet.getName(),
                    socialNet.getUrl()));
            return ResponseEntity.ok(new SocialNetworkDTO(socialNetwork));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
