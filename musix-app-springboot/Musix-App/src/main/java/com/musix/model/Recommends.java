package com.musix.model;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="recommends")
public class Recommends {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int recommendId;
	private String useremail;
	private String songName;
	private String songUrl;
	private String recommend;
	


	public Recommends() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Recommends(int recommendId, String useremail, String songName, String songUrl, String recommend) {
		super();
		this.recommendId = recommendId;
		this.useremail = useremail;
		this.songName = songName;
		this.songUrl = songUrl;
		this.recommend = recommend;
	}

	public int getRecommendId() {
		return recommendId;
	}

	public void setRecommendId(int recommendId) {
		this.recommendId = recommendId;
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

	public String getRecommend() {
		return recommend;
	}

	public void setRecommend(String recommend) {
		this.recommend = recommend;
	}

	@Override
	public String toString() {
		return "Recommends [recommendId=" + recommendId + ", useremail=" + useremail + ", songName=" + songName
				+ ", songUrl=" + songUrl + ", recommend=" + recommend + "]";
	}
	

	

}
