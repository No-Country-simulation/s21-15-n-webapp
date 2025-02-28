package com.backend.s21.security.jwt;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimNames;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Slf4j
@Component
public class JwtAuthenticationConverter
        implements Converter<Jwt, AbstractAuthenticationToken> {

    private final
    JwtGrantedAuthoritiesConverter authoritiesConverter
            = new JwtGrantedAuthoritiesConverter();

    @Value("${jwt.attribute}")
    private String attribute;

    @Value("${keycloak.idResource}")
    private String idResource;


    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {
        Collection<GrantedAuthority> authorities =
                Stream.concat(
                        authoritiesConverter.convert(jwt).stream(),
                        extractRoles(jwt).stream())
                        .toList();

        return new JwtAuthenticationToken(jwt, authorities, getName(jwt));
    }

    private String getName(Jwt source) {
        String name = JwtClaimNames.SUB;
        if (this.attribute != null) {
            name = this.attribute;
        }
        return source.getClaim(name);
    }

    private Collection<? extends GrantedAuthority> extractRoles(Jwt source) {
        Map<String, Object> resourceAccess = source.getClaim("resource_access");
        if (resourceAccess == null) {
            return Collections.emptySet();
        }

        Object resourceObj = resourceAccess.get(idResource);
        if (!(resourceObj instanceof Map)) {
            return Collections.emptySet();
        }

        Map<String, Object> resource = (Map<String, Object>) resourceObj;
        Object rolesObj = resource.get("roles");
        if (!(rolesObj instanceof Collection)) {
            return Collections.emptySet();
        }
        Collection<String> roles = (Collection<String>) rolesObj;
        return roles.stream()
                .filter(Objects::nonNull)
                .map(this::formatRole)
                .collect(Collectors.toSet());
    }

    private GrantedAuthority formatRole(String role) {
        String formattedRole = role.startsWith("ROLE_") ? role : "ROLE_" + role;
        return new SimpleGrantedAuthority(formattedRole);
    }

}
