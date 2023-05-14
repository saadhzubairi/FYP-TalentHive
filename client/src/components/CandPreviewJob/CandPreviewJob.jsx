import { BrandingWatermarkRounded, Build, Dataset, ExpandCircleDownOutlined, FormatTextdirectionRToLSharp, LocationCity, LocationCityOutlined, PinDrop, PlayArrowOutlined, SixKPlusOutlined, Work, WorkOff, Workspaces } from '@mui/icons-material'
import './CandpreviewJob.css'
import StoreIcon from '@mui/icons-material/Store';
import DescriptionIcon from '@mui/icons-material/Description';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";

function PreviewJobDescCand({ }) {
    const { jobId } = useParams();

    const [jobs, setJobs] = useState([])

    useEffect(() => {
        const fetchJobs = async () => {
            await axios.get(`/jobs/${jobId}`).then(res => setJobs(res.data)).catch(err => console.log(err));
        }
        fetchJobs();
    }, [])

    const history = useNavigate(); // Get access to the history object

    const handleButtonClick = () => {
        history(`/ApplyJob/${jobs._id}`);
        // Navigate to the "jobdesc" route
    };
    return (
        <div className="CandpreviewJobCom">
            <div className="CandpreviewJobCompWrapper">
                <div className="CandtopBarDesc">
                    <div className="DescHeading"> {jobs.jobTitle}</div>
                    <div className="buttonContainer">
                        <button className="preview" onClick={handleButtonClick}>Apply Now</button>
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
                                    Executes software development projects and change management with high quality design and architecture with a focus on performance, scalability, security and stability. Ability to independently handle complex software development tasks all the way to release management processes for their respective applications. Engages with other application team, business analyst and stakeholders at different stages of the project to ensure to complete on time with quality. Expected to adhere to best practices on software development and change management.
                                    <br />The focus is process automation and digitization to provide positive customer journey and employee efficiency.
                                    <br />Design systems or applications based on business and client requirements
                                    <br />Develop programs based on design and requirements specifications
                                    <br />Handles Change management environment
                                    <br />Create test specifications and execute testing
                                    <br />Conduct review of technical work outputs
                                    <br />Fix bugs; Work on enhancements; Handle change requests
                                </div>




                            </div>

                            <div className="JobDescCont">

                                <div className="Title"><DescriptionIcon /> Job Description</div>
                                <div className="subText">
                                    {jobs.requiremets}
                                </div>



                                <div className="Title"><ChecklistIcon /> Requirements</div>
                                <div className="subText">
                                    {jobs.description}
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