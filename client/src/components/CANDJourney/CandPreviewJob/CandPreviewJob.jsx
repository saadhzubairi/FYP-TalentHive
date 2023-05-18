import { BrandingWatermarkRounded, Build, Dataset, ExpandCircleDownOutlined, FormatTextdirectionRToLSharp, LocationCity, LocationCityOutlined, PinDrop, PlayArrowOutlined, SixKPlusOutlined, Work, WorkOff, Workspaces } from '@mui/icons-material'
import './CandpreviewJob.css'
import StoreIcon from '@mui/icons-material/Store';
import DescriptionIcon from '@mui/icons-material/Description';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";

function PreviewJobDescCand({ }) {
    const { jobId } = useParams();

    const [jobs, setJobs] = useState({})
    const [company, setCompany] = useState({})

    useEffect(() => {
        const fetchJobs = async () => {
            await axios.get(`/jobs/${jobId}`).then(async (res) => {
                setJobs(res.data)
                await axios.get(`/company?id=${res.data.companyId}`)
                    .then(resc => setCompany(resc.data))
                    .catch(err => console.log(err))
            }).catch(err => console.log(err));
        }
        fetchJobs();
    }, [])

    return (
        <div className="CandpreviewJobCom">
            <div className="CandpreviewJobCompWrapper">
                <div className="CandtopBarDesc">
                    <div className="DescHeading"> {jobs.jobTitle}</div>
                    <div className="buttonContainer">
                        <Link to={`/CANDView/ApplyJob/${jobs._id}`} >
                            <button className="preview" >Apply Now</button>
                        </Link>
                    </div>
                </div>
                <div className="DescbottomArea">

                    <div className="Descpanes">
                        <div className="DescleftSide">
                            <div className="firstSection">
                                <div className="listItem"><PinDrop /> {jobs.location}</div>
                                <div className="listItem"><Work /> {jobs.type}</div>
                                <div className="listItem"><LocationCity /> Manhattan Software, LLC.</div>
                            </div>
                            <div className="JobDescCont">

                                <div className="Title"><StoreIcon /> Company Overview</div>
                                <div className="subText">
                                    {company.description}
                                </div>
                            </div>
                            <div className="JobDescCont">

                                <div className="Title"><DescriptionIcon /> Job Description</div>
                                <div className="subText">
                                    <div dangerouslySetInnerHTML={{ __html: jobs.description }}></div>
                                </div>



                                <div className="Title"><ChecklistIcon /> Requirements</div>
                                <div className="subText">
                                    <div dangerouslySetInnerHTML={{ __html: jobs.requiremets }}></div>
                                </div>

                            </div>
                            <div className="skillsSection">
                                <div className="skillText"><Dataset /> Skills</div>
                                <div className="skillItems">
                                    {jobs.skills}

                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PreviewJobDescCand