package com.musix.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="favourites")
public class Favourites {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int favouriteId;
	private String useremail;
	private String songName;
	private String songUrl;
	private String favourite; 
	
	
	
	
	public Favourites() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Favourites(int favouriteId, String useremail, String songName, String songUrl, String favourite) {
		super();
		this.favouriteId = favouriteId;
		this.useremail = useremail;
		this.songName = songName;
		this.songUrl = songUrl;
		this.favourite = favourite;
	}
	
	public int getFavouriteId() {
		return favouriteId;
	}
	public void setFavouriteId(int favouriteId) {
		this.favouriteId = favouriteId;
	}
	public String getUseremail() {
		return useremail;
	}
	public void setUseremail(String useremail) {
		this.useremail = useremail;
	}
	public String getSongName() {
		return songName;
	}
	public void setSongName(String songName) {
		this.songName = songName;
	}
	public String getSongUrl() {
		return songUrl;
	}
	public void setSongUrl(String songUrl) {
		this.songUrl = songUrl;
	}
	public String getFavourite() {
		return favourite;
	}
	public void setFavourite(String favourite) {
		this.favourite = favourite;
	}
	@Override
	public String toString() {
		return "Favourites [favouriteId=" + favouriteId + ", useremail=" + useremail + ", songName=" + songName
				+ ", songUrl=" + songUrl + ", favourite=" + favourite + "]";
	}
	
	
	
	
	

}
