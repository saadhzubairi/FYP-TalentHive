import { BrandingWatermarkRounded, Build, Dataset, ExpandCircleDownOutlined, FormatTextdirectionRToLSharp, LocationCity, LocationCityOutlined, PinDrop, PlayArrowOutlined, SixKPlusOutlined, Work, WorkOff, Workspaces } from '@mui/icons-material'
import './previewJob.css'
import StoreIcon from '@mui/icons-material/Store';
import DescriptionIcon from '@mui/icons-material/Description';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { useNavigate } from 'react-router-dom';
function PreviewJobComp(props) {

    const history = useNavigate(); // Get access to the history object

    const handleButtonClick = () => {
      history("/ApplyJob"); 
      // Navigate to the "jobdesc" route
    };
    return (
        <div className="previewJobCom">
            <div className="previewJobCompWrapper">
                <div className="topBar">
                    <div className="Heading"> Java Developer</div>
                    <div className="buttonContainer">
                        <button className="discard">Save</button>
                        <button className="preview" onClick={handleButtonClick}>Apply Now</button>
                    </div>
                </div>
                <div className="bottomArea">

                    <div className="panes">
                        <div className="leftSide">
                            <div className="firstSection">
                                <div className="listItem"><PinDrop /> California, LA (On Site)</div>
                                <div className="listItem"><Work /> Part-time</div>
                                <div className="listItem"><LocationCity /> Manhattan Software, LLC.</div>
                            </div>
                            <div className="JobDescCont">

                                <div className="Title"><StoreIcon/> Company Overview</div>
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

                                <div className="Title"><DescriptionIcon/> Job Description</div>
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



                                <div className="Title"><ChecklistIcon/> Requirements</div>
                                <div className="subText">
                                    Degree in Computer Science, Computer Engineering, or related field
                                    <br />Strong technical, analytical, troubleshooting, and communication skills
                                    <br />Experience in developing full-stack application
                                    <br />Experience in software development using Java technology, Python, SQL
                                    <br />Experience in HTML, DHTML and related front end technology
                                    <br />Experience in developing with APIs
                                </div>

                            </div>
                            <div className="skillsSection">
                                <div className="skillText"><Dataset /> Skills</div>
                                <div className="skillItems">
                                    <div className="skillItem">Java</div>
                                    <div className="skillItem">Python</div>
                                    <div className="skillItem">Javascript</div>
                                    <div className="skillItem">C</div>
                                    <div className="skillItem">GoLang</div>
                                    <div className="skillItem">Flutte</div>
                                    <div className="skillItem">Kotlin</div>
                                    <div className="skillItem">Dart</div>
                                    <div className="skillItem">Fortran</div>
                                    <div className="skillItem">C#</div>
                                    <div className="skillItem">C++</div>
                                    <div className="skillItem">BrainF*ck</div>
                                    <div className="skillItem">Docker</div>
                                    <div className="skillItem">Spring</div>
                                    <div className="skillItem">React</div>
                                    <div className="skillItem">Hibernate</div>
                                    <div className="skillItem">Amazon AWS</div>
                                    <div className="skillItem">Kubernetes</div>
                                    <div className="skillItem">Wireshark</div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PreviewJobComp