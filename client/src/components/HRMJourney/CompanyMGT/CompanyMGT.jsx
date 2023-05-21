import { useEffect, useState } from 'react'
import './companyMGT.css'
import axios from 'axios'
import { CircularProgress, LinearProgress } from '@mui/material'
import { Delete, Upload } from '@mui/icons-material'
import HRBuddy from '../../Widgets/HRBuddy/HRBuddy'

function CompanyMGT(props) {
    const [company, setCompany] = useState({ _id: 'n/a' })
    const [isUploading, setIsUploading] = useState(false)
    const [img, setImg] = useState('')
    const [isPicOn, setIsPicOn] = useState(false)
    const [loading, setLoading] = useState(false)
    const [HRMS, setHRMS] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        phone: '',
        email: '',
        website: '',
        industry: '',
        description: '',
    });

    useEffect(() => {
        const getCompany = async () => {
            await axios.get(`/company?id=${localStorage.getItem("companyId")}`)
                .then((res) => { setCompany(res.data); setFormData(res.data) })
                .catch((err) => console.log(err))
            console.log(company);
        }
        const getHRMs = async () => {
            await axios.get(`/hrms?companyId=${localStorage.getItem("companyId")}`)
                .then((res) => setHRMS(res.data))
                .catch((err) => console.log(err))
            console.log(HRMS);
        }
        getCompany();
        getHRMs();
    }, [])

    const handleImage = (e) => {
        setIsPicOn(true)
        console.log(e.target.files[0])
        setImg(e.target.files[0])
    }

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
            const response = await axios.put(`/company/${localStorage.getItem("companyId")}`, formData)
            console.log(response.data);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
        setLoading(false);
    };

    const handleUpload = () => {
        setIsUploading(true)
        const formdata = new FormData();
        formdata.append('filename', img)

        //Delete the existing file
        axios.put('/upload/', {
            fileUrl: company.logoUrl
        }).then(() => console.log("Deleted!")).catch((err) => console.log(err))

        //post new image and save it in the company model
        axios.post('/upload/', formdata).then((res) => {
            axios.put(`/company/${localStorage.getItem("companyId")}`, {
                "logoUrl": res.data.downloadURL
            })
            company.logoUrl = res.data.downloadURL
            console.log("uploaded")
            setIsUploading(false)
            /* notify(); */
        })
        setIsPicOn(false)
    }

    return (
        <div className="CompanyMGT">
            {company._id === "n/a" ? <LinearProgress /> : <div className="CMGTtopbar">{company.name}</div>}
            {company._id === "n/a" ? <CircularProgress /> : <div className="CMGTbottomBody">
                <div className="CMGTleftPanelViewPort">
                    <div className="CMGTrightPanelwrapper">

                        {loading ? <CircularProgress /> : <form className="CMGTeditInfoForm">
                            <div className="CMGTTopBarInfo">
                                <div className="CMGTsubHeading">Edit Info</div>
                                <button className="preview" onClick={handleSubmit}> SAVE{/* {loading ? "Saving..." : "Save"} */}</button>
                            </div>
                            <input className='TextFieldSmall' onChange={handleChange} value={formData.name} placeholder='Name' type="text" name="name" />
                            <input className='TextFieldSmall' onChange={handleChange} value={formData.location} placeholder='Location' type="text" name="location" />
                            <input className='TextFieldSmall' onChange={handleChange} value={formData.phone} placeholder='Phone#' type="text" name="phone" />
                            <input className='TextFieldSmall' onChange={handleChange} value={formData.email} placeholder='Email' type="text" name="email" />
                            <input className='TextFieldSmall' onChange={handleChange} value={formData.website} placeholder='Website' type="text" name="website" />
                            <input className='TextFieldSmall' onChange={handleChange} value={formData.industry} placeholder='Industry' type="text" name="industry" />
                            <input className='TextFieldSmall' onChange={handleChange} value={formData.description} placeholder='Description' type="text" name="description" />
                        </form>}
                        <div className="CMGTsubHeading">Company Logo</div>
                        <div className="logoSelectionContainer">
                            <div className="profileImageSelection">
                                <div className="profilePic">
                                    {isUploading ?
                                        <div className="pfpLoading">
                                            <CircularProgress />
                                        </div>
                                        :
                                        <img src={company.logoUrl} alt="" className="pfp" />
                                    }
                                </div>
                                <div className="pfpButtons">
                                    <input type='file' onChange={handleImage}></input>
                                    <button className="pfpUpload" onClick={handleUpload} disabled={!isPicOn} ><Upload /> Upload</button>
                                    <button className="pfpDelete"><Delete /> Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="CMGTrightPanelViewPort">
                    <div className="CMGTrightPanelwrapper">
                        <div className="CMGTsubHeading">HR Managers</div>
                        {HRMS.map((hrm) => <HRBuddy key={hrm._id} HRM={hrm} />)}
                    </div>
                </div>
            </div>}
        </div>
    )
}
export default CompanyMGT