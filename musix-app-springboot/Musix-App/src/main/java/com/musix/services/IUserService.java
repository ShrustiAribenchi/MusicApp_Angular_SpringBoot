package com.musix.services;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.musix.model.User;

public interface IUserService {
	public ResponseEntity<User> registerUser(User user);
	public ResponseEntity<User> loginUser(User user);
	public ResponseEntity<User> logoutUser(User user);
	public ResponseEntity<User> getUserDetails(String email, Map<String, String> reqHeader);
	public ResponseEntity<User> updateUserProfile(User user, Map<String, String> reqHeader);
	
}
