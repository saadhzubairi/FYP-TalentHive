import { AssignmentRounded, Delete, Edit, Email, EmailOutlined, PinDrop, Work } from "@mui/icons-material"
import "./viewJobComponent.css"
import PreviewJobComp from "../PreviewJob/PreviewJob"
import BasicTabs from "./TabBar.tsx"
import axios from "axios"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react"

function ViewJobComponent({ job }) {
    const { jobId } = useParams()
    const navigate = useNavigate()
    const [hrm, setHrm] = useState({ _id: "n/a" })

    useEffect(() => {
        const fetchHR = async () => {
            await axios.get(`/hrms/${job.HRCreatorId}`)
                .then(res => setHrm(res.data))
                .catch(err => console.log(err))
        }
        fetchHR();
    }, [])

    const delJob = () => {
        axios.delete(`/jobs/${job._id}`).then(() => console.log("job deleted!"))
            .then(() => {
                notifyDelete();

            })
    }

    const notifyDelete = () => {
        toast.success('User deleted', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        navigate(`/HRView`);
    }

    return (
        <>
            <div className="viewJobComponent">
                <div className="topBar">
                    <div className="headingAndAtts">
                        <div className="Heading">{job.jobTitle}</div>
                        <div className="attsColumns">
                            <div className="attItem"><PinDrop /> {job.location} (On Site)</div>
                            <div className="attItem"><Work /> Part-time</div>
                        </div>
                    </div>
                    <div className="Spots">
                        <div className="delete" onClick={delJob}><Delete /></div>
                        <Link to={`/HRView/editJob/${jobId}`}>
                            <div className="edit"><Edit /></div>
                        </Link>
                        <div className="spotsCircle">{job.spots}</div>
                        <div className="toFillS">SPOTS TO FILL</div>
                    </div>
                </div>
                <div className="bottomStuff">
                    <div className="bottomWrapper">
                        <div className="leftPane">
                            <div className="paneWrapper">
                                <div className="countsAndHRM">
                                    <div className="HrmCreator">
                                        Created by <b>{hrm.firstName} {hrm.lastName}</b>
                                        <Link to={`mailto:${hrm.email}`}><EmailOutlined /></Link>
                                    </div>
                                    <div className="applicantsCount"><b>{job.applications.length}</b> Applicants</div>

                                </div>

                                <BasicTabs />
                            </div>
                        </div>
                        <div className="rightPane">
                            <div className="linkSection">
                                <div className="linkPartContainer">
                                    <div className="linkPart">www.talenthive.com/jobs/{job._id}</div>
                                </div>
                                <div className="iconPat"><AssignmentRounded /></div>
                            </div>
                            <div className="rightpaneWrapper">
                                <PreviewJobComp onAppsPage={true} job={job} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
export default ViewJobComponent