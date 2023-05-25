import './createHR.css'
import { useEffect, useState } from 'react'
import axios from "axios"
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress, Switch } from '@mui/material';

function EditHRFields(props) {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        LinkedInProfile: "",
        bio: "",
        companyId: localStorage.getItem("companyId"),
        isAdmin: false
    });

    useEffect(() => {
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        try {
            const response = await axios.post(`/hrms`, formData)
            console.log(response.data);
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                LinkedInProfile: "",
                bio: "",
                companyId: localStorage.getItem("companyId"),
                isAdmin: false
            })
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
        notify();
        setLoading(false);
    };

    const notify = () => toast.success('HR Created', {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    return (
        <>
            <div className="hrFieldsWrapper">
                <div className="topBar">
                    <div className="topHeadings">
                        <div className="Heading">Create a new HRM</div>
                        <div className="HText">Add profile details here</div>
                    </div>
                    <div className="buttonContainer">

                    </div>
                </div>
                <div className="panesWrapper">
                    <div className="panes">
                        {(loading) ?
                            <div className="rightSide">
                                <div className="rightSideLoading">
                                    <CircularProgress />
                                </div >
                            </div>
                            :
                            <div className="rightSide">
                                <div className="pfpSelectionHeading">
                                    <div className="detailsHeaderBar">
                                        <div className="subHeading">Add Details</div>
                                        <button className="preview" onClick={handleSubmit}>{loading ? "Saving..." : "Create HR"}</button>
                                    </div>
                                    <div className="forms">
                                        <div className="nameFields">
                                            <input type="text" value={formData.firstName} id='namef' className="TextFieldSmall" placeholder='First Name' name='firstName' onChange={handleChange} required />
                                            <input type="text" value={formData.lastName} id='namef' className="TextFieldSmall" placeholder='Last Name' name='lastName' onChange={handleChange} required />
                                        </div>
                                        <input type="text" value={formData.email} className="TextFieldSmall" placeholder='Email' name='email' onChange={handleChange} required />
                                        <input type="text" value={formData.LinkedInProfile} className="TextFieldSmall" placeholder='LinkedIn' name='LinkedInProfile' onChange={handleChange} required />
                                        <input type="password" value={formData.password} className="TextFieldSmall" placeholder='Password' name='password' onChange={handleChange} required />
                                        <div className="isAdminCheckBox">
                                            <Switch />
                                            <div className="">Admin</div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        <div className="leftSide">
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
export default EditHRFields