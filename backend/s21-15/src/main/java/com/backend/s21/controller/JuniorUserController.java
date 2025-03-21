package com.backend.s21.controller;

import com.backend.s21.model.dto.*;
import com.backend.s21.model.users.JuniorUser;
import com.backend.s21.model.users.SocialNetwork;
import com.backend.s21.model.users.User;
import com.backend.s21.repository.IUserRepository;
import com.backend.s21.service.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.lang.reflect.InvocationTargetException;
import java.net.URI;

@RestController
@RequestMapping("/junior")
public class JuniorUserController {

    private final IJuniorUserService juniorRepository;

    private final ISocialNetworkService socialNRepository;

    private final IUserService userRepository;

    public JuniorUserController(IJuniorUserService juniorRepository, ISocialNetworkService socialNRepository, IUserService userRepository) {
        this.juniorRepository = juniorRepository;
        this.socialNRepository = socialNRepository;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<?> registerJuniorUser(@RequestBody @Valid JuniorUser juniorUser,
                                                            UriComponentsBuilder uri) {
        try {
            JuniorUser user = juniorRepository.save(juniorUser);
            JuniorUserDTO juniorUserDto = new JuniorUserDTO(juniorUser);
            URI url = uri.path("/junior/{id}").buildAndExpand(user.getId()).toUri();
            return ResponseEntity.created(url).body(juniorUserDto);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> showUser(@PathVariable int id) {
        try {
            JuniorUser user = juniorRepository.findById(id);
            return ResponseEntity.ok(new JuniorUserDTO(user));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/socialnetworks")
    public ResponseEntity<?> linkSocialNetwork(@RequestBody @Valid SocialNetwork socialNet,
                                                              @PathVariable int id) {
        try {
            User user = juniorRepository.findById(id);
            SocialNetwork socialNetwork = socialNRepository.save(new SocialNetwork(null, user, socialNet.getName(),
                    socialNet.getUrl()));
            return ResponseEntity.ok(new SocialNetworkDTO(socialNetwork));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}/challengehistory")
    public ResponseEntity<Page<ChallengeHistoryDTO>> listChallengeHistory(@PathVariable int id, Pageable pageable) {
        try {
            JuniorUser user = juniorRepository.findById(id);
            return ResponseEntity.ok(new PageImpl<>(user.getChallengeHistory(), pageable,
                    user.getChallengeHistory().size()).map(ChallengeHistoryDTO::new));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}/coursehistory")
    public ResponseEntity<Page<CourseHistoryDTO>> listCourseHistory(@PathVariable int id, Pageable pageable) {
        try {
            JuniorUser user = juniorRepository.findById(id);
            return ResponseEntity.ok(new PageImpl<>(user.getCourseHistory(), pageable,
                    user.getCourseHistory().size()).map(CourseHistoryDTO::new));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}/mentorshiphistory")
    public ResponseEntity<Page<MentorshipHistoryDTO>> listMentorshipHistory(@PathVariable int id, Pageable pageable) {
        try {
            JuniorUser user = juniorRepository.findById(id);
            return ResponseEntity.ok(new PageImpl<>(user.getMentorshipHistory(), pageable,
                    user.getMentorshipHistory().size()).map(MentorshipHistoryDTO::new));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<?> updateUser(@RequestBody @Valid JuniorUser userJson, @PathVariable int id) {
        try {
            JuniorUser user = juniorRepository.update(userJson, id);
            return ResponseEntity.ok(new JuniorUserDTO(user));
        } catch (InvocationTargetException | IllegalAccessException | NoSuchMethodException | RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable int id) {
        try {
            JuniorUser user = juniorRepository.findById(id);
            user.setDeleted(true);
            return ResponseEntity.ok("El usuario ha sido eliminado con exito.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}/userslist")
    @Operation(summary = "Listar usuarios", description = "Recupera la lista de usuarios.")
    @ApiResponse(responseCode = "200", description = "Lista de usuarios recuperada", content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserDTO.class)))
    @ApiResponse(responseCode = "404", description = "Lista usuarios no encontrado")
    public ResponseEntity<Page<UserDTO>> showAllUsers(Pageable pageable) {
        try {
            return ResponseEntity.ok(userRepository.findAll(pageable).map(UserDTO::new));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
