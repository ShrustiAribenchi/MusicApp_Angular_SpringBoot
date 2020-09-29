package com.musix.services;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.musix.model.Comments;
import com.musix.model.User;
import com.musix.repository.CommentsDao;
import com.musix.repository.UserDao;

import io.jsonwebtoken.Jwts;

@Service
public class CommentsService implements ICommentsService {
	@Autowired
	CommentsDao commentsRepo;

	
	@Autowired
	UserDao userRepo;
	
	public ResponseEntity<Comments> addComment (
			Comments com,
			Map<String, String> reqHeader) {
		
		
		try {

			//System.out.println("Inside the Comment controller add comments");
			User userObj = this.userRepo.getEmail(com.getUseremail());
			// 1
			String dbToken = userObj.getSecretKey();
			String userToken = (String)reqHeader.get("authorization").split(" ")[1];
			
			String validationSecret = Jwts
										.parser()
										.setSigningKey("secretKey")
										.parseClaimsJws(userToken)
										.getBody()
										.getSubject();
			//System.out.println("validation secret : " + validationSecret);
			
			if(dbToken.equals(userToken) && validationSecret.equals(com.getUseremail())) {
				
				this.commentsRepo.saveAndFlush(com);
				return new ResponseEntity<Comments>(HttpStatus.ACCEPTED);
			} else {
				
				return new ResponseEntity<Comments>(HttpStatus.UNAUTHORIZED);
			}
		} catch (Exception e) {
			
			return new ResponseEntity<Comments>(HttpStatus.UNAUTHORIZED);
		}
	}
	
	public List<Comments> getAllComments(
			Comments com,
			Map<String, String> reqHeader) {
		
		
		try {
			User userObj = this.userRepo.getEmail(com.getUseremail());
			// 1
			String dbToken = userObj.getSecretKey();
			String userToken = (String)reqHeader.get("authorization").split(" ")[1];
			

			String validationSecret = Jwts
										.parser()
										.setSigningKey("secretKey")
										.parseClaimsJws(userToken)
										.getBody()
										.getSubject();
			//System.out.println("validation secret : " + validationSecret);
			
			
			if(dbToken.equals(userToken) && validationSecret.equals(com.getUseremail())) {
				
				List<Comments> comList = this.commentsRepo.getEmail(com.getUseremail());
						// .getCommentsByEmail(com.getUseremail());
				return comList;
							
			} else {
				return null;
			}
			
		} catch (Exception e) {
			System.out.println("Exception is hit in Comments section.");
			return null;
		}
	}
}
