package com.backend.s21.controller;

import com.backend.s21.model.dto.*;
import com.backend.s21.model.users.JuniorUser;
import com.backend.s21.model.users.SocialNetwork;
import com.backend.s21.model.users.User;
import com.backend.s21.service.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/junior")
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
    public ResponseEntity<JuniorUserDTO> registerJuniorUser(@RequestBody @Validated JuniorUser juniorUser,
                                                            UriComponentsBuilder uriComponentsBuilder) {
        JuniorUser user = juniorRepository.save(juniorUser);
        JuniorUserDTO juniorUserDto = new JuniorUserDTO(juniorUser);
        URI url = uriComponentsBuilder.path("/junior/{id}").buildAndExpand(user.getId()).toUri();
        return ResponseEntity.created(url).body(juniorUserDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JuniorUserDTO> showUser(@PathVariable int id) {
        JuniorUser user = juniorRepository.findById(id);
        return ResponseEntity.ok(new JuniorUserDTO(user));
    }

    @PostMapping("/{id}/socialnetworks")
    public ResponseEntity<SocialNetworkDTO> linkSocialNetwork(@RequestBody @Validated SocialNetwork socialNet,
                                                              @PathVariable int id) {
        User user = juniorRepository.findById(id);
        SocialNetwork socialNetwork = socialNRepository.save(new SocialNetwork(null, user, socialNet.getName(),
                socialNet.getUrl()));
        return ResponseEntity.ok(new SocialNetworkDTO(socialNetwork));
    }

    @GetMapping("/{id}/challengehistory")
    public ResponseEntity<Page<ChallengeHistoryDTO>> listChallengeHistory(@PathVariable int id) {
        JuniorUser user = juniorRepository.findById(id);
        return ResponseEntity.ok(new PageImpl<>(user.getChallengeHistory(), Pageable.unpaged(),
                user.getChallengeHistory().size()).map(ChallengeHistoryDTO::new));
    }

    @GetMapping("/{id}/coursehistory")
    public ResponseEntity<Page<CourseHistoryDTO>> listCourseHistory(@PathVariable int id) {
        JuniorUser user = juniorRepository.findById(id);
        return ResponseEntity.ok(new PageImpl<>(user.getCourseHistory(), Pageable.unpaged(),
                user.getCourseHistory().size()).map(CourseHistoryDTO::new));
    }

    @GetMapping("/{id}/mentorshiphistory")
    public ResponseEntity<Page<MentorshipHistoryDTO>> listMentorshipHistory(@PathVariable int id) {
        JuniorUser user = juniorRepository.findById(id);
        return ResponseEntity.ok(new PageImpl<>(user.getMentorshipHistory(), Pageable.unpaged(),
                user.getMentorshipHistory().size()).map(MentorshipHistoryDTO::new));
    }

}
