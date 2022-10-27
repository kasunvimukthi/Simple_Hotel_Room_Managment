import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export default function Rooms() {

  const [rooms, setRoom] = useState([])

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/rooms");
    setRoom(result.data);
  };

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [show2, setShow2] = useState(false);
  const handleShow2 = () => setShow2(true);
  const handleClose2 = () => setShow2(false);

  const [user, setUser] = useState({
    rid: "",
    room_numer: "",
    room_type: "",
    bed_type: "",
    charg_for_day: "",
    status: "Available"
  });

  const { rid, room_numer, room_type, bed_type, charg_for_day, status } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    if (user.room_numer === '') {
      toast.info("Please Enter Room Number");
      e.preventDefault();
    } else
      if (user.room_type === '') {
        toast.info("Please Selcet Room Type");
        e.preventDefault();
      } else
        if (user.bed_type === '') {
          toast.info("Please Select Bed Type");
          e.preventDefault();
        } else
          if (user.charg_for_day === '') {
            toast.info("Please Enter Charge for Day");
            e.preventDefault();
          } else {
            e.preventDefault();
            await axios.post("http://localhost:8080/api/v1/room", user)
            handleClose();
            loadRooms();
            toast.success("New Room Information Insert Successfull");
          }
  };

  const onSubmit2 = async (e) => {
    if (user.room_numer === '') {
      toast.info("Please Enter Room Number");
      e.preventDefault();
    } else
      if (user.room_type === '') {
        toast.info("Please Selcet Room Type");
        e.preventDefault();
      } else
        if (user.bed_type === '') {
          toast.info("Please Select Bed Type");
          e.preventDefault();
        } else
          if (user.charg_for_day === '') {
            toast.info("Please Enter Charge for Day");
            e.preventDefault();
          } else {
            e.preventDefault();
            await axios.put(`http://localhost:8080/api/v1/room/${rid}`, user)
            handleClose2();
            loadRooms();
            toast.success("Room Information Updated Successfull");
          }
  };

  const edit = async (rid) => {
    const result = await axios.get(`http://localhost:8080/api/v1/room/${rid}`);
    setUser(result.data);
    handleShow2();
  };

  const deleteRoom = async (rid) => {
    const result = await axios.delete(`http://localhost:8080/api/v1/room/${rid}`);
    setUser(result.data);
    loadRooms();
    toast.success("Room Information Delete Successfull");
  };

  const modalshow = async () => {
    user.rid = '';
    user.room_numer = '';
    user.room_type = '';
    user.bed_type = '';
    user.charg_for_day = '';
    handleShow();
  }
  return (
    <div className='bg-light shadow rounded-5 p-3 h-100 y-scroll'>
      <div className='p-1 '>
        <div className="row no-gutters">
          <h4 className='col'>Rooms Information</h4>
          <button className='btn btn-primary col-auto m-2' onClick={modalshow}>New</button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header className='text-primary' closeButton>Add New Room Information</Modal.Header>
            <Modal.Body>

              <div className="">
                <label htmlFor="form-label">Room Number</label>
                <input className='form-control' type="number" name="room_numer" id="room_numer" value={room_numer} onChange={(e) => onInputChange(e)} />
              </div>

              <div className="mt-1">
                <label htmlFor="form-label">Select Room Type</label>
                <select className='form-select' name="room_type" id="room_type" value={room_type} onChange={(e) => onInputChange(e)}>
                  <option value="" disabled>Select Room Type</option>
                  <option value="A/C">A/C</option>
                  <option value="Non A/C">Non A/C</option>
                </select>
              </div>

              <div className="m-1">
                <label htmlFor="form-label">Select Bed Type</label>
                <select className='form-select' name="bed_type" id="bed_type" value={bed_type} onChange={(e) => onInputChange(e)}>
                  <option value="" disabled>Select Bed Type</option>
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                </select>
              </div>

              <div className="m-1">
                <label htmlFor="form-label">Charge for one day</label>
                <input className='form-control' type="text" name="charg_for_day" id="charg_for_day" value={charg_for_day} onChange={(e) => onInputChange(e)} />
              </div>

            </Modal.Body>
            <Modal.Footer>
              <div className="text-right">
                <button className='btn btn-primary mx-1' type='submit' onClick={(e) => onSubmit(e)}>Insert</button>
                <button className='btn btn-secondary mx-1' onClick={handleClose} type='clean'>Cancel</button>
              </div>
            </Modal.Footer>
          </Modal>

          <Modal show={show2} onHide={handleClose2}>
            <Modal.Header className='text-primary' closeButton>Edit Room Information</Modal.Header>
            <Modal.Body>

              <div className="">
                <label htmlFor="form-label">Room Number</label>
                <input className='form-control' type="text" name="room_numer" id="room_numer" value={room_numer} onChange={(e) => onInputChange(e)} />
              </div>

              <div className="mt-1">
                <label htmlFor="form-label">Select Room Type</label>
                <select className='form-select' name="room_type" id="room_type" value={room_type} onChange={(e) => onInputChange(e)}>
                  <option value="" disabled>Select Room Type</option>
                  <option value="A/C">A/C</option>
                  <option value="Non A/C">Non A/C</option>
                </select>
              </div>

              <div className="m-1">
                <label htmlFor="form-label">Select Bed Type</label>
                <select className='form-select' name="bed_type" id="bed_type" value={bed_type} onChange={(e) => onInputChange(e)}>
                  <option value="" disabled>Select Bed Type</option>
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                </select>
              </div>

              <div className="m-1">
                <label htmlFor="form-label">Charge for one day</label>
                <input className='form-control' type="text" name="charg_for_day" id="charg_for_day" value={charg_for_day} onChange={(e) => onInputChange(e)} />
              </div>

              <div className="m-1">
                <label htmlFor="form-label">Select Room Status</label>
                <select className='form-select' name="status" id="status" value={status} onChange={(e) => onInputChange(e)}>
                  <option value="" disabled>Select Room Status</option>
                  <option value="Available">Available</option>
                  <option value="Book">Book</option>
                  <option value="Clean">Clean</option>

                </select>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className="text-right">
                <button className='btn btn-primary mx-1' type='submit' onClick={(e) => onSubmit2(e)}>Edit</button>
                <button className='btn btn-secondary mx-1' onClick={handleClose2} type='clean'>Cancel</button>
              </div>
            </Modal.Footer>
          </Modal>
        </div>

        <table className='table shadow table-bordered table-responsive table-white'>
          <thead>
            <tr>
              <th>#</th>
              <th>Room No</th>
              <th>AC/No A/C</th>
              <th>Bed Type</th>
              <th>Charge for Day</th>
              <th>Status</th>
              <th className='text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              rooms.map((room, index) => (
                <tr>
                  <th>{room.rid}</th>
                  <td>{room.room_numer}</td>
                  <td>{room.room_type}</td>
                  <td>{room.bed_type}</td>
                  <td>{room.charg_for_day}</td>
                  <td>{room.status}</td>

                  <td className='text-center'>
                    <button className='btn btn-primary m-1 edit_btn' title='Edit' id={room.rid} onClick={edit.bind(this, room.rid)}><FaEdit /></button>
                    <button className='btn btn-danger m-1' title='Delete' onClick={deleteRoom.bind(this, room.rid)}><FaTrashAlt /></button>

                  </td>
                </tr>
              ))
            }


          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  )
}
