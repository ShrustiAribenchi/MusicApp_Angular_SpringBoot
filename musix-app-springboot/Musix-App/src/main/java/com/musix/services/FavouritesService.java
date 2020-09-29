package com.musix.services;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.musix.model.Favourites;
import com.musix.model.User;
import com.musix.repository.FavouritesDao;
import com.musix.repository.UserDao;

import io.jsonwebtoken.Jwts;

@Service
public class FavouritesService implements IFavouritesService {
	@Autowired
	FavouritesDao favouritesRepo;
	
	@Autowired
	UserDao userRepo;
	
	
	public ResponseEntity<Favourites> addOrRemoveFavourites(
			Favourites fav, 
			Map<String, String> reqHeader) {
		
		
		User userObj = this.userRepo.getEmail(fav.getUseremail());
		// 1
		String dbToken = userObj.getSecretKey();
		
		
		//System.out.println("Inside the favourites controller to add / remove favs: \n");
		//System.out.println("Token from Client: " + reqHeader.get("authorization"));
		reqHeader.forEach((K, V) -> System.out.println(K + " ->  " + V));
		
		String userToken = (String)reqHeader.get("authorization").split(" ")[1];
		//System.out.println("user Token : " + userToken);
		
		//System.out.println("Before decrypting the token : ");
		String validationSecret = Jwts
									.parser()
									.setSigningKey("secretKey")
									.parseClaimsJws(userToken)
									.getBody()
									.getSubject();
		//System.out.println("After decrypting the token : \n");
		//System.out.println("validation secret : " + validationSecret);	
		
		
		if(dbToken.equals(userToken) && validationSecret.equals(fav.getUseremail())) {
			try {
				
				try {
					Favourites favObj = favouritesRepo.getSongName(fav.getSongName());
					if(favObj == null || favObj.getFavourite().equals("no")) {
						
						favObj.setFavourite("yes");
						this.favouritesRepo.saveAndFlush(fav);
						this.favouritesRepo.saveAndFlush(favObj);
						return new ResponseEntity<Favourites>(HttpStatus.ACCEPTED);
					} else {
						
						favObj.setFavourite("no");
						this.favouritesRepo.saveAndFlush(favObj);
						return  new ResponseEntity<Favourites>(HttpStatus.ACCEPTED);
					}
				} catch(Exception e) {
					System.out.println("Exception in Fav is hit: ");
					fav.setFavourite("yes");
					this.favouritesRepo.saveAndFlush(fav);
					this.favouritesRepo.saveAndFlush(fav);
					return new ResponseEntity<Favourites>(HttpStatus.ACCEPTED);
				}
				
			} catch(Exception e) {
				
				return  new ResponseEntity<Favourites>(HttpStatus.BAD_REQUEST);
			}
				
		} else {
		
			return new ResponseEntity<Favourites>(HttpStatus.UNAUTHORIZED);
		}
	}
	
	public List<Favourites> getAllFavourites(
			Favourites fav, 
			Map<String, String> reqHeader) {
		
		
		User userObj = this.userRepo.getEmail(fav.getUseremail());
		// 1
		String dbToken = userObj.getSecretKey();
		
		//System.out.println("Inside the favourites controller to get All Favs:");
		//System.out.println("Token from Client: " + reqHeader.get("authorization"));
		
		String userToken = (String)reqHeader.get("authorization").split(" ")[1];
		

		String validationSecret = Jwts
									.parser()
									.setSigningKey("secretKey")
									.parseClaimsJws(userToken)
									.getBody()
									.getSubject();
		//System.out.println("validation secret : " + validationSecret);	
		
		if(dbToken.equals(userToken) && validationSecret.equals(fav.getUseremail())) {
			
			List<Favourites> favList = this.favouritesRepo.getEmail(fav.getUseremail());
			return favList;
			
		} else {
			return null;
		}
	}
}
