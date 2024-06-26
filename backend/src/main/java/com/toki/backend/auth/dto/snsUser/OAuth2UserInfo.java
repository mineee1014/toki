package com.toki.backend.auth.dto.snsUser;

/**
 * 소셜로그인 유저 정보 기본 인터페이스
 */
public interface OAuth2UserInfo {
    String getProviderId();
    String getProvider();
    String getEmail();
    String getName();

    String getBirthYear();
    String getNickname();

    String getProfileImageUrl();
}

