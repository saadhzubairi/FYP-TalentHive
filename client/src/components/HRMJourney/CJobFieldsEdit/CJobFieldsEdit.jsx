import { Link, useNavigate, useParams } from "react-router-dom";
import "./cJobFieldsEdit.css"
import { useEffect, useState } from "react"
import axios from "axios";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
function CJobFieldsEdit(props) {
    const userId = localStorage.getItem("userId")
    const companyId = localStorage.getItem("companyId")
    const { jobId } = useParams()
    const [tags, setTags] = useState([]);
    const [pos, setPos] = useState(1);
    const [job, setJob] = useState({ _id: "n/a" })
    const [descValue, setDescValue] = useState('');
    const [reqValue, setReqValue] = useState('');
    const editorStyles = {
        borderRadius: '0.5em',
        border: 'none',
        fontSize: '2em',
        color: '#000',
        backgroundColor: "#f1f1f1",
        height: "32vh"
    };

    const navigate = useNavigate()

    const IncPos = () => {
        setPos(pos + 1);
    }

    const decPos = () => {
        setPos(pos - 1);
    }

    function handleKeyDown(e) {
        if (e.key === 'Backspace' && e.target.value === "") rmeoveTag(tags.length - 1)
        if (e.key === 'Enter') {
            const value = e.target.value;
            if (value.trim() === "") return;
            setTags([...tags, value])
            e.target.value = ''
        }
    }
    function rmeoveTag(index) {
        setTags(tags.filter((el, i) => i !== index))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const job = {
            jobTitle: event.target.elements.jobTitle.value,
            workplace: event.target.elements.workplace.value,
            location: event.target.elements.location.value,
            type: event.target.elements.jobType.value,
            skills: tags,
            description: descValue,
            requiremets: reqValue,
            spots: pos,
            companyId: companyId,
            HRCreatorId: userId,
        };

        try {
            const response = await axios.put(
                `/jobs/${jobId}`,
                job
            )
            navigate(`/HRView/createJob/preview/${response.data._id}`);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const getJob = async () => {
            await axios
                .get(`/jobs/${jobId}`)
                .then((res) => {
                    setJob(res.data)
                    setTags(res.data.skills)
                    setDescValue(res.data.description)
                    setReqValue(res.data.requiremets)
                })
                .catch((err) => console.log(err))
        }
        if (job._id == "n/a") {
            getJob();
        }
    })

    return (
        <div className="cJobFields">
            <div className="cJobFieldsWrapper">
                {
                    job._id === "n/a" ? <div className="Heading">Loading...</div>
                        :
                        <form onSubmit={handleSubmit}>
                            <div className="topBar">
                                <div className="Heading">Edit Job</div>
                                <div className="buttonContainer">
                                    <Link to={"/createJob"}>
                                        <button className="discard" type="">Discard</button>
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
                                        <input type="text" name="jobTitle" className="TextFieldSmall" placeholder="Job Title (e.g: Software Engineer)" required defaultValue={job.jobTitle} />
                                        <select name="workplace" id="" className="ComboBox" placeholder="Workplace type (eg. Remote)" required defaultValue={job.workplace}>
                                            <option value="Remote">Remote</option>
                                            <option value="Hybrid">Hybrid</option>
                                            <option value="on-Site">on-Site</option>
                                        </select>
                                        <input type="text" name="location" className="TextFieldSmall" placeholder="Location (e.g: Chicago,IL) " required defaultValue={job.location} />
                                        <select name="jobType" id="" className="ComboBox" placeholder="Job Type (e.g Contract)" required defaultValue={job.type}>
                                            <option value="Internship">Internship</option>
                                            <option value="Apprenticeship">Apprenticeship</option>
                                            <option value="Contract">Contract</option>
                                            <option value="Part Time">Part Time</option>
                                            <option value="Full Time">Full Time</option>
                                        </select>
                                        <div className="skillsSectionCJF">
                                            <div className="subHeading">Skills</div>
                                            <div className="tagsInputContainerEdit">
                                                {tags.map((tag, index) => (
                                                    <div className="tagItem" key={index}>
                                                        <div className="tagText">{tag}</div>
                                                        <div onClick={() => rmeoveTag(index)} className="tagRemove">&times;</div>
                                                    </div>
                                                ))}
                                                <input onKeyDown={handleKeyDown} type="text" className="TagInputEdit" placeholder="e.g: Python3, React.js" onKeyPress={e => {
                                                    if (e.key === 'Enter') e.preventDefault();
                                                }} />
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
                                    <ReactQuill name="description" className="TextField" placeholder="Job Description" style={editorStyles} value={descValue} onChange={setDescValue} required />
                                    <ReactQuill name="requirements" className="TextField" placeholder="Requirements" style={editorStyles} value={reqValue} onChange={setReqValue} required />
                                </div>
                            </div>
                        </form>
                }
            </div>
        </div>
    )
}
export default CJobFieldsEdit