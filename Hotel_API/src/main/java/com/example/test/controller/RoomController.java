package com.example.test.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.test.exception.ResourceNotFoundException;
import com.example.test.model.Room;
import com.example.test.repository.RoomRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class RoomController {

	@Autowired
	private RoomRepository roomRepository;
	
	//Get all rooms
	@GetMapping("/rooms")
	public List<Room> getAllRooms(){
		return roomRepository.findAll();
	}
	
	// Get Max Room Number
	@GetMapping("/maxRoomNumber")
	public int getMaxRoomNumber(){
		return roomRepository.max();
	}
	
	// Get Number of Rooms 
		@GetMapping("/roomcount")
		public int getRoomCount(){
			return roomRepository.RoomCount();
		}
	
	// Get Number of Active Room 
	@GetMapping("/activeroomcount")
	public int getActiveRoomCount(){
		return roomRepository.ActiveRoomCount();
	}
	
	//Get All Active Rooms Info
	@GetMapping("/activerooms")
	public List<Room> getActiveRooms(){
		return roomRepository.Activerooms();
	}	
	
	// Get Number of Room for Clean
	@GetMapping("/cleanroomcount")
	public int getCleanRoomCount(){
		return roomRepository.CleanRoomCount();
	}
	
	//Get All Clean Rooms Info
	@GetMapping("/cleanrooms")
	public List<Room> getCleanRooms(){
		return roomRepository.CleanRooms();
	}
	
	// Get Number of Room for Book
	@GetMapping("/bookroomcount")
	public int getBookRoomCount(){
		return roomRepository.BookRoomCount();
	}
	
	//Get All Book Rooms Info
	@GetMapping("/bookrooms")
	public List<Room> getBookRooms(){
		return roomRepository.BookRooms();
	}
	
	//Create new Room
	@PostMapping("/room")
	public Room createRoom(@RequestBody Room room) {
		return roomRepository.save(room);
	}
	
	//Get room by ID
	@GetMapping("/room/{rid}")
	public ResponseEntity<Room> getRoomById(@PathVariable Long rid){
		Room room = roomRepository.findById(rid)
				.orElseThrow(() -> new ResourceNotFoundException("Room Not Exist with Id :" + rid));
		return ResponseEntity.ok(room);
	}
	
	//Update Room
	@PutMapping("/room/{rid}")
	public ResponseEntity<Room> updateRoom(@PathVariable Long rid, @RequestBody Room roomDetails){
		Room room = roomRepository.findById(rid)
				.orElseThrow(() -> new ResourceNotFoundException("Room Not Exist with Id :" + rid));
		
		room.setRoom_numer(roomDetails.getRoom_numer());
		room.setBed_type(roomDetails.getBed_type());
		room.setCharg_for_day(roomDetails.getCharg_for_day());
		room.setRoom_type(roomDetails.getRoom_type());
		room.setStatus(roomDetails.getStatus());
		
		Room updateRoom = roomRepository.save(room);
		return ResponseEntity.ok(updateRoom);
	}
	
	//Update Room
	@PutMapping("/roomstatus/{rid}")
	public ResponseEntity<Room> updateRoomStatus(@PathVariable Long rid, @RequestBody Room roomDetails){
		Room room = roomRepository.findById(rid)
				.orElseThrow(() -> new ResourceNotFoundException("Room Not Exist with Id :" + rid));
		
		room.setStatus(roomDetails.getStatus());
		
		Room updateRoom = roomRepository.save(room);
		return ResponseEntity.ok(updateRoom);
	}
	
	// Delete Room
		@DeleteMapping("/room/{rid}")
		public ResponseEntity<Map<String, Boolean>> deleteRoom(@PathVariable Long rid){
			Room room = roomRepository.findById(rid)
					.orElseThrow(() -> new ResourceNotFoundException("Room Not Exist with Id :" + rid));
			
			roomRepository.delete(room);
			Map<String, Boolean> response = new HashMap<>();
			response.put("Deleted", Boolean.TRUE);
			return ResponseEntity.ok(response);
		}
}
