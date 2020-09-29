package com.musix.controllers;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.musix.model.User;
import com.musix.repository.UserDao;
import com.musix.services.UserService;


@RestController
@CrossOrigin(origins="*")
public class UserController {
	
	@Autowired
	UserDao userRepo;
	
	@Autowired
	UserService userService;
	
	@RequestMapping(value="/register", method=RequestMethod.POST)
	public ResponseEntity<User> registerUser(@RequestBody User user) {
		return this.userService.registerUser(user);
	}
	
	@RequestMapping(value="/login", method=RequestMethod.POST)
	public ResponseEntity<User> loginUser(@RequestBody User user) {
		return this.userService.loginUser(user);
	}
	
	@RequestMapping(value="/logout", method = RequestMethod.POST)
	public ResponseEntity<User> logoutUser(@RequestBody User user) {
		return this.userService.logoutUser(user);
	}
	
	@RequestMapping(value="/updateProfile", method = RequestMethod.POST)
	public ResponseEntity<User> updateProfile (
			@RequestBody User user,
			@RequestHeader Map<String, String> reqHeader) {
		System.out.println("Update profile end Point is HIT!!!");
		System.out.println("================================================================================");
		return this.userService.updateUserProfile(user, reqHeader);
	}
	
	@RequestMapping(value="/userDetails/{email}", method = RequestMethod.GET)
	public ResponseEntity<User> getUserDetails (
			@PathVariable("email") String email,
			@RequestHeader Map<String, String> reqHeader) {
		return this.userService.getUserDetails(email, reqHeader);
	}

}
