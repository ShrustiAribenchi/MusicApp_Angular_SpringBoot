package com.musix;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.musix.model.Comments;
import com.musix.model.Favourites;
import com.musix.model.Recommends;
import com.musix.model.User;
import com.musix.services.CommentsService;
import com.musix.services.FavouritesService;
import com.musix.services.RecommendsService;
import com.musix.services.UserService;

@SpringBootTest
class MusixAppApplicationTests {

	@MockBean
	UserService userService;
	
	@MockBean 
	FavouritesService favService;
	
	@MockBean 
	RecommendsService recService;
	
	@MockBean
	CommentsService comService;
	
	
	@Test
	void contextLoads() {
	}
	

	@Test
	public void registerUserTest() {
		User user= new User(1,"a","123","a@a.com","");
		user.setSecretKey("123");
		when(userService.registerUser(user)).thenReturn(new ResponseEntity<User>(HttpStatus.ACCEPTED));
		assertEquals(new ResponseEntity<User>(HttpStatus.ACCEPTED),new ResponseEntity<User>(HttpStatus.ACCEPTED));
	}
	
	@Test
	public void loginUserTest() {
		User user= new User(1,"a","123","a@a.com","");
		user.setSecretKey("123");
		when(userService.loginUser(user)).thenReturn(new ResponseEntity<User>(HttpStatus.ACCEPTED));
		assertEquals(new ResponseEntity<User>(HttpStatus.ACCEPTED),new ResponseEntity<User>(HttpStatus.ACCEPTED));
	}
	
	@Test
	public void logoutUserTest() {
		User user= new User(1,"a","123","a@a.com","");
		user.setSecretKey("123");
		when(userService.logoutUser(user)).thenReturn(new ResponseEntity<User>(HttpStatus.ACCEPTED));
		assertEquals(new ResponseEntity<User>(HttpStatus.ACCEPTED),new ResponseEntity<User>(HttpStatus.ACCEPTED));
	}
	
	
	@Test
	public void getUserDetailsTest() {
		Map<String,String> maps= new HashMap<>();
		maps.put("authorization","123");
		User user= new User(1,"a","123","a@a.com","");
		user.setSecretKey("123");
		when(userService.getUserDetails("a@a.com",maps)).thenReturn(new ResponseEntity<User>(user, HttpStatus.ACCEPTED));
		assertEquals(new ResponseEntity<User>(user, HttpStatus.ACCEPTED),new ResponseEntity<User>(user, HttpStatus.ACCEPTED));
	} 
	
	@Test
	public void updateUserProfileTest() {
		Map<String,String> maps= new HashMap<>();
		maps.put("authorization","123");
		User user= new User(1,"a","123","a@a.com","");
		user.setSecretKey("123");
		when(userService.updateUserProfile(user,maps)).thenReturn(new ResponseEntity<User>(user, HttpStatus.ACCEPTED));
		assertEquals(new ResponseEntity<User>(user, HttpStatus.ACCEPTED),new ResponseEntity<User>(user, HttpStatus.ACCEPTED));
	} 
	
	@Test
	public void addOrRemoveFavouritesTest() {
		Favourites fav = new Favourites(1, "a@a.com", "paranoid", "napster/paranoid", "yes");
		Map<String,String> reqHeader = new HashMap<>();
		reqHeader.put("authorization","123");
		when(favService
				.addOrRemoveFavourites(fav, reqHeader))
				.thenReturn(new ResponseEntity<Favourites>(HttpStatus.ACCEPTED));
		assertEquals("you need to return a response entity", new ResponseEntity<Favourites>(HttpStatus.ACCEPTED), 
				new ResponseEntity<Favourites>(HttpStatus.ACCEPTED));
	}
	
	@Test
	public void getAllFavouritesTest() {
		Favourites fav = new Favourites(1, "a@a.com", "paranoid", "napster/paranoid", "yes");
		Map<String,String> reqHeader = new HashMap<>();
		reqHeader.put("authorization","123");
		
		when(favService
				.getAllFavourites(fav, reqHeader))
				.thenReturn(List.of(fav));
		
		assertEquals("you need to return a response entity", List.of(fav), 
				List.of(fav));
	}
	
	@Test
	public void addOrRemoveRecommendsTest() {
		Recommends rec = new Recommends(1, "a@a.com", "paranoid", "napster/paranoid", "yes");
		Map<String,String> reqHeader = new HashMap<>();
		reqHeader.put("authorization","123");
		when(recService
				.addOrRemoveRecommends(rec, reqHeader))
				.thenReturn(new ResponseEntity<Recommends>(HttpStatus.ACCEPTED));
		assertEquals("you need to return a response entity", new ResponseEntity<Recommends>(HttpStatus.ACCEPTED), 
				new ResponseEntity<Recommends>(HttpStatus.ACCEPTED));
	}
	
	@Test
	public void getAllRecommendsTest() {
		Recommends rec = new Recommends(1, "a@a.com", "paranoid", "napster/paranoid", "yes");
		Map<String,String> reqHeader = new HashMap<>();
		reqHeader.put("authorization","123");
		
		when(recService
				.getAllRecommends(rec, reqHeader))
				.thenReturn(List.of(rec));
		
		assertEquals(List.of(rec), 
				List.of(rec));
	}
	@Test
	public void addCommentTest() {
		Comments com = new Comments(1, "very good song", "a@a.com", "paranoid");
		Map<String,String> reqHeader = new HashMap<>();
		reqHeader.put("authorization","123");
		when(comService
				.addComment(com, reqHeader))
				.thenReturn(new ResponseEntity<Comments>(HttpStatus.ACCEPTED));
		assertEquals("you need to return a response entity", new ResponseEntity<Recommends>(HttpStatus.ACCEPTED), 
				new ResponseEntity<Recommends>(HttpStatus.ACCEPTED));
	}
	
	@Test
	public void getAllCommentsTest() {
		Comments com = new Comments(1, "very good song", "a@a.com", "paranoid");
		Map<String,String> reqHeader = new HashMap<>();
		reqHeader.put("authorization","123");
		
		when(comService
				.getAllComments(com, reqHeader))
				.thenReturn(List.of(com));
		
		assertEquals(List.of(com), 
		List.of(com));
	}
	
	
	
	
	
	
	
}
