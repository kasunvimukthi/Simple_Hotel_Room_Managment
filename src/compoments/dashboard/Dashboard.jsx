import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FaCashRegister, FaUserAlt, FaUserCheck } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {

    // Get Rooms Details
    const [rooms, setRoom] = useState([])

    useEffect(() => {
        loadRooms();
        loadCustomer();
        loadInvoice();
        RoomsCount();
        ActRoomsCount();
        CleanRoomsCount();
        BookRoomsCount();
    }, []);

    const loadRooms = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/activerooms");
        setRoom(result.data);
    };

    const [NumberOfRooms, setNumberOfRooms] = useState([])

    const RoomsCount = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/roomcount");
        setNumberOfRooms(result);
    };

    const [NumberOfactRooms, setNumberOfactRooms] = useState([])

    const ActRoomsCount = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/activeroomcount");
        setNumberOfactRooms(result);
    };

    const [NumberOfcleanRooms, setNumberOfcleantRooms] = useState([])

    const CleanRoomsCount = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/cleanroomcount");
        setNumberOfcleantRooms(result);
    };

    const [NumberOfbookRooms, setNumberOfbookRooms] = useState([])

    const BookRoomsCount = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/bookroomcount");
        setNumberOfbookRooms(result);
    };

    // Get Customers Details
    const [customers, setCustom] = useState([])

    const loadCustomer = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/customers");
        setCustom(result.data);
    };

    // Get Invoice Details
    const [invoices, setInvoices] = useState([])

    const loadInvoice = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/notPaidInvoices");
        setInvoices(result.data);
    };

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [show3, setShow3] = useState(false);
    const handleShow3 = () => setShow3(true);
    const handleClose3 = () => setShow3(false);

    const [show4, setShow4] = useState(false);
    const handleShow4 = () => setShow4(true);
    const handleClose4 = () => setShow4(false);

    const onInputChange = (e) => {
        setCust({ ...cust, [e.target.name]: e.target.value });
    };

    const [cust, setCust] = useState({
        cid: ""
    });

    const { cid } = cust;

    const onInputChange1 = (e) => {
        setRoom1({ ...room1, [e.target.name]: e.target.value });
        edit(e.target.value);
    };

    const [room1, setRoom1] = useState({
        rid: ""
    });

    const { rid } = room1;

    const edit = async (rid) => {
        const result = await axios.get(`http://localhost:8080/api/v1/room/${rid}`);
        setRoom2(result.data);
    };

    const [room2, setRoom2] = useState({
        charg_for_day: "0"
    });

    const { charg_for_day } = room2;

    const [date1, setDate1] = useState();
    const [date2, setDate2] = useState();
    const [date4, setDate4] = useState();

    const dateOne = new Date(date1);
    const dateTwo = new Date(date2);

    const date3 = Math.abs(dateTwo - dateOne) / (1000 * 60 * 60 * 24);

    const valueRoom = charg_for_day * date3;

    const iid = "";

    const status = "";

    const [getInvo, selectinvo] = useState({
        iid,
        cid,
        rid,
        date1,
        date2,
        date3,
        valueRoom
    });

    const creatInvo = {
        cid,
        rid,
        date1,
        date2,
        date3,
        valueRoom,
        status: "Not Paid"
    }

    const paymentStatus = {
        iid: getInvo.iid,
        status: "Paid"
    }

    const roomStatus = {
        rid: "",
        status: "Book"
    }

    const roomStatus2 = {
        rid: getInvo.iid,
        status: "Clean"
    }

    const onSubmit = async (e) => {
        if (cid === '') {
            toast.info("Please Select Customer");
            e.preventDefault();
        } else
            if (rid === '') {
                toast.info("Please Select Room Number");
                e.preventDefault();
            } else
                if (date1 === date4) {
                    toast.info("Please Select Date In");
                    e.preventDefault();
                } else
                    if (date2 === date4) {
                        toast.info("Please Select Date Out");
                        e.preventDefault();
                    } else {
                        e.preventDefault();
                        await axios.post("http://localhost:8080/api/v1/invoice", creatInvo)
                        await axios.put(`http://localhost:8080/api/v1/roomstatus/${rid}`, roomStatus);
                        loadRooms();
                        loadCustomer();
                        RoomsCount();
                        ActRoomsCount();
                        CleanRoomsCount();
                        BookRoomsCount();
                        handleClose();
                        loadInvoice();
                        toast.success("New Invoice Created Successfull");
                    }
    };

    const onPay = async (e) => {
        if (getInvo.iid === '') {
            toast.info("Please Contact Developer");
            e.preventDefault();
        } else
            if (getInvo.cid === '') {
                toast.info("Please Contact Developer");
                e.preventDefault();
            } else
                if (getInvo.valueRoom === '') {
                    toast.info("Please Contact Developer");
                    e.preventDefault();
                } else
                    if (paymentVal === '') {
                        toast.info("Please Enter Payment Value");
                        e.preventDefault();
                    } else {
                        e.preventDefault();
                        await axios.post("http://localhost:8080/api/v1/transaction", creatTrans);
                        await axios.put(`http://localhost:8080/api/v1/invoice/${getInvo.iid}`, paymentStatus);
                        await axios.put(`http://localhost:8080/api/v1/roomstatus/${rid}`, roomStatus2);
                        loadRooms();
                        loadCustomer();
                        RoomsCount();
                        ActRoomsCount();
                        CleanRoomsCount();
                        BookRoomsCount();
                        handleClose3();
                        loadInvoice();
                        toast.success("Payment Successfull");
                    }
    };

    const modalshow = async () => {
        creatInvo.cid = '';
        creatInvo.date3 = '';
        creatInvo.Body = '';
        handleShow();
    }

    const selectInvo = async (iid2) => {
        const result = await axios.get(`http://localhost:8080/api/v1/invoice/${iid2}`);
        selectinvo(result.data);
        handleShow3();
    };

    const [paymentVal, setPaymentVal] = useState();

    const balance = getInvo.valueRoom - paymentVal;

    const creatTrans = {
        iid: getInvo.iid,
        paymentVal,
        balance
    }

    const [viewCust, viewCusto] = useState({
        cid: "",
        firstName: "",
        lastName: "",
        address: "",
        contact_number: "",
        id_number: "",
        age: ""
    });

    const viewCustomer = async (cid) => {
        const result = await axios.get(`http://localhost:8080/api/v1/customer/${cid}`);
        viewCusto(result.data);
        handleShow4();
    };

    // localStorage.setItem('token',viewCust)
    return (
        <div className='bg-light shadow rounded-5 p-3 h-100 y-scroll'>
            <h4>Rooms States</h4>
            <div className='row '>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Total Number of Rooms
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {NumberOfRooms.data}
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <i className="fa-2x text-gray-300"><FaUserAlt /></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Total Number of Rooms Available
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {NumberOfactRooms.data}
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <i className="fa-2x text-gray-300"><FaUserAlt /></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Total Number of Rooms Booked
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {NumberOfbookRooms.data}
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <i className="fa-2x text-gray-300"><FaUserAlt /></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-danger shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Total No of rooms for clean
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {NumberOfcleanRooms.data}
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <i className="fa-2x text-gray-300"><FaUserAlt /></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className='p-1 '>
                <div className="row no-gutters">
                    <h4 className='col'>Invoice List</h4>
                    <button className='btn btn-primary col-auto m-2' onClick={modalshow}>New</button>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header className='text-primary' closeButton>Create New Invoice</Modal.Header>
                    <Modal.Body>

                        <div className="mt-1">
                            <label htmlFor="form-label">Select Customer</label>
                            <select className='form-select' name="cid" id="cid" value={cid} onChange={(e) => onInputChange(e)}>
                                {
                                    customers.map((custom) => (

                                        <option value={custom.cid}>{custom.firstName}</option>

                                    ))
                                }
                            </select>
                        </div>

                        <div className="mt-1">
                            <label htmlFor="form-label">Select Room</label>
                            <select className='form-select' name="rid" id="rid" value={rid} onChange={(e) => onInputChange1(e)}>
                                {
                                    rooms.map((room) => (

                                        <option value={room.rid}>{room.room_numer}</option>

                                    ))
                                }
                            </select>
                        </div>

                        <div className="m-1">
                            <label htmlFor="form-label">Date In</label>
                            <input className='form-control' type="date" name="date1" id="date1" selected={date1} onChange={e => setDate1(e.target.value)} />
                        </div>

                        <div className="m-1">
                            <label htmlFor="form-label">Date Out</label>
                            <input className='form-control' type="date" name="date2" id="date2" selected={date2} onChange={e => setDate2(e.target.value)} />
                        </div>

                        <div className="m-1">
                            <label htmlFor="form-label">Number of Day</label>
                            <input className='form-control' type="text" name="date3" id="date3" value={date3} disabled />
                        </div>

                        <div className="m-1">
                            <label htmlFor="form-label">Value</label>
                            <input className='form-control' type="text" name="id_number" id="id_number" value={valueRoom} disabled />
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <div className="text-right">
                            <button className='btn btn-primary mx-1' type='submit' onClick={(e) => onSubmit(e)}>Insert</button>
                            <button className='btn btn-secondary mx-1' onClick={handleClose} type='clean'>Cancel</button>
                        </div>
                    </Modal.Footer>
                </Modal>

                <Modal show={show3} onHide={handleClose3}>
                    <Modal.Header className='text-primary' closeButton>Create Payment</Modal.Header>
                    <Modal.Body>

                        <div className="mt-1">
                            <label htmlFor="form-label">Invoice Number</label>
                            <input type="text" className='form-control' name='' id='' value={getInvo.iid} disabled />
                        </div>

                        <div className="mt-1">
                            <label htmlFor="form-label">Customer ID</label>
                            <input type="text" className='form-control' name='' id='' value={getInvo.cid} disabled />
                        </div>

                        <div className="m-1">
                            <label htmlFor="form-label">Value</label>
                            <input className='form-control' type="text" name="id_number" id="id_number" value={getInvo.valueRoom} disabled />
                        </div>

                        <div className="mt-1">
                            <label htmlFor="form-label">Payment Value</label>
                            <input type="text" className='form-control' name='paymentVal' id='paymentVal' onChange={e => setPaymentVal(e.target.value)} />
                        </div>

                        <div className="mt-1">
                            <label htmlFor="form-label">Balance</label>
                            <input type="text" className='form-control' name='balance' id='balance' value={balance} disabled />
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <div className="text-right">
                            <button className='btn btn-primary mx-1' type='submit' onClick={(e) => onPay(e)}>Pay</button>
                            <button className='btn btn-secondary mx-1' onClick={handleClose3} type='clean'>Cancel</button>
                        </div>
                    </Modal.Footer>
                </Modal>

                <Modal show={show4} onHide={handleClose4}>
                    <Modal.Header className='text-primary' closeButton>View Customer Information</Modal.Header>
                    <Modal.Body>

                        <div className="">
                            <label htmlFor="form-label">First Name</label>
                            <input className='form-control' type="text" name="firstName" id="firstName" value={viewCust.firstName} />
                        </div>

                        <div className="">
                            <label htmlFor="form-label">Last Name</label>
                            <input className='form-control' type="text" name="lastName" id="lastName" value={viewCust.lastName} />
                        </div>

                        <div className="">
                            <label htmlFor="form-label">Age</label>
                            <input className='form-control' type="text" name="age" id="age" value={viewCust.age} />
                        </div>

                        <div className="">
                            <label htmlFor="form-label">Address</label>
                            <input className='form-control' type="text" name="address" id="address" value={viewCust.address} />
                        </div>

                        <div className="">
                            <label htmlFor="form-label">Contact</label>
                            <input className='form-control' type="text" name="contact_number" id="contact_number" value={viewCust.contact_number} />
                        </div>

                        <div className="">
                            <label htmlFor="form-label">ID</label>
                            <input className='form-control' type="text" name="id_number" id="id_number" value={viewCust.id_number} />
                        </div>

                    </Modal.Body>

                </Modal>
                <table className='table shadow table-bordered table-responsive table-white'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Customer ID</th>
                            <th>Room No</th>
                            <th>Date In</th>
                            <th>Date Out</th>
                            <th>Date Range</th>
                            <th>Value</th>
                            <th>Status</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            invoices.map((invoice) => (
                                <tr>
                                    <td>{invoice.iid}</td>
                                    <td>{invoice.cid}</td>
                                    <td>{invoice.rid}</td>
                                    <td>{invoice.date1}</td>
                                    <td>{invoice.date2}</td>
                                    <td>{invoice.date3}</td>
                                    <td>{invoice.valueRoom}</td>
                                    <td>{invoice.status}</td>

                                    <td className='text-center'>
                                        <button className='btn btn-primary m-1' title='Pay' id={invoice.iid} onClick={selectInvo.bind(this, invoice.iid)}><FaCashRegister /></button>
                                        <button className='btn btn-primary m-1' title='Customer' id={invoice.cid} onClick={viewCustomer.bind(this, invoice.cid)}><FaUserCheck /></button>

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
