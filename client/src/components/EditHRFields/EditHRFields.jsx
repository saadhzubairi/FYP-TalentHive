import { Delete, Upload } from '@mui/icons-material'
import './editHRFields.css'
import { useEffect, useState } from 'react'
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function EditHRFields(props) {
    const [HRM, setHRM] = useState({ _id: "n/a" })
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        LinkedInProfile: "",
        email: "",
        bio: ""
    });
    useEffect(() => {
        const fetchHR = async () => {
            try {
                const res = await axios.get("/hrms/644f10bbbbd3951b057a3c6f");
                setHRM(res.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchHR();
    }, []);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put('/hrms/644f10bbbbd3951b057a3c6f', formData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

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
                        <button className="preview" onClick={handleSubmit}>Save</button>
                    </div>
                </div>
                <div className="panes">
                    <div className="rightSide">
                        <div className="pfpSelectionHeading">
                            <div className="subHeading">Details</div>
                            <div className="forms">
                                <div className="nameFields">
                                    <input type="text" className="TextFieldSmall" placeholder='First Name' name='firstName' onChange={handleChange} defaultValue={HRM.firstName} />
                                    <input type="text" className="TextFieldSmall" placeholder='Last Name' name='lastName' onChange={handleChange} defaultValue={HRM.lastName} />
                                </div>
                                <input type="text" className="TextFieldSmall" placeholder='Email' name='email' onChange={handleChange} defaultValue={HRM.email} />
                                <input type="text" className="TextFieldSmall" placeholder='LinkedIn' name='LinkedInProfile' onChange={handleChange} defaultValue={HRM.LinkedInProfile} />
                                <textarea id="" cols="30" rows="10" className="TextFieldBig" placeholder='Bio' name='bio' onChange={handleChange} defaultValue={HRM.bio} />
                            </div>
                        </div>
                    </div>
                    <div className="leftSide">
                        <div className="pfpSelectionHeading">
                            <div className="subHeading">Profile Picture</div>
                            {/* <div className="HTextSmaller">Select a dashing confident profile picture.</div> */}
                        </div>
                        <div className="profileImageSelection">
                            <div className="profilePic">
                                <img src="https://th.bing.com/th/id/OIP.KdBSw8TPL34eU6T7bjhpAAHaLH?pid=ImgDet&rs=1" alt="" className="pfp" />
                            </div>
                            <div className="pfpButtons">
                                <button className="pfpUpload"><Upload /> UPLOAD</button>
                                <button className="pfpDelete"><Delete /> DELETE</button>
                            </div>
                        </div>
                        <div className="stats">
                            <div className="HTextSmaller">Joined: November 2018</div>
                            <div className="HTextSmaller">Jobs Posted: 795</div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
export default EditHRFields