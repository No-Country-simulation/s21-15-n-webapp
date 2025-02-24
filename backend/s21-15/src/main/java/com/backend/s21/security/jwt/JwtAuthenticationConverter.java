package com.backend.s21.security.jwt;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimNames;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;

import java.util.Collection;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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
                Stream.concat(authoritiesConverter
                                .convert(jwt).stream(),
                        extractRoles(jwt).stream()).toList();

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
        Map<String, Object> resource = (resourceAccess != null) ? (Map<String, Object>) resourceAccess.get(idResource) : null;
        Collection<String> roles = (resource != null) ? (Collection<String>) resource.get("roles") : null;
        if (resourceAccess == null || resource == null || roles == null) {
            return Set.of();
        }
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toSet());
    }

}
