package com.backend.s21.controller;

import com.backend.s21.model.dto.junior.*;
import com.backend.s21.model.users.JuniorUser;
import com.backend.s21.model.users.SocialNetwork;
import com.backend.s21.model.users.User;
import com.backend.s21.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/junior")
public class JuniorUserController {

    @Autowired
    private JuniorUserRepository juniorRepository;

    @Autowired
    private ChallengeRepository challengeRepository;

    @Autowired
    private ChallengeHistoryRepository challengeHRepository;

    @Autowired
    private SocialNetworkRepository socialNRepository;

    @Autowired
    private CourseHistoryRepository courseHRepository;

    @Autowired
    private MentorshipHistoryRepository mentorshipHRepository;

    @PostMapping
    public ResponseEntity<JuniorUserDTO> registerJuniorUser(@RequestBody @Validated JuniorUser juniorUser, UriComponentsBuilder uriComponentsBuilder) {
        JuniorUser juniorUser1 = juniorRepository.save(juniorUser);
        JuniorUserDTO juniorUserDto = new JuniorUserDTO(juniorUser);
        URI url = uriComponentsBuilder.path("/junior/{nickname}").buildAndExpand(juniorUserDto.getNickname()).toUri();
        return ResponseEntity.created(url).body(juniorUserDto);
    }

    //Obtener información de un Usuario Junior a traves de una dirección PATH.
    @GetMapping("/{nickname}")
    public ResponseEntity<JuniorUserDTO> showUser(@PathVariable String nickname) {
        try {
            JuniorUser user = juniorRepository.getReferenceByNickname(nickname);
            return ResponseEntity.ok(new JuniorUserDTO(user));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    //No funcional, falta implementar un metodo en @Service o contructor en @Entity para ligar el Usuario a la red Social antes de persistir en BD.
    @PostMapping("/{nickname}/socialnetworks")
    public ResponseEntity<SocialNetworkDTO> linkSocialNetwork(@RequestBody @Validated SocialNetwork infoSocialNet, @PathVariable String nickname) {
        try {
            User user = juniorRepository.getReferenceByNickname(nickname);
            SocialNetwork socialNetwork = socialNRepository.save(infoSocialNet);
            socialNetwork.setUser(user);
            return ResponseEntity.ok(new SocialNetworkDTO(socialNetwork));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }


    @GetMapping("/{nickname}/challengehistory")
    public ResponseEntity<Page<ChallengeHistoryDTO>> listChallengeHistory(@PathVariable String nickname, Pageable pageable) {
        try {
            JuniorUser user = juniorRepository.getReferenceByNickname(nickname);
            return ResponseEntity.ok(challengeHRepository.findByJuniorUserId(pageable, user.getId().longValue()).map(ChallengeHistoryDTO::new));
        } catch (RuntimeException e) {
            return ResponseEntity.noContent().build();
        }
    }

    @GetMapping("/{nickname}/coursehistory")
    public ResponseEntity<Page<CourseHistoryDTO>> listCourseHistory(@PathVariable String nickname, Pageable pageable) {
        try {
            JuniorUser user = juniorRepository.getReferenceByNickname(nickname);
            return ResponseEntity.ok(courseHRepository.findByJuniorUserId(pageable, user.getId().longValue()).map(CourseHistoryDTO::new));
        } catch (RuntimeException e) {
            return ResponseEntity.noContent().build();
        }
    }

    @GetMapping("/{nickname}/mentorshiphistory")
    public ResponseEntity<Page<MentorshipHistoryDTO>> listMentorshipHistory(@PathVariable String nickname, Pageable pageable) {
        try {
            JuniorUser user = juniorRepository.getReferenceByNickname(nickname);
            return ResponseEntity.ok(mentorshipHRepository.findByJuniorUserId(pageable, user.getId().longValue()).map(MentorshipHistoryDTO::new));
        } catch (RuntimeException e) {
            return ResponseEntity.noContent().build();
        }
    }

}
