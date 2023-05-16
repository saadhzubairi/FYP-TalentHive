import { Delete, Upload } from '@mui/icons-material'
import './editHRFields.css'
import { useEffect, useState } from 'react'
import axios from "axios"
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format, register } from "timeago.js"
import { CircularProgress } from '@mui/material';

function EditHRFields(props) {
    const [HRM, setHRM] = useState({ _id: "n/a" })
    const [img, setImg] = useState('')
    const [loading, setLoading] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [isPicOn, setIsPicOn] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "n/a",
        lastName: "",
        LinkedInProfile: "",
        email: "",
        bio: ""
    });

    const handleImage = (e) => {
        setIsPicOn(true)
        console.log(e.target.files[0])
        setImg(e.target.files[0])
    }

    const handleUpload = () => {
        setIsUploading(true)

        const formdata = new FormData();

        formdata.append('filename', img)

        axios.put('/upload/', {
            fileUrl: HRM.pfpURL
        }).then(() => console.log("Deleted!")).catch((err) => console.log(err))

        axios.post('/upload/', formdata).then((res) => {
            axios.put("/hrms/644f10bbbbd3951b057a3c6f", {
                "pfpURL": res.data.downloadURL
            })
            HRM.pfpURL = res.data.downloadURL
            console.log("uploaded")
            setIsUploading(false)
            notify();
        })

        setIsPicOn(false)
    }

    useEffect(() => {
        const fetchHR = async () => {
            try {
                if (formData.firstName === "n/a") {
                    const res = await axios.get("/hrms/644f10bbbbd3951b057a3c6f");
                    setHRM(res.data);
                    formData.firstName = res.data.firstName;
                    formData.lastName = res.data.lastName;
                    formData.email = res.data.email;
                    formData.LinkedInProfile = res.data.LinkedInProfile;
                    formData.bio = res.data.bio;
                }
            } catch (e) {
                console.log(e);
            }
        };
        fetchHR()
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
            const response = await axios.put('/hrms/644f10bbbbd3951b057a3c6f', formData)
            console.log(response.data);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
        notify();
        setLoading(false);
    };

    const notify = () => toast.success('Info Updated', {
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
                        <div className="Heading">Edit Details</div>
                        <div className="HText">Edit profile details here</div>
                    </div>
                    <div className="buttonContainer">

                    </div>
                </div>
                <div className="panesWrapper">
                    <div className="panes">
                        {(formData.firstName === "n/a" || loading) ?
                            <div className="rightSide">
                                <div className="rightSideLoading">
                                    <CircularProgress />
                                </div >
                            </div>
                            :
                            <div className="rightSide">
                                <div className="pfpSelectionHeading">
                                    <div className="detailsHeaderBar">
                                        <div className="subHeading">Details</div>
                                        <button className="preview" onClick={handleSubmit}>{loading ? "Saving..." : "Save"}</button>
                                    </div>
                                    <div className="forms">
                                        <div className="nameFields">
                                            <input type="text" id='namef' className="TextFieldSmall" placeholder='First Name' name='firstName' onChange={handleChange} defaultValue={formData.firstName} required />
                                            <input type="text" id='namef' className="TextFieldSmall" placeholder='Last Name' name='lastName' onChange={handleChange} defaultValue={formData.lastName} required />
                                        </div>
                                        <input type="text" className="TextFieldSmall" placeholder='Email' name='email' onChange={handleChange} defaultValue={formData.email} required />
                                        <input type="text" className="TextFieldSmall" placeholder='LinkedIn' name='LinkedInProfile' onChange={handleChange} defaultValue={formData.LinkedInProfile} required />
                                        <textarea id="" cols="30" rows="10" className="TextFieldBig" placeholder='Bio' name='bio' onChange={handleChange} defaultValue={formData.bio} required />
                                    </div>
                                </div>
                            </div>}
                        <div className="leftSide">
                            <div className="pfpSelectionHeading">
                                <div className="subHeading">Profile Picture</div>
                                <div className="HTextSmaller">Select a dashing confident profile picture.</div>
                            </div>
                            <div className="profileImageSelection">
                                <div className="profilePic">
                                    {isUploading ?
                                        <div className="pfpLoading">
                                            <CircularProgress />
                                        </div>
                                        :
                                        <img src={HRM.pfpURL} alt="" className="pfp" />
                                    }
                                </div>
                                <div className="pfpButtons">
                                    <input type='file' onChange={handleImage}></input>
                                    <button className="pfpUpload" onClick={handleUpload} disabled={!isPicOn} ><Upload /> UPLOAD</button>
                                    <button className="pfpDelete"><Delete /> DELETE</button>
                                </div>
                            </div>
                            <div className="stats">
                                <div className="HTextSmaller"><b>Joined:</b> {format(HRM.createdAt)}</div>
                                <div className="HTextSmaller"><b>Jobs Posted:</b> {HRM.jobsCreated !== undefined ? `${HRM.jobsCreated.length}` : `loading`}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
export default EditHRFields