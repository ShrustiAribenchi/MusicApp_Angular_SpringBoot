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

import com.musix.model.Favourites;
import com.musix.model.User;
import com.musix.repository.FavouritesDao;
import com.musix.repository.UserDao;
import com.musix.services.FavouritesService;

import io.jsonwebtoken.Jwts;

@RestController
@CrossOrigin(origins="*")
public class FavouritesController {
	
	@Autowired
	FavouritesService favService;
	
	@RequestMapping(value="/favourites", method=RequestMethod.POST)
	public ResponseEntity<Favourites> addOrRemoveFavourites(
			@RequestBody Favourites fav, 
			@RequestHeader Map<String, String> reqHeader) {
		return this.favService.addOrRemoveFavourites(fav, reqHeader);
	}
	

	@RequestMapping(value="/favourites/all", method=RequestMethod.POST)
	public List<Favourites> getAllFavourites(
			@RequestBody Favourites fav, 
			@RequestHeader Map<String, String> reqHeader) {

		return this.favService.getAllFavourites(fav, reqHeader);
	}
}
