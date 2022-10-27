import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Employees() {

  const [employees, setEmploye] = useState([])

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/employees");
    setEmploye(result.data);
  };

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [show2, setShow2] = useState(false);
  const handleShow2 = () => setShow2(true);
  const handleClose2 = () => setShow2(false);

  const [emp, setEmp] = useState({
    id: "",
    firstName: "",
    lastName: "",
    address: "",
    contact: "",
    department: ""
  });

  const { id, firstName, lastName, address, contact, department } = emp;

  const onInputChange = (e) => {
    setEmp({ ...emp, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    if (emp.firstName === '') {
      toast.info("Please Enter Employee First Name");
      e.preventDefault();
    } else
      if (emp.lastName === '') {
        toast.info("Please Enter Employee Last Name");
        e.preventDefault();
      } else
        if (emp.address === '') {
          toast.info("Please Enter Employee Address");
          e.preventDefault();
        } else
          if (emp.contact === '') {
            toast.info("Please Enter Employee Contact Number");
            e.preventDefault();
          } else
            if (emp.department === '') {
              toast.info("Please Enter Employee Department");
              e.preventDefault();
            } else {
              e.preventDefault();
              await axios.post("http://localhost:8080/api/v1/employees", emp)
              handleClose();
              loadEmployee();
              toast.success("New Employee Information Insert Successfull");
            }
  };

  const onSubmit2 = async (e) => {
    if (emp.firstName === '') {
      toast.info("Please Enter Employee First Name");
      e.preventDefault();
    } else
      if (emp.lastName === '') {
        toast.info("Please Enter Employee Last Name");
        e.preventDefault();
      } else
        if (emp.address === '') {
          toast.info("Please Enter Employee Address");
          e.preventDefault();
        } else
          if (emp.contact === '') {
            toast.info("Please Enter Employee Contact Number");
            e.preventDefault();
          } else
            if (emp.department === '') {
              toast.info("Please Enter Employee Department");
              e.preventDefault();
            } else {
              console.log(id);
              e.preventDefault();
              await axios.put(`http://localhost:8080/api/v1/employees/${id}`, emp)
              handleClose2();
              loadEmployee();
              toast.success("Employee Information Edit Successfull");
            }
  };

  const edit = async (id) => {
    const result = await axios.get(`http://localhost:8080/api/v1/employees/${id}`);
    setEmp(result.data);
    handleShow2();
  };

  const deleteRoom = async (id) => {
    const result = await axios.delete(`http://localhost:8080/api/v1/employees/${id}`);
    setEmp(result.data);
    loadEmployee();
    toast.success("Employee Information Delete Successfull");
  };

  const modalshow = async () => {
    emp.firstName = '';
    emp.lastName = '';
    emp.address = '';
    emp.contact = '';
    emp.department = '';
    handleShow();
  }
  return (
    <div className='bg-light shadow rounded-5 p-3 h-100 y-scroll'>
      <div className='p-1 '>
        <div className="row no-gutters">
          <h4 className='col'>Employees Information</h4>
          <button className='btn btn-primary col-auto m-2' onClick={modalshow}>New</button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header className='text-primary' closeButton>Add New Employee Information</Modal.Header>
            <Modal.Body>

              <div className="">
                <label htmlFor="form-label">First Name</label>
                <input className='form-control' type="text" name="firstName" id="firstName" value={firstName} onChange={(e) => onInputChange(e)} />
              </div>

              <div className="">
                <label htmlFor="form-label">Last Name</label>
                <input className='form-control' type="text" name="lastName" id="lastName" value={lastName} onChange={(e) => onInputChange(e)} />
              </div>

              <div className="">
                <label htmlFor="form-label">Address</label>
                <input className='form-control' type="text" name="address" id="address" value={address} onChange={(e) => onInputChange(e)} />
              </div>

              <div className="">
                <label htmlFor="form-label">Contact</label>
                <input className='form-control' type="text" name="contact" id="contact" value={contact} onChange={(e) => onInputChange(e)} />
              </div>

              <div className="mt-1">
                <label htmlFor="form-label">Select Department</label>
                <select className='form-select' name="department" id="department" value={department} onChange={(e) => onInputChange(e)}>
                  <option value="" disabled>Select Department Type</option>
                  <option value="Room Service">Room Service</option>
                  <option value="Kitchen">Kitchen</option>
                </select>
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
                <label htmlFor="form-label">First Name</label>
                <input className='form-control' type="text" name="firstName" id="firstName" value={firstName} onChange={(e) => onInputChange(e)} />
              </div>

              <div className="">
                <label htmlFor="form-label">Last Name</label>
                <input className='form-control' type="text" name="lastName" id="lastName" value={lastName} onChange={(e) => onInputChange(e)} />
              </div>

              <div className="">
                <label htmlFor="form-label">Address</label>
                <input className='form-control' type="text" name="address" id="address" value={address} onChange={(e) => onInputChange(e)} />
              </div>

              <div className="">
                <label htmlFor="form-label">Contact</label>
                <input className='form-control' type="text" name="contact" id="contact" value={contact} onChange={(e) => onInputChange(e)} />
              </div>

              <div className="mt-1">
                <label htmlFor="form-label">Select Department</label>
                <select className='form-select' name="department" id="department" value={department} onChange={(e) => onInputChange(e)}>
                  <option value="" disabled>Select Department Type</option>
                  <option value="Room Service">Room Service</option>
                  <option value="Kitchen">Kitchen</option>
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
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Contact No</th>
              <th>Job Department</th>
              <th className='text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              employees.map((employ, index) => (
                <tr>
                  <th>{employ.id}</th>
                  <td>{employ.firstName}</td>
                  <td>{employ.lastName}</td>
                  <td>{employ.address}</td>
                  <td>{employ.contact}</td>
                  <td>{employ.department}</td>

                  <td className='text-center'>
                    <button className='btn btn-primary m-1 edit_btn' title='Edit' id={employ.id} onClick={edit.bind(this, employ.id)}><FaEdit /></button>
                    <button className='btn btn-danger m-1' title='Delete' onClick={deleteRoom.bind(this, employ.id)}><FaTrashAlt /></button>

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
