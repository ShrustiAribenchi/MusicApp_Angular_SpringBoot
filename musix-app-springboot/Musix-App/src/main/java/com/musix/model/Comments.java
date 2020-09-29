package com.musix.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table; 

@Entity
@Table(name="comments")
public class Comments {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int commentId;
	private String comment;
	private String useremail;
	private String songName;
	
	
	
	
	public Comments() {
		super();
		// TODO Auto-generated constructor stub
	}


	public Comments(int commentId, String comment, String useremail, String songName) {
		super();
		this.commentId = commentId;
		this.comment = comment;
		this.useremail = useremail;
		this.songName = songName;
	}
	
	
	public int getCommentId() {
		return commentId;
	}
	public void setCommentId(int commentId) {
		this.commentId = commentId;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
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
	@Override
	public String toString() {
		return "Comments [commentId=" + commentId + ", comment=" + comment + ", useremail=" + useremail + ", songName="
				+ songName + "]";
	}

	
	
}
