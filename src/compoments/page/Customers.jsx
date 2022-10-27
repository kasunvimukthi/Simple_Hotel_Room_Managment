import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Customers() {

  const [customers, setCustom] = useState([])

  useEffect(() => {
    loadCustomer();
  }, []);

  const loadCustomer = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/customers");
    setCustom(result.data);
  };

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [show2, setShow2] = useState(false);
  const handleShow2 = () => setShow2(true);
  const handleClose2 = () => setShow2(false);

  const [cust, setCust] = useState({
    cid: "",
    firstName: "",
    lastName: "",
    address: "",
    contact_number: "",
    id_number: "",
    age: ""
  });

  const { cid, firstName, lastName, address, contact_number, id_number, age } = cust;

  const onInputChange = (e) => {
    setCust({ ...cust, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    if (cust.firstName === '') {
      toast.info("Please Enter Customer First Name");
      e.preventDefault();
    } else
      if (cust.lastName === '') {
        toast.info("Please Enter Customer Last Name");
        e.preventDefault();
      } else
        if (cust.address === '') {
          toast.info("Please Enter Customer Address");
          e.preventDefault();
        } else
          if (cust.contact_number === '') {
            toast.info("Please Enter Customer Contact Number");
            e.preventDefault();
          } else
            if (cust.id_number === '') {
              toast.info("Please Enter Customer ID Number");
              e.preventDefault();
            } else
              if (cust.age === '') {
                toast.info("Please Enter Customer Age");
                e.preventDefault();
              } else {
                e.preventDefault();
                await axios.post("http://localhost:8080/api/v1/customer", cust)
                handleClose();
                loadCustomer();
                toast.success("New Customer Information Insert Successfull");
              }
  };

  const onSubmit2 = async (e) => {
    if (cust.firstName === '') {
      toast.info("Please Enter Customer First Name");
      e.preventDefault();
    } else
      if (cust.lastName === '') {
        toast.info("Please Enter Customer Last Name");
        e.preventDefault();
      } else
        if (cust.address === '') {
          toast.info("Please Enter Customer Address");
          e.preventDefault();
        } else
          if (cust.contact_number === '') {
            toast.info("Please Enter Customer Contact Number");
            e.preventDefault();
          } else
            if (cust.id_number === '') {
              toast.info("Please Enter Customer ID Number");
              e.preventDefault();
            } else
              if (cust.age === '') {
                toast.info("Please Enter Customer Age");
                e.preventDefault();
              } else {
                console.log(cid);
                e.preventDefault();
                await axios.put(`http://localhost:8080/api/v1/customer/${cid}`, cust)
                handleClose2();
                loadCustomer();
                toast.success("Customer Information Edit Successfull");
              }
  };

  const edit = async (cid) => {
    const result = await axios.get(`http://localhost:8080/api/v1/customer/${cid}`);
    setCust(result.data);
    handleShow2();
  };

  const deleteRoom = async (cid) => {
    const result = await axios.delete(`http://localhost:8080/api/v1/customer/${cid}`);
    setCust(result.data);
    loadCustomer();
    toast.success("Customer Information Delete Successfull");
  };

  const modalshow = async () => {
    cust.firstName = '';
    cust.lastName = '';
    cust.address = '';
    cust.contact_number = '';
    cust.id_number = '';
    handleShow();
  }
  return (
    <div className='bg-light shadow rounded-5 p-3 h-100 y-scroll'>
      <div className='p-1 '>
        <div className="row no-gutters">
          <h4 className='col'>Customers Information</h4>
          <button className='btn btn-primary col-auto m-2' onClick={modalshow}>New</button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header className='text-primary' closeButton>Create New Customer</Modal.Header>
            <Modal.Body>

              <div className="m-1">
                <label htmlFor="form-label">First Name</label>
                <input className='form-control' type="text" name="firstName" id="firstName" value={firstName} onChange={(e) => onInputChange(e)} />
              </div>

              <div className="m-1">
                <label htmlFor="form-label">Last Name</label>
                <input className='form-control' type="text" name="lastName" id="lastName" value={lastName} onChange={(e) => onInputChange(e)} />
              </div>

              <div className="m-1">
                <label htmlFor="form-label">Age</label>
                <input className='form-control' type="text" name="age" id="age" value={age} onChange={(e) => onInputChange(e)} />
              </div>

              <div className="m-1">
                <label htmlFor="form-label">Address</label>
                <input className='form-control' type="text" name="address" id="address" value={address} onChange={(e) => onInputChange(e)} />
              </div>

              <div className="m-1">
                <label htmlFor="form-label">Contact Number</label>
                <input className='form-control' type="text" name="contact_number" id="contact_number" value={contact_number} onChange={(e) => onInputChange(e)} />
              </div>

              <div className="m-1">
                <label htmlFor="form-label">ID</label>
                <input className='form-control' type="text" name="id_number" id="id_number" value={id_number} onChange={(e) => onInputChange(e)} />
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
            <Modal.Header className='text-primary' closeButton>Edit Customer Information</Modal.Header>
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
                <label htmlFor="form-label">Age</label>
                <input className='form-control' type="text" name="age" id="age" value={age} onChange={(e) => onInputChange(e)} />
              </div>

              <div className="">
                <label htmlFor="form-label">Address</label>
                <input className='form-control' type="text" name="address" id="address" value={address} onChange={(e) => onInputChange(e)} />
              </div>

              <div className="">
                <label htmlFor="form-label">Contact</label>
                <input className='form-control' type="text" name="contact_number" id="contact_number" value={contact_number} onChange={(e) => onInputChange(e)} />
              </div>

              <div className="">
                <label htmlFor="form-label">ID</label>
                <input className='form-control' type="text" name="id_number" id="id_number" value={id_number} onChange={(e) => onInputChange(e)} />
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
              <th>Age</th>
              <th>ID</th>

              <th className='text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              customers.map((custom) => (
                <tr>
                  <th>{custom.cid}</th>
                  <td>{custom.firstName}</td>
                  <td>{custom.lastName}</td>
                  <td>{custom.address}</td>
                  <td>{custom.contact_number}</td>
                  <td>{custom.age}</td>
                  <td>{custom.id_number}</td>

                  <td className='text-center'>
                    <button className='btn btn-primary m-1 edit_btn' title='Edit' id={custom.cid} onClick={edit.bind(this, custom.cid)}><FaEdit /></button>
                    <button className='btn btn-danger m-1' title='Delete' onClick={deleteRoom.bind(this, custom.cid)}><FaTrashAlt /></button>

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
