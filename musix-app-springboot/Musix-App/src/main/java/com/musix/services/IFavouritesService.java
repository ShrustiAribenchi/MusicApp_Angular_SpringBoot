package com.musix.services;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.musix.model.Favourites;

public interface IFavouritesService {

	public ResponseEntity<Favourites> addOrRemoveFavourites(
			Favourites fav, 
			Map<String, String> reqHeader);
	
	public List<Favourites> getAllFavourites(
			Favourites fav, 
			Map<String, String> reqHeader);
}
