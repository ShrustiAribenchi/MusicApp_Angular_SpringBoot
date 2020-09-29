package com.musix.services;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.musix.model.Comments;

public interface ICommentsService {
	
	public ResponseEntity<Comments> addComment (
			Comments com,
			Map<String, String> reqHeader);
	
	
	public List<Comments> getAllComments(
			Comments com,
			Map<String, String> reqHeader);
}
