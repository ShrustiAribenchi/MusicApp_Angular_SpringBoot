package com.musix.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.musix.model.Recommends;
import java.util.Optional;

import javax.transaction.Transactional;


public interface RecommendsDao extends JpaRepository<Recommends, Integer> {
	@Query("select rec from Recommends rec where rec.useremail= (?1)")
	public List<Recommends> getEmail(String email);
	
	@Query("select rec from Recommends rec where rec.songName= (?1)")
	public Recommends getSongName(String songname);
}
