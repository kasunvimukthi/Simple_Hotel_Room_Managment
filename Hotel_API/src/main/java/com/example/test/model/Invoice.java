package com.example.test.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "invoice")
public class Invoice {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long iid;
	
	@Column(name = "cid")
	private String cid;
	
	@Column(name = "rid")
	private String rid;
	
	@Column(name = "date1")
	private String date1;
	
	@Column(name = "date2")
	private String date2;
	
	@Column(name = "date3")
	private String date3;
	
	@Column(name = "valueRoom")
	private String valueRoom;
	
	@Column(name = "status")
	private String status;

	public Invoice() {
		
	}

	public Invoice(String cid, String rid, String date1, String date2, String date3, String valueRoom, String status) {
		super();
		this.cid = cid;
		this.rid = rid;
		this.date1 = date1;
		this.date2 = date2;
		this.date3 = date3;
		this.valueRoom = valueRoom;
		this.status = status;
	}

	public long getIid() {
		return iid;
	}

	public void setIid(long iid) {
		this.iid = iid;
	}

	public String getCid() {
		return cid;
	}

	public void setCid(String cid) {
		this.cid = cid;
	}

	public String getRid() {
		return rid;
	}

	public void setRid(String rid) {
		this.rid = rid;
	}

	public String getDate1() {
		return date1;
	}

	public void setDate1(String date1) {
		this.date1 = date1;
	}

	public String getDate2() {
		return date2;
	}

	public void setDate2(String date2) {
		this.date2 = date2;
	}

	public String getDate3() {
		return date3;
	}

	public void setDate3(String date3) {
		this.date3 = date3;
	}

	public String getValueRoom() {
		return valueRoom;
	}

	public void setValueRoom(String valueRoom) {
		this.valueRoom = valueRoom;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	
}
