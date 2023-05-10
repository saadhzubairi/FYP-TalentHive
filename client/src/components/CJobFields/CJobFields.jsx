import { Link, useNavigate } from "react-router-dom";
import "./cJobFields.css"
import { useState } from "react"
import axios from "axios";
function CJobFields(props) {
    const [tags, setTags] = useState([]);
    const [pos, setPos] = useState(1);
    const navigate = useNavigate()


    const IncPos = () => {
        setPos(pos + 1);
    }
    const decPos = () => {
        setPos(pos - 1);
    }

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

        const job = {
            jobTitle: event.target.elements.jobTitle.value,
            workplace: parseInt(event.target.elements.workplace.value),
            location: event.target.elements.location.value,
            type: parseInt(event.target.elements.jobType.value),
            skills: tags,
            description: event.target.elements.description.value,
            requiremets: event.target.elements.requirements.value,
            spots: pos,
            companyId: "34567",
            HRCreatorId: "644f10bbbbd3951b057a3c6f",
        };

        try {
            const response = await axios.post(
                "/jobs",
                job
            )
            console.log(response.data);
            navigate(`/createJob/preview/${response.data._id}`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="cJobFields">
            <div className="cJobFieldsWrapper">

                <form onSubmit={handleSubmit}>
                    <div className="topBar">
                        <div className="Heading">Create Job</div>
                        <div className="buttonContainer">
                            <Link to={"/createJob"}>
                                <button className="discard">Discard</button>
                            </Link>
                            {/* <Link to={"/createJob/preview"}> */}
                            <button className="preview" type="submit">Preview</button>
                            {/* </Link> */}
                        </div>
                    </div>
                    <div className="FormsContainer">
                        <div className="basicInfo">
                            <div className="basicInfoWrapper">
                                <div className="subHeading">Basic Info</div>
                                <input type="text" name="jobTitle" className="TextFieldSmall" placeholder="Job Title (e.g: Software Engineer)" required/>
                                <select name="workplace" id="" className="ComboBox" placeholder="Workplace type (eg. Remote)" required>
                                    <option value="1">Remote</option>
                                    <option value="2">Hybrid</option>
                                    <option value="3">on-Site</option>
                                </select>
                                <input type="text" name="location" className="TextFieldSmall" placeholder="Location (e.g: Chicago,IL) " required/>
                                <select name="jobType" id="" className="ComboBox" placeholder="Job Type (e.g Contract)" required>
                                    <option value="1">Internship</option>
                                    <option value="2">Apprenticeship</option>
                                    <option value="3">Contract</option>
                                    <option value="4">Part Time</option>
                                    <option value="5">Full Time</option>
                                </select>
                                <div className="skillsSectionCJF">
                                    <div className="subHeading">Skills</div>
                                    <div className="tagsInputContainer">
                                        {tags.map((tag, index) => (
                                            <div className="tagItem" key={index}>
                                                <div className="tagText">{tag}</div>
                                                <div onClick={() => rmeoveTag(index)} className="tagRemove">&times;</div>
                                            </div>
                                        ))}
                                        <input onKeyDown={handleKeyDown} type="text" className="TagInput" placeholder="e.g: Python3, React.js" />
                                    </div>
                                </div>
                                <div className="posReqd">
                                    <div className="subHeading">Positions Required</div>
                                    <div className="incBar">
                                        <div className="incBarButton" onClick={decPos}>-</div>
                                        <div className="posCount">{pos}</div>
                                        <div className="incBarButton" onClick={IncPos}>+</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="DescriptiveInfo">
                            <div className="subHeading">Descriptive Info</div>
                            <textarea name="description" type="text" className="TextFieldBig" placeholder="Job Description" required />
                            <textarea name="requirements" type="text" className="TextFieldBig" placeholder="Requirements"  required/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default CJobFields