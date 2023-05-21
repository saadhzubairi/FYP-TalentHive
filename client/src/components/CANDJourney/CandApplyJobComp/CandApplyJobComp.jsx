import "./candApplyJobComp.css"
import axios from "axios";
import EducationForm from "./EducationForm";
import WorkExperienceForm from "./WorkExperienceForm";
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";

import { Link, useNavigate } from "react-router-dom";

function CandApplyJobComp(props) {

    const { jobId } = useParams();

    const [fileName, setFileName] = useState('');
    const [tags, setTags] = useState([]);
    const [educationList, setEducationList] = useState([]);
    const [workExperienceList, setWorkExperienceList] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [message, setMessage] = useState();
    const navigate = useNavigate();

    function handleKeyDown(e) {
        if (e.key === "Backspace" && e.target.value === "") rmeoveTag(tags.length - 1);
        if (e.key !== "Enter") return;
        e.preventDefault();
        const value = e.target.value;
        if (value.trim() === "") return;
        setTags([...tags, value]);
        e.target.value = "";
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileName(file.name);
    };

    function rmeoveTag(index) {
        setTags(tags.filter((el, i) => i !== index));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const name = {
            fname: event.target.elements.fname.value,
            lname: event.target.elements.lname.value
        }

        const candidate = {
            name: name,
            email: event.target.elements.email.value,
            password: event.target.elements.password.value,
            linkedin: event.target.elements.linkedin.value,
            phone_number: event.target.elements.phone_number.value,
            skills: tags,
            education: educationList,
            work_experience: workExperienceList, // Include education data in the request
        };

        try {
            await axios.post(`/candidate`, candidate)
                .then(async (resCan) => {
                    localStorage.clear();
                    localStorage.setItem(`userId`, resCan.data._id)
                    localStorage.setItem(`userType`, resCan.data.userType)
                    if (jobId === "0") {
                        await axios.post(`/jobApplications`, {
                            candidateId: resCan.data._id,
                            jobId: jobId,
                            message1: event.target.elements.message1.value,
                            message2: event.target.elements.message2.value,
                            rating: 5,
                            status: 1
                        }).then((resApp) =>
                            axios.put(`/jobs/${jobId}/applications`, { applicationId: resApp.data._id })
                        )
                    }
                })
                .catch((err) => console.log(err))
            console.log(candidate);
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        const fetchJobs = async () => {
            await axios
                .get(`/jobs/${jobId}`)
                .then((res) => setJobs(res.data))
                .catch((err) => console.log(err));
        };
        if (jobId !== "0") {
            fetchJobs();
        }
    }, []);

    return (
        <div className="ApplyJobFeed">
            <div className="Applywrapper">
                <form onSubmit={handleSubmit} required>
                    <div className="ApplytopBar">
                        <div className="ApplyHeading" required>{jobId === "0" ? "New User" : jobs.jobTitle}</div>
                        <div className="buttonContainer">
                            <button className="preview" type="submit">{jobId === "0" ? "Create Account" : "Submit"}</button>
                        </div>
                    </div>
                    <div className="ApplyFormsViewPort">
                        <div className="ApplyFormsContainer">
                            {message && <div>{message}</div>}
                            <div className="ApplyJobSection">
                                <div className="upload-cv-box">
                                    <h3>Upload Your CV</h3>
                                    <label htmlFor="cv-upload" className="cv-upload-label">Choose File</label>
                                    <input type="file" id="cv-upload" className="cv-upload-input" onChange={handleFileChange} />
                                    <button className="cv-upload-btn" required>
                                        Upload
                                    </button>
                                    {fileName && <p>Selected file: {fileName}</p>}
                                </div>
                            </div>
                            <div className="ApplyJobSection">
                                <div className="subHeading">Basic Info</div>
                                <div className="ApplynameFieldsGrid">
                                    <div className="ApplynameFields">
                                        <input type="text" name="fname" className="ApplyTextFieldSmall" placeholder='First Name' />
                                        <input type="text" name="lname" className="ApplyTextFieldSmall" placeholder='Last Name' />
                                    </div>
                                    <div className="ApplynameFields">
                                        <input type="text" name="email" className="ApplyTextFieldSmall" placeholder="Email" required />
                                        <input type="text" name="linkedin" className="ApplyTextFieldSmall" placeholder="LinkedIn URL" required />
                                    </div>
                                    <div className="ApplynameFields">
                                        <input type="text" name="phone_number" className="ApplyTextFieldSmall" placeholder="Phone Number" required />
                                        <input type="password" name="password" className="ApplyTextFieldSmall" placeholder="Password" required />
                                    </div>
                                </div>
                            </div>
                            <div className="ApplyJobSection">
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

                            {jobId === "0" ? null :
                                <div className="ApplyJobSection">
                                    <div className="subHeading">Descriptive Info</div>
                                    <div className="applyTextFieldsBigCol">
                                        <textarea name="message1" type="text" className="ApplyTextFieldBig" placeholder="What made you apply for the job?" required />
                                        <textarea name="message2" type="text" className="ApplyTextFieldBig" placeholder="Why do you think you will be the perfect fit?" required />
                                    </div>
                                </div>}
                            <div className="ApplyJobSection">
                                <div className="subHeading">Add Education</div>
                                <EducationForm educationList={educationList} setEducationList={setEducationList} />
                            </div>
                            <div className="ApplyJobSection">
                                <div className="subHeading">Add Work Experience</div>
                                <WorkExperienceForm workExperienceList={workExperienceList} setWorkExperienceList={setWorkExperienceList} />
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}
export default CandApplyJobComp