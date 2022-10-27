package com.example.test.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.test.exception.ResourceNotFoundException;
import com.example.test.model.Transaction;
import com.example.test.repository.TransactionRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class TransactionController {

	@Autowired
	private TransactionRepository transactionRepository ;
	
	//Get All Transaction
	@GetMapping("/transactions")
	public List<Transaction> getAllTransactions(){
		return transactionRepository.findAll();
	}
	
	//Create Transaction
	@PostMapping("/transaction")
	public Transaction createTransaction(@RequestBody Transaction transaction) {
		return transactionRepository.save(transaction);
	}

	//Get Transaction By ID
	@GetMapping("/transaction/{id}")
	public ResponseEntity<Transaction> getTransactionById(@PathVariable Long id) {
		Transaction transaction = transactionRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Transaction Not Exist with Id :" + id));
		return ResponseEntity.ok(transaction);
	}
}
