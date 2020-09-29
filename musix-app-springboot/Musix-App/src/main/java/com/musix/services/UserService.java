package com.musix.services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.musix.model.Favourites;
import com.musix.model.User;
import com.musix.repository.UserDao;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class UserService implements IUserService {
	@Autowired
	UserDao userRepo;
	
	public ResponseEntity<User> registerUser(User user) {
		try {
			
			
			String email = user.getEmail();
			User userObj = userRepo.getEmail(email);
			
			System.out.println(user + " and from repo: " + userObj);
			try {
				if(userObj.getEmail().equals(email)) {
					System.out.println("user controller from else block: " + user);
					return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
					
				} else {
					
					System.out.println("user controller from else block before persistance: " + user);
					userRepo.saveAndFlush(user);
					System.out.println("user controller from else block after persistance: " + user);
					return new ResponseEntity<User>(HttpStatus.ACCEPTED);
				}
			} catch(Exception e) {
				System.out.println("user controller from catch block before persistance: " + user);
				userRepo.saveAndFlush(user);
				System.out.println("user controller from catch block after persistance: " + user);
				return new ResponseEntity<User>(HttpStatus.ACCEPTED);
			}
			
		} catch (Exception e) {
			System.out.println("register Exception occured: " + e.getMessage());
			return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
		}
	}
////////////////////////////////////////////////////////////////////////////////////////	
	public ResponseEntity<User> loginUser(User user) {
		try {
			
			User userObj = userRepo.getEmail(user.getEmail());
			System.out.println("Login is fetching from database " + userObj + " for email address " + user.getEmail());;
			
			
			if(user.getEmail().equals(userObj.getEmail()) && 
					user.getPassword().equals(userObj.getPassword())) {
				
				System.out.println("Before jwt");
				Map<String, Object> claims = new HashMap<>();
				String token = Jwts
								.builder()
								.setClaims(claims)
								.signWith(SignatureAlgorithm.HS256, "secretKey")
								.setSubject(user.getEmail()).compact();
				
				System.out.println("After jwt");
				userObj.setSecretKey(token);
				userRepo.saveAndFlush(userObj);
				
				user.setSecretKey(token);  
				
				return new ResponseEntity<User>(user, HttpStatus.OK);
			} else {
				
				return new ResponseEntity<User>(HttpStatus.UNAUTHORIZED);
			}
		} catch(Exception e) {
			
			System.out.println("login Exception: " + e.getMessage());
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}
	}
///////////////////////////////////////////////////////////////////////////////////////	
	public ResponseEntity<User> logoutUser(User user) {
		try {
			
			
			// we are retrieving Authorization token from the body itself.
			User userObj = userRepo.getEmail(user.getEmail());
			System.out.println(userObj.getSecretKey().equals(user.getSecretKey()));
			System.out.println("server token: " + userObj.getSecretKey() + 
					"\nclient token: " + user.getSecretKey());
			
			if(userObj.getSecretKey().equals(user.getSecretKey())) {
				
				userObj.setSecretKey("");
				userRepo.saveAndFlush(userObj);
				return new ResponseEntity<User>(HttpStatus.ACCEPTED);
			} else {
				return new ResponseEntity<User>(HttpStatus.UNAUTHORIZED);
			}
			
		} catch(Exception e) {
			System.out.println("Logout Exception: " + e.getMessage());
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}
	}
/////////////////////////////////////////////////////////////////////////////////////////////
	@Override
	public ResponseEntity<User> getUserDetails(String email, Map<String, String> reqHeader) {
		User userObj;
		String userToken;
		String validationSecret;
		String dbToken;
		try {
			userObj = this.userRepo.getEmail(email);
			// 1
			dbToken = userObj.getSecretKey();
			
			//System.out.println("Inside the user service to update profile: \n");
			//System.out.println("Token from Client: " + reqHeader.get("authorization"));
			
			// reqHeader.forEach((K, V) -> System.out.println(K + " ->  " + V));
			
			userToken = (String)reqHeader.get("authorization").split(" ")[1];
			//System.out.println("user Token : " + userToken);
			
			//System.out.println("Before decrypting the token : ");
			validationSecret = Jwts
										.parser()
										.setSigningKey("secretKey")
										.parseClaimsJws(userToken)
										.getBody()
										.getSubject();
			//System.out.println("After decrypting the token : \n");
			//System.out.println("validation secret : " + validationSecret);
		} catch(Exception e) {
			return new ResponseEntity<User>(HttpStatus.UNAUTHORIZED);
		}
	
		if(dbToken.equals(userToken) && validationSecret.equals(email)) {
			try {
				System.out.println("user details sent are:  " + userObj);
				return new ResponseEntity<User>(userObj, HttpStatus.ACCEPTED);
			} catch(Exception e) {
				//System.out.println("Exception in user Service is hit: ");
				return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
			}		
		} else {
		
			return new ResponseEntity<User>(HttpStatus.UNAUTHORIZED);
		}
	}
/////////////////////////////////////////////////////////////////////////////////////////////////
	@Override
	public ResponseEntity<User> updateUserProfile(User user, Map<String, String> reqHeader) {
		User userObj = null;
		String userToken = "";
		String validationSecret = "";
		String dbToken = "";
		try {
			userObj = this.userRepo.getEmail(user.getEmail());
			dbToken = userObj.getSecretKey();
			System.out.println("=====================================================================\n" + 
			" User profile before updation: " + userObj);
			
			System.out.println("Inside the user service to update profile: \n");
			System.out.println("Token from Client: " + reqHeader.get("authorization"));
			
			userToken = (String)reqHeader.get("authorization").split(" ")[1];
			System.out.println("user Token : " + userToken);
			
			System.out.println("Before decrypting the token : ");
			validationSecret = Jwts
										.parser()
										.setSigningKey("secretKey")
										.parseClaimsJws(userToken)
										.getBody()
										.getSubject();
			System.out.println("After decrypting the token : \n");
			System.out.println("validation secret : " + validationSecret);
		} catch(Exception e) {
			return new ResponseEntity<User>(HttpStatus.UNAUTHORIZED);
		}
		
		System.out.println(dbToken.equals(userToken) + " ======================================================" 
		+ validationSecret.equals(user.getEmail()));
		
		if(dbToken.equals(userToken) && validationSecret.equals(user.getEmail())) {
			try {
				System.out.println("User Service all credentials are matching...: ....");
				userObj.setDisplayPicture(user.getDisplayPicture());
				userObj.setPassword(user.getPassword());
				userRepo.saveAndFlush(userObj);
				System.out.println("User profile updation: after updation: " + userObj);
				return new ResponseEntity<User>(user, HttpStatus.ACCEPTED);
			} catch(Exception e) {
				System.out.println("Exception in user Service is hit: ");
				return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
			}		
		} else {
		
			return new ResponseEntity<User>(HttpStatus.UNAUTHORIZED);
		}
	}
}
