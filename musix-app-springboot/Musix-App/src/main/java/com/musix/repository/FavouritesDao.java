package com.musix.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.musix.model.Favourites;
import java.util.Optional;

import javax.transaction.Transactional;

public interface FavouritesDao extends JpaRepository<Favourites, Integer>{
	@Query("select fav from Favourites fav where fav.useremail= (?1)")
	public List<Favourites> getEmail(String email);
	
	@Query("select fav from Favourites fav where fav.songName= (?1)")
	public Favourites getSongName(String songname);
	
}
