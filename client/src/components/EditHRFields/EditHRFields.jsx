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
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        LinkedInProfile: "",
        email: "",
        bio: ""
    });

    const handleImage = (e) => {
        console.log(e.target.files[0])
        setImg(e.target.files[0])
    }

    const handleUpload = () => {
        setIsUploading(true)
        const formdata = new FormData();
        formdata.append('filename', img)
        axios.post('/upload/', formdata).then((res) => {
            axios.put("/hrms/644f10bbbbd3951b057a3c6f", {
                "pfpURL": res.data.downloadURL
            })
            HRM.pfpURL = res.data.downloadURL
            console.log("uploaded")
            setIsUploading(false)
            notify();
        })
    }

    useEffect(() => {
        const fetchHR = async () => {
            try {
                const res = await axios.get("/hrms/644f10bbbbd3951b057a3c6f");
                setHRM(res.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchHR().then(() => {
            formData.firstName = HRM.firstName;
            formData.lastName = HRM.lastName;
            formData.email = HRM.email;
            formData.LinkedInProfile = HRM.LinkedInProfile;
            formData.bio = HRM.bio;
        })
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true)
            const response = await axios.put('/hrms/644f10bbbbd3951b057a3c6f', formData)
                .then(setLoading(false));
            console.log(response.data);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
        notify();
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
                        <button className="discard">Discard</button>
                        <button className="preview" onClick={handleSubmit}>{loading ? "Saving..." : "Save"}</button>
                    </div>
                </div>
                <div className="panesWrapper">
                    <div className="panes">
                        <div className="rightSide">
                            <div className="pfpSelectionHeading">
                                <div className="subHeading">Details</div>
                                <div className="forms">
                                    <div className="nameFields">
                                        <input type="text" id='namef' className="TextFieldSmall" placeholder='First Name' name='firstName' onChange={handleChange} defaultValue={formData.firstName} />
                                        <input type="text" id='namef' className="TextFieldSmall" placeholder='Last Name' name='lastName' onChange={handleChange} defaultValue={formData.lastName} />
                                    </div>
                                    <input type="text" className="TextFieldSmall" placeholder='Email' name='email' onChange={handleChange} defaultValue={formData.email} />
                                    <input type="text" className="TextFieldSmall" placeholder='LinkedIn' name='LinkedInProfile' onChange={handleChange} defaultValue={formData.LinkedInProfile} />
                                    <textarea id="" cols="30" rows="10" className="TextFieldBig" placeholder='Bio' name='bio' onChange={handleChange} defaultValue={formData.bio} />
                                </div>
                            </div>
                        </div>
                        <div className="leftSide">
                            <div className="pfpSelectionHeading">
                                <div className="subHeading">Profile Picture</div>
                                <div className="HTextSmaller">Select a dashing confident profile picture.</div>
                            </div>
                            <div className="profileImageSelection">
                                <div className="profilePic">
                                    {isUploading ? <CircularProgress /> :
                                        <img src={HRM.pfpURL} alt="" className="pfp" />
                                    }
                                </div>
                                <div className="pfpButtons">
                                    <input type='file' onChange={handleImage}></input>
                                    <button className="pfpUpload" onClick={handleUpload} ><Upload /> UPLOAD</button>
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