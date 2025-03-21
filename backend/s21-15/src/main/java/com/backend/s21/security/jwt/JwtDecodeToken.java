package com.backend.s21.security.jwt;
import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class JwtDecodeToken {

    public Map<String, Object> decodeToken(String token) {
        DecodedJWT decodedJWT = JWT.decode(token);
        Map<String, Object> claims = new HashMap<>();

        // Mapea los datos básicos del JWT
        claims.put("issuer", decodedJWT.getIssuer());
        claims.put("subject o idUser", decodedJWT.getSubject());
        claims.put("issuedAt", decodedJWT.getIssuedAt());
        claims.put("expiresAt", decodedJWT.getExpiresAt());

        // Mapea claims personalizados
        claims.put("audience", decodedJWT.getAudience());
        claims.put("authorizedParty", decodedJWT.getClaim("azp").asString());
        claims.put("tokenId", decodedJWT.getId());
        claims.put("sessionId", decodedJWT.getClaim("sid").asString());
        claims.put("acr", decodedJWT.getClaim("acr").asString());
        claims.put("scope", decodedJWT.getClaim("scope").asString());
        claims.put("emailVerified", decodedJWT.getClaim("email_verified").asBoolean());
        claims.put("Name", decodedJWT.getClaim("name").asString());
        claims.put("Username", decodedJWT.getClaim("preferred_username").asString());
        claims.put("firstName", decodedJWT.getClaim("given_name").asString());
        claims.put("lastName", decodedJWT.getClaim("family_name").asString());
        claims.put("email", decodedJWT.getClaim("email").asString());

        Map<String, Object> resourceAccess = decodedJWT.getClaim("resource_access").asMap();
        if (resourceAccess != null) {
            claims.put("resourceAccess", resourceAccess);
        }
        return claims;
    }
}

