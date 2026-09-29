package com.scholarpath.security;

import com.scholarpath.entity.UserProfile;
import com.scholarpath.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String picture = oAuth2User.getAttribute("picture");

        if (email != null) {
            Optional<UserProfile> existingProfile = userProfileRepository.findByEmail(email);
            if (!existingProfile.isPresent()) {
                UserProfile newUser = new UserProfile();
                newUser.setEmail(email);
                newUser.setFullName(name);
                newUser.setProfilePicUrl(picture);
                userProfileRepository.save(newUser);
            }
        }

        String token = jwtUtil.generateTokenFromEmail(email);
        
        // Redirect back to frontend with the token
        // Using relative URL to redirect to the same domain where the frontend is served (e.g. 8080)
        String targetUrl = "/oauth2/redirect?token=" + token;
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}
