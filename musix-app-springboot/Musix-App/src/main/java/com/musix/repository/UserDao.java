package com.musix.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.musix.model.User;
import java.util.Optional;

import javax.transaction.Transactional;


public interface UserDao extends JpaRepository<User, Integer> {
	@Query("SELECT u FROM User u WHERE u.email = (?1)")
	public User getEmail(String email);
	
}
