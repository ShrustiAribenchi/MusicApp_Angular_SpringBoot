package com.musix.services;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.musix.model.Recommends;
import com.musix.model.User;
import com.musix.repository.RecommendsDao;
import com.musix.repository.UserDao;

import io.jsonwebtoken.Jwts;

@Service
public class RecommendsService implements IRecommendsService {
	@Autowired
	RecommendsDao recommendsRepo;
	
	@Autowired
	UserDao userRepo;
	
	public ResponseEntity<Recommends> addOrRemoveRecommends(
			Recommends rec, 
			Map<String, String> reqHeader) {
		
		
		User userObj = this.userRepo.getEmail(rec.getUseremail());
		
		String dbToken = userObj.getSecretKey();
		String userToken = (String)reqHeader.get("authorization").split(" ")[1];
		
		
		String validationSecret = Jwts
									.parser()
									.setSigningKey("secretKey")
									.parseClaimsJws(userToken)
									.getBody()
									.getSubject();
		
		//System.out.println("validation secret After decrypt Recommend: Func1: " + validationSecret);
		//System.out.println("dB token equals client token: Recommend func2 => " + dbToken.equals(userToken));
		if(dbToken.equals(userToken) && validationSecret.equals(rec.getUseremail())) {
			
			try {
				
				try {
					Recommends recObj = recommendsRepo.getSongName(rec.getSongName());
					if(recObj == null || recObj.getRecommend().equals("no")) {
						
						recObj.setRecommend("yes");
						this.recommendsRepo.saveAndFlush(recObj);
						return new ResponseEntity<Recommends>(HttpStatus.ACCEPTED);
					} else {
						
						recObj.setRecommend("no");
						this.recommendsRepo.saveAndFlush(recObj);
						return  new ResponseEntity<Recommends>(HttpStatus.ACCEPTED);
					}
					
				} catch (Exception e) {
					rec.setRecommend("yes");
					this.recommendsRepo.saveAndFlush(rec);
					return new ResponseEntity<Recommends>(HttpStatus.ACCEPTED);
				}
				
			} catch(Exception e) {
				
				return  new ResponseEntity<Recommends>(HttpStatus.BAD_REQUEST);
			}

		} else {
			return new ResponseEntity<Recommends>(HttpStatus.UNAUTHORIZED);
		}
	}
	
	public List<Recommends> getAllRecommends(
			Recommends rec,
			Map<String, String> reqHeader) {
		
		
		User userObj = this.userRepo.getEmail(rec.getUseremail());
		
		String dbToken = userObj.getSecretKey();
		String userToken = (String)reqHeader.get("authorization").split(" ")[1];
		

		String validationSecret = Jwts
									.parser()
									.setSigningKey("secretKey")
									.parseClaimsJws(userToken)
									.getBody()
									.getSubject();
		//System.out.println("validation secret after decryption: " + validationSecret);
		//System.out.println("dB token equals client token: Recommend func2 => " + dbToken.equals(userToken));
		
		if(dbToken.equals(userToken) && validationSecret.equals(rec.getUseremail())) {
			List<Recommends> recList = this.recommendsRepo.getEmail(rec.getUseremail());
			return recList;
		
		} else {
			return null;
		}
	}
}
