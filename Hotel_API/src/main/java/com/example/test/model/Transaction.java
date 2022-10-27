package com.example.test.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "transaction")
public class Transaction {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long tid;
	
	@Column(name = "iid")
	private String iid;
	
	@Column(name = "paymentVal")
	private String paymentVal;
	
	@Column(name = "balance")
	private String balance;

	public Transaction() {
		
	}

	public Transaction(String iid, String paymentVal, String balance) {
		super();
		this.iid = iid;
		this.paymentVal = paymentVal;
		this.balance = balance;
	}

	public long getTid() {
		return tid;
	}

	public void setTid(long tid) {
		this.tid = tid;
	}

	public String getIid() {
		return iid;
	}

	public void setIid(String iid) {
		this.iid = iid;
	}

	public String getPaymentVal() {
		return paymentVal;
	}

	public void setPaymentVal(String paymentVal) {
		this.paymentVal = paymentVal;
	}

	public String getBalance() {
		return balance;
	}

	public void setBalance(String balance) {
		this.balance = balance;
	}

	
}
