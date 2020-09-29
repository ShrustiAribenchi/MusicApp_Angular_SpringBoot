package com.musix.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.musix.model.Comments;
import com.musix.model.User;
import com.musix.repository.CommentsDao;
import com.musix.repository.UserDao;
import com.musix.services.CommentsService;

import io.jsonwebtoken.Jwts;

@RestController
@CrossOrigin("*")
public class CommentsController {
	
	@Autowired
	CommentsService comService;
	

	@RequestMapping(value="/comments", method=RequestMethod.POST)
	public ResponseEntity<Comments> addComment (
			@RequestBody Comments com,
			@RequestHeader Map<String, String> reqHeader) {
		
		return this.comService.addComment(com, reqHeader);
	}
	
	@RequestMapping(value="/comments/all", method=RequestMethod.POST)
	public List<Comments> getAllComments(
			@RequestBody Comments com,
			@RequestHeader Map<String, String> reqHeader) {
		
		return this.comService.getAllComments(com, reqHeader);
	}
	
	
}
