package com.example.test.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.test.exception.ResourceNotFoundException;
import com.example.test.model.Invoice;
import com.example.test.model.Room;
import com.example.test.repository.InvoiceRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class InvoiceController {
	
	@Autowired
	private InvoiceRepository invoiceRepository;
	
	//Get All Invoices
	@GetMapping("/invoices")
	public List<Invoice> getAllInvoices(){
		return invoiceRepository.findAll();
	}
	
	//Get All Not Paid Invoice Info
		@GetMapping("/notPaidInvoices")
		public List<Invoice> getNotPaid(){
			return invoiceRepository.NotPaid();
		}	
	
	//Create Invoice
	@PostMapping("/invoice")
	public Invoice createInvoice(@RequestBody Invoice invoice) {
		return invoiceRepository.save(invoice);
	}

	//Get Invoice By ID
	@GetMapping("/invoice/{id}")
	public ResponseEntity<Invoice> getInvoiceById(@PathVariable Long id) {
		Invoice invoice = invoiceRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invoice Not Exist with Id :" + id));
		return ResponseEntity.ok(invoice);
	}
	
	// Update Invoice Status
	@PutMapping("/invoice/{iid}")
	public ResponseEntity<Invoice> updateInvoice(@PathVariable Long iid, @RequestBody Room invoiceDetails){
		Invoice invoice = invoiceRepository.findById(iid)
				.orElseThrow(() -> new ResourceNotFoundException("Invoice Not Exist with Id :" + iid));
		
		invoice.setStatus(invoiceDetails.getStatus());
		
		Invoice updateInvoice = invoiceRepository.save(invoice);
		return ResponseEntity.ok(updateInvoice);
	}
}
