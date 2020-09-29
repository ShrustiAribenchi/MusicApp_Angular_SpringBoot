package com.musix.services;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.musix.model.Recommends;

public interface IRecommendsService {
	public ResponseEntity<Recommends> addOrRemoveRecommends(
			Recommends rec, 
			Map<String, String> reqHeader);
	
	public List<Recommends> getAllRecommends(
			Recommends rec,
			Map<String, String> reqHeader);
}
