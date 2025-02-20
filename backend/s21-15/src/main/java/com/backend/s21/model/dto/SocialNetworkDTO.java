package com.backend.s21.model.dto;
import com.backend.s21.model.SocialNetwork;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SocialNetworkDTO {
    private String name;
    private String url;

    public SocialNetworkDTO(SocialNetwork socialNetwork) {
        this.name = socialNetwork.getName();
        this.url = socialNetwork.getUrl();
    }
}

