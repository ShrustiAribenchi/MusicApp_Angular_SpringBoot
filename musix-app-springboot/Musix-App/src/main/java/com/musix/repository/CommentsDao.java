package com.musix.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.musix.model.Comments;
import java.util.Optional;

import javax.transaction.Transactional;
public interface CommentsDao extends JpaRepository<Comments, Integer>{
		@Query("select com from Comments com where com.useremail= (?1)")
		public List<Comments> getEmail(String email);
}
