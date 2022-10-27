package com.example.test.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.test.model.Invoice;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long>{

	@Query("select l from Invoice l where l.status='Not Paid'")
	public List<Invoice> NotPaid();
}
