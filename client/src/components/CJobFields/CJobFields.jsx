import { Link } from "react-router-dom";
import "./cJobFields.css"
import { useState } from "react"
function CJobFields(props) {
    const [tags, setTags] = useState([]);
    const [pos, setPos] = useState(0);

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

    return (
        <div className="cJobFields">
            <div className="cJobFieldsWrapper">
                <div className="topBar">
                    <div className="Heading">Create Job</div>
                    <div className="buttonContainer">
                        <Link to={"/createJob"}>
                            <button className="discard">Discard</button>
                        </Link>
                        <Link to={"/createJob/preview"}>
                            <button className="preview">Preview</button>
                        </Link>
                    </div>
                </div>
                <div className="FormsContainer">
                    <div className="basicInfo">
                        <div className="basicInfoWrapper">
                            <div className="subHeading">Basic Info</div>
                            <input type="text" className="TextFieldSmall" placeholder="Job Title (e.g: Software Engineer)" />
                            <select name="Workplace" id="" className="ComboBox">
                                <option value="">Select workplace type</option>
                                <option value="remote">Remote</option>
                                <option value="hybrid">Hybrid</option>
                                <option value="on-Site">on-Site</option>
                            </select>
                            <input type="text" className="TextFieldSmall" placeholder="Location (e.g: Chicago,IL) " />
                            <select name="Job Type" id="" className="ComboBox">
                                <option value="">Select Job Type</option>
                                <option value="internship">Internship</option>
                                <option value="apprenticeship">Apprenticeship</option>
                                <option value="contract">Contract</option>
                                <option value="partTime">Part Time</option>
                                <option value="fullTime">Full Time</option>
                            </select>
                            <div className="skillsSectionCJF">
                                <div className="subHeading">Skills</div>
                                <div className="tagsInputContainer">
                                    {
                                        tags.map((tag, index) => (
                                            <div className="tagItem" key={index}>
                                                <div className="tagText">{tag}</div>
                                                <div onClick={() => rmeoveTag(index)} className="tagRemove">&times;</div>
                                            </div>
                                        ))
                                    }
                                    <input onKeyDown={handleKeyDown} type="text" className="TagInput" placeholder="e.g: Python3, React.js" />
                                </div>
                            </div>
                            <div className="posReqd">
                                <div className="subHeading">Positions Required</div>
                                <div className="incBar">
                                    <div className="incBarButton" onClick={IncPos}>+</div>
                                    <div className="posCount">{pos}</div>
                                    <div className="incBarButton" onClick={decPos}>-</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="DescriptiveInfo">
                        <div className="subHeading">Descriptive Info</div>
                        <textarea type="text" className="TextFieldBig" placeholder="Job Description" />
                        <textarea type="text" className="TextFieldBig" placeholder="Requirements" />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CJobFields