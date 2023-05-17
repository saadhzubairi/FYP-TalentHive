import axios from "axios";
import EducationForm from "./EducationForm";
import "./ApplyJobFeed.css"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import WorkExperienceForm from "./WorkExperienceForm";
import { Link, useNavigate } from "react-router-dom";

function ApplyJobFeed(props) {


    const [tags, setTags] = useState([]);
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [educationList, setEducationList] = useState([]);
    const [workExperienceList, setWorkExperienceList] = useState([]);
    
    function handleKeyDown(e) {
        if (e.key === "Backspace" && e.target.value === "") rmeoveTag(tags.length - 1);
        if (e.key !== "Enter") return;
        const value = e.target.value;
        if (value.trim() === "") return;
        setTags([...tags, value]);
        e.target.value = "";
    }

    function rmeoveTag(index) {
        setTags(tags.filter((el, i) => i !== index));
    }

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const candidate = {
            name: event.target.elements.name.value,
            email: event.target.elements.email.value,
            linkedin: event.target.elements.linkedin.value,
            phone_number: event.target.elements.phone_number.value,
            city: event.target.elements.city.value,
            skills: tags,
            education: educationList,
            work_experience: workExperienceList, // Include education data in the request
        };

        try {
            const response = await axios.put(`/candidate/646154e6e36ab2b8ead56230`, candidate).then((res) =>
                axios.post(`/jobApplications/`, {
                    candidateId: res.data._id,
                    jobId: jobId,
                    message: "I love saad b zubairi",
                    rating: 5,
                    status: 1,
                })
            );

            console.log(response.data);
            navigate(`/`);
        } catch (error) {
            console.error(error);
        }
    };

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            await axios
                .get(`/jobs/${jobId}`)
                .then((res) => setJobs(res.data))
                .catch((err) => console.log(err));
        };
        fetchJobs();
    }, []);







    return (
        <div className="ApplyJobFeed">
            <div className="Applywrapper">
                <form onSubmit={handleSubmit} required>
                    <div className="ApplytopBar">
                        <div className="ApplyHeading" required>{jobs.jobTitle}</div>

                        <div className="buttonContainer">
                            <button className="preview" type="submit">Submit</button>
                        </div>
                    </div>
                    <div className="ApplyFormsContainer">
                        {message && <div>{message}</div>}
                        <div className="ApplybasicInfo">
                            <div className="ApplyResume">
                                <div className="upload-cv-box">
                                    <h3>Upload Your CV</h3>

                                    <label htmlFor="cv-upload" className="cv-upload-label">Choose File</label>
                                    <input type="file" id="cv-upload" className="cv-upload-input" />
                                    <button className="cv-upload-btn" required>Upload</button>
                                </div>
                            </div>

                            <div className="subHeading">Basic Info</div>
                            <div className="ApplynameFields">
                                <input type="text" id='ApplynameF' name="name" className="ApplyTextFieldSmall" placeholder='First Name' />
                                <input type="text" id='ApplynameL' name="" className="ApplyTextFieldSmall" placeholder='Last Name' />
                            </div>
                            <div className="ApplynameFields">
                                <input type="text" id='ApplynameF' name="email" className="ApplyTextFieldSmall" placeholder="Email" required />
                                <input type="text" id='ApplynameF' name="linkedin" className="ApplyTextFieldSmall" placeholder="LinkedIn URL" required />

                            </div>

                            <div className="ApplynameFields">
                                <input type="text" id='ApplynameF' name="city" className="ApplyTextFieldSmall" placeholder="City" required />
                                <input type="text" id='ApplynameF' name="phone_number" className="ApplyTextFieldSmall" placeholder="Country" required />
                            </div>

                            <div className="subHeading">Skills</div>
                            <div className="ApplytagsInputContainer">
                                {tags.map((tag, index) => (
                                    <div className="ApplytagItem" key={index}>
                                        <div className="ApplytagText">{tag}</div>
                                        <div onClick={() => rmeoveTag(index)} className="ApplytagRemove">&times;</div>
                                    </div>
                                ))}
                                <input onKeyDown={handleKeyDown} type="text" className="ApplyTagInput" placeholder="e.g: Python3, React.js" />
                            </div>
                        </div>
                        <div className="ApplyDescriptiveInfo">
                            <div className="subHeading">Descriptive Info</div>
                            <textarea type="text" className="ApplyTextFieldBig" placeholder="What made you apply for the job?" required />
                            <textarea type="text" className="ApplyTextFieldBig" placeholder="Why do you think you will be the perfect fit?" required />
                            <div className="AddEducation">Add Education</div>
                            <EducationForm
                                educationList={educationList}
                                setEducationList={setEducationList}
                            />                       </div>

                            <div className="AddExperience">
                            <WorkExperienceForm
                            workExperienceList={workExperienceList} setWorkExperienceList={setWorkExperienceList}/>

                            </div>
                    </div>
                </form>
            </div>
        </div >
    )
}
export default ApplyJobFeed