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

import com.musix.model.Recommends;
import com.musix.model.User;
import com.musix.repository.RecommendsDao;
import com.musix.repository.UserDao;
import com.musix.services.RecommendsService;

import io.jsonwebtoken.Jwts;

@RestController
@CrossOrigin("*")
public class RecommendsController {
	
	@Autowired
	RecommendsService recService;

	
	@RequestMapping(value="/recommends", method=RequestMethod.POST)
	public ResponseEntity<Recommends> addOrRemoveRecommends(
			@RequestBody Recommends rec,
			@RequestHeader Map<String, String> reqHeader) {
		return this.recService.addOrRemoveRecommends(rec, reqHeader);
	}
	
	@RequestMapping(value="/recommends/all", method=RequestMethod.POST)
	public List<Recommends> getAllRecommends(
			@RequestBody Recommends rec,
			@RequestHeader Map<String, String> reqHeader) {
		
		return this.recService.getAllRecommends(rec, reqHeader);
	}
	
}
