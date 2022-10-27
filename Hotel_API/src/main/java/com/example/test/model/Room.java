package com.example.test.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "room")
public class Room {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long rid;
	
	@Column(name = "room_numer")
	private String room_numer;
	
	@Column(name = "room_type")
	private String room_type;
	
	@Column(name = "bed_type")
	private String bed_type;
	
	@Column(name = "charg_for_day")
	private String charg_for_day;
	
	@Column(name = "status")
	private String status;
	
	public Room() {
		
	}

	public Room(String room_numer, String room_type, String bed_type, String charg_for_day, String status) {
		super();
		this.room_numer = room_numer;
		this.room_type = room_type;
		this.bed_type = bed_type;
		this.charg_for_day = charg_for_day;
		this.status = status;
	}

	public long getRid() {
		return rid;
	}

	public void setRid(long rid) {
		this.rid = rid;
	}

	public String getRoom_numer() {
		return room_numer;
	}

	public void setRoom_numer(String room_numer) {
		this.room_numer = room_numer;
	}

	public String getRoom_type() {
		return room_type;
	}

	public void setRoom_type(String room_type) {
		this.room_type = room_type;
	}

	public String getBed_type() {
		return bed_type;
	}

	public void setBed_type(String bed_type) {
		this.bed_type = bed_type;
	}

	public String getCharg_for_day() {
		return charg_for_day;
	}

	public void setCharg_for_day(String charg_for_day) {
		this.charg_for_day = charg_for_day;
	}
	
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
}
