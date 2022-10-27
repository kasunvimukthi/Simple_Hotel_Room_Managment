package com.example.test.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.test.model.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long>{

	@Query("select max(l.rid) from Room l")
	public int max();
	
	@Query("select count(l.rid) from Room l ")
	public int RoomCount();
	
	@Query("select count(l.rid) from Room l where l.status='Available'")
	public int ActiveRoomCount();
	
	@Query("select l from Room l where l.status='Available'")
	public List<Room> Activerooms();
	
	@Query("select count(l.rid) from Room l where l.status='Clean'")
	public int CleanRoomCount();
	
	@Query("select l from Room l where l.status='Clean'")
	public List<Room> CleanRooms();
	
	@Query("select count(l.rid) from Room l where l.status='Book'")
	public int BookRoomCount();
	
	@Query("select l from Room l where l.status='Book'")
	public List<Room> BookRooms();
}
