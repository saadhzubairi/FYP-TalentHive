import { Email, LinkedIn, PinDrop, Work, } from '@mui/icons-material'
import './CandpreviewJob.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress, LinearProgress } from '@mui/material';

function PreviewJobDescCand({ }) {
    const { jobId } = useParams();
    const [jobs, setJobs] = useState({ _id: "n/a" })
    const [company, setCompany] = useState({ _id: "n/a" })
    const [hrm, setHrm] = useState({ _id: "n/a" })
    const [formData, setFormData] = useState({
        message1: '',
        message2: '',
    })
    const [candi, setCandi] = useState({ _id: "n/a" })
    const { message1, message2 } = formData;
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const navigate = useNavigate();
    useEffect(() => {
        const fetchJobs = async () => {
            await axios.get(`/jobs/${jobId}`).then(async (res) => {
                setJobs(res.data)
                await axios.get(`/company?id=${res.data.companyId}`)
                    .then(resc => setCompany(resc.data))
                    .catch(err => console.log(err))
                await axios.get(`/hrms/${res.data.HRCreatorId}`)
                    .then(resh => setHrm(resh.data))
                    .catch(err => console.log(err))
            }).catch(err => console.log(err));
        }

        const fetchCand = async () => {
            await axios.get(`/candidate?id=${localStorage.getItem("userId")}`)
                .then((res) => {
                    setCandi(res.data);
                    console.log(res.data);
                    console.log(candi)
                })
                .catch((err) => console.log(err))
        }
        fetchCand();
        fetchJobs();
    }, [])

    const handleApplyNow = async (e) => {
        e.preventDefault();

        if (localStorage.getItem("userType") == 3) {
            const req = { candidate: candi, jobScore: jobs.score }
            console.log(req)
            await axios.post("http://127.0.0.1:8000/score/", req)
                .then(async (res) => {
                    console.log(res.data)
                    await axios.post(`/jobApplications`, {
                        candidateId: localStorage.getItem(`userId`),
                        jobId: jobId,
                        message1: message1,
                        message2: message2,
                        rating: res.data.score,
                        status: 1
                    }).then((resApp) => {
                        axios.put(`/jobs/${jobId}/applications`, { applicationId: resApp.data._id });
                        console.log(resApp.data)
                    }
                    )
                    console.log('and now here');
                })
                .catch(err => console.log(err))

            /*  */
        }
        else {
            navigate(`../ApplyJob/${jobId}`)
        }
    }
    return (
        <div className="CandpreviewJobCom">
            <div className="CandpreviewJobCompWrapper">
                <form onSubmit={handleApplyNow}>
                    <div className="CandtopBarDesc">
                        {jobs._id === "n/a" ? <LinearProgress /> :
                            <div className="CJPJobTitleLocationInfo">
                                <div className="DescHeading"> {jobs.jobTitle}</div>
                                <div className="infoCol">
                                    <div className="attItem"><Work /> {jobs.type}</div>
                                    <div className="attItem"><PinDrop /> {jobs.location} ({jobs.workplace})</div>
                                </div>
                            </div>}
                        <div className="buttonContainer">
                            <button className="preview" type='submit' onClick={handleApplyNow} >Apply Now</button>
                        </div>
                    </div>
                    <div className={(localStorage.getItem("userType") == 3) ? "CPJBottomContainer" : "CPJBottomContainerAlt"}>
                        <div className="CPJLeftContainer">
                            <div className="CJPSubheading">About {company.name}</div>
                            <div className="CPJSection">
                                {company._id === "n/a" ? <CircularProgress /> :
                                    <div className="companyLogoDesc">
                                        <img src={company.logoUrl} alt="Company logo here" className="CJPcompanyLogo" />
                                        <div className="CJPmainText">{company.description}</div>
                                    </div>
                                }
                            </div>
                            <div className="CJPSubheading">Job Details</div>
                            <div className="CPJSection">
                                {jobs._id === "n/a" ? <CircularProgress /> : <div className="CJPmainText" dangerouslySetInnerHTML={{ __html: jobs.description }}></div>}
                            </div>
                            <div className="CJPSubheading">Requirements</div>
                            <div className="CPJSection">
                                {jobs._id === "n/a" ? <CircularProgress /> : <div className="CJPmainText" dangerouslySetInnerHTML={{ __html: jobs.requiremets }}></div>}
                            </div>

                            <div className="CJPSubheading">Skills</div>
                            <div className="CPJSection">
                                {jobs._id === "n/a" ? <CircularProgress /> : <div className="CJPmainTextSkills">{
                                    jobs.skills.map((s) => <div className="CJPskillChip">{s}</div>)
                                }</div>}
                            </div>
                        </div>
                        <div className="CPJRightContainer">
                            <div className="CJPSubheading">Hiring Contact</div>
                            <div className="CPJSection">
                                <div className="CPJHiringContactContainer">
                                    <div className="CJPHRimgAndLinkedIn">
                                        <img src={hrm.pfpURL} alt="" className="CJPHCimg" />
                                    </div>
                                    <div className="CJPHRTextCol">
                                        <div className="nameAndLogosRow">
                                            <div className="CJPHRMname">{hrm.firstName} {hrm.lastName}</div>
                                            <div className="mailAndLi">
                                                <a className="linkedinLogo" href={hrm.LinkedInProfile} ><LinkedIn /></a>
                                                <a className="linkedinLogo" href={`mailto:${hrm.email}`} ><Email /></a>
                                            </div>
                                        </div>
                                        <div className="CJPHRbio">{hrm.bio}</div>
                                    </div>
                                </div>
                            </div>
                            {
                                localStorage.getItem("userType") == 3 ? < div className="CPJQuestionFields">
                                    <div className="applyTextFieldsBigCol">
                                        <textarea name="message1" onChange={onChange} type="text" className="ApplyTextFieldBig" placeholder="What made you apply for the job?" />
                                        <textarea name="message2" onChange={onChange} type="text" className="ApplyTextFieldBig" placeholder="Why do you think you will be the perfect fit?" />
                                    </div>
                                </div> : null
                            }
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}
export default PreviewJobDescCand