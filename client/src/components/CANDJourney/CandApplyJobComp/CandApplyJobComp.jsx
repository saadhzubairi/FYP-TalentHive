import axios from "axios";
import EducationForm from "./EducationForm";
import "./candApplyJobComp.css"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";

import { Link, useNavigate } from "react-router-dom";

function CandApplyJobComp(props) {
    const [tags, setTags] = useState([]);
    const { jobId } = useParams();
    const [jobs, setJobs] = useState([])
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate()

    function handleKeyDown(e) {
        if (e.key === 'Backspace' && e.target.value === "") rmeoveTag(tags.length - 1)
        if (e.key !== 'Enter') return;
        const value = e.target.value;
        if (value.trim() === "") return;
        setTags([...tags, value])
        e.target.value = ''
    }

    function rmeoveTag(index) {
        setTags(tags.filter((el, i) => i !== index))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const candidate = {
            name: event.target.elements.name.value,
            email: event.target.elements.email.value,
            linkedin: event.target.elements.linkedin.value,
            phone_number: event.target.elements.phone_number.value,
            city: event.target.elements.city.value,
            skills: tags,
        };

        try {
            const response = await axios.post(
                `/api/candidate/`,
                candidate
            ).then((res) => axios.post(
                `/api/jobApplication/`,
                {
                    candidateId: res.data._id,
                    jobId: jobId,
                    message: "THE NEED FOR SPEED",
                    rating: 5,
                    status: 1
                }
            ))
            console.log(response.data);
            navigate(`/`);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchJobs = async () => {
            await axios.get(`/jobs/${jobId}`).then(res => setJobs(res.data)).catch(err => console.log(err));
        }
        fetchJobs();
    }, [])

    return (
        <div className="ApplyJobFeed">
            <div className="Applywrapper">
                <form onSubmit={handleSubmit}>
                    <div className="ApplytopBar">
                        <div className="ApplyHeading">{jobs.jobTitle}</div>
                        <div className="buttonContainer">
                            <button className="preview" type="submit">Submit</button>
                        </div>
                    </div>
                    <div className="ApplyFormsContainer">
                        <div className="ApplybasicInfo">
                            <div className="ApplyResume">
                                <div className="upload-cv-box">
                                    <h3>Upload Your CV</h3>
                                    <label htmlFor="cv-upload" className="cv-upload-label">Choose File</label>
                                    <input type="file" id="cv-upload" className="cv-upload-input" />
                                    <button className="cv-upload-btn" >Upload</button>
                                </div>
                            </div>

                            <div className="subHeading">Basic Info</div>
                            <div className="ApplynameFields">
                                <input type="text" id='ApplynameF' className="ApplyTextFieldSmall" placeholder='First Name' />
                                <input type="text" id='ApplynameL' className="ApplyTextFieldSmall" placeholder='Last Name' />
                            </div>
                            <div className="ApplynameFields">
                                <input type="text" id='ApplynameF' className="ApplyTextFieldSmall" placeholder="Email" />
                                <input type="text" id='ApplynameF' className="ApplyTextFieldSmall" placeholder="LinkedIn URL" />
                            </div>

                            <div className="ApplynameFields">
                                <input type="text" id='ApplynameF' className="ApplyTextFieldSmall" placeholder="City" />
                                <input type="text" id='ApplynameF' className="ApplyTextFieldSmall" placeholder="Country" />
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
                            <textarea type="text" className="ApplyTextFieldBig" placeholder="What made you apply for the job?" />
                            <textarea type="text" className="ApplyTextFieldBig" placeholder="Why do you think you will be the perfect fit?" />
                            <div className="AddEducation">Add Education</div>
                            <EducationForm />
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}
export default CandApplyJobComp