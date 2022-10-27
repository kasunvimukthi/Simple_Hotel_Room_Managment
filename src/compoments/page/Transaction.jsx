import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FaEye } from "react-icons/fa";

export default function Transaction() {

    // Get Invoice Details
    useEffect(() => {
        loadInvoice();
    }, []);

    const [show1, setShow1] = useState(false);
    const handleShow1 = () => setShow1(true);
    const handleClose1 = () => setShow1(false);

    const [transactions, setInvoices] = useState([])

    const loadInvoice = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/transactions");
        setInvoices(result.data);
    };

    const [viewInv, viewInvoi] = useState({
        iid: "",
        cid: "",
        rid: "",
        date1: "",
        date2: "",
        date3: "",
        valueRoom: ""
    })


    const viewInvoice = async (iid) => {
        const result = await axios.get(`http://localhost:8080/api/v1/invoice/${iid}`);
        viewInvoi(result.data);
        handleShow1();
    };
    return (
        <div className='bg-light shadow rounded-5 p-3 h-100 y-scroll'>
            <div className='p-1 '>
                <h4>Transactions Details</h4>
                <Modal show={show1} onHide={handleClose1}>
                    <Modal.Header className='text-primary' closeButton>View Invoice</Modal.Header>
                    <Modal.Body>

                        <div className="mt-1">
                            <label htmlFor="form-label">Invoice Number</label>
                            <input className='form-control' type='text' value={viewInv.iid} />
                        </div>

                        <div className="mt-1">
                            <label htmlFor="form-label">Customer's System ID</label>
                            <input className='form-control' type='text' value={viewInv.cid} />
                        </div>

                        <div className="m-1">
                            <label htmlFor="form-label">Room's System ID</label>
                            <input className='form-control' type='text' value={viewInv.rid} />
                        </div>

                        <div className="m-1">
                            <label htmlFor="form-label">Date In</label>
                            <input className='form-control' type='text' value={viewInv.date1} />
                        </div>

                        <div className="m-1">
                            <label htmlFor="form-label">Date Out</label>
                            <input className='form-control' type='text' value={viewInv.date2} />
                        </div>

                        <div className="m-1">
                            <label htmlFor="form-label">Number of Day</label>
                            <input className='form-control' type='text' value={viewInv.date3} />
                        </div>

                        <div className="m-1">
                            <label htmlFor="form-label">Invoice Value</label>
                            <input className='form-control' type='text' value={viewInv.valueRoom} />
                        </div>

                    </Modal.Body>

                </Modal>
                <table className='table shadow table-bordered table-responsive table-white'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Invoice No</th>
                            <th>Payment Value</th>
                            <th>Balance</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transactions.map((trans) => (
                                <tr>
                                    <td>{trans.tid}</td>
                                    <td>{trans.iid}</td>
                                    <td>{trans.paymentVal}</td>
                                    <td>{trans.balance}</td>

                                    <td className='text-center'>
                                        <button className='btn btn-primary m-1' title='View Invoice' id={trans.iid} onClick={viewInvoice.bind(this, trans.iid)}><FaEye /></button>

                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}
