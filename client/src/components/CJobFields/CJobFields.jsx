import EducationForm from "./EducationForm";
import "./cJobFields.css"
import { useState } from "react"
function CJobFields(props) {
    const [tags, setTags] = useState([]);

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

    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = () => {
      // logic for submitting the form
  
      // show the confirmation popup
      setShowPopup(true);
    };
  
    const handleConfirm = () => {
      // logic for confirming the application submission
  
      // hide the confirmation popup
      setShowPopup(false);
    };

    return (
        <div className="cJobFields">
            <div className="wrapper">
                <div className="topBar">
                    <div className="Heading">Java Developer</div>
                    <div className="buttonContainer">
                        <button className="preview">Submit</button>
                    </div>
                </div>
                <div className="FormsContainer">
                    <div className="basicInfo">
                    <div className="Resume"> 
                        <div className="upload-cv-box">
                                <h3>Upload Your CV</h3>
                               
                                <label htmlFor="cv-upload" className="cv-upload-label">Choose File</label>
                                <input type="file" id="cv-upload" className="cv-upload-input" />
                                <button className="cv-upload-btn" >Upload</button>
                            </div>
                        </div>

                        <div className="subHeading">Basic Info</div>
                        <div className="nameFields">
                                <input type="text" id='nameF' className="TextFieldSmall" placeholder='First Name' />
                                <input type="text" id='nameF' className="TextFieldSmall" placeholder='Last Name' />
                            </div>
                            <div className="nameFields">
                            <input type="text" id='nameF' className="TextFieldSmall" placeholder="Email" />
                        <input type="text"  id='nameF' className="TextFieldSmall" placeholder="LinkedIn URL" />
                            </div>
                            
                            <div className="nameFields">
                            <input type="text"  id='nameF' className="TextFieldSmall" placeholder="City" />
                        <input type="text"  id='nameF' className="TextFieldSmall" placeholder="Country" />
                            </div>
                        
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
                    <div className="DescriptiveInfo">
                        <div className="subHeading">Descriptive Info</div>
                        <textarea type="text" className="TextFieldBig" placeholder="What made you apply for the job?" />
                        <textarea type="text" className="TextFieldBig" placeholder="Why do you think you will be the perfect fit?" />
                       
                        
                       
                        <div className="AddEducation">Add Education</div>
                         <EducationForm/>
                    
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CJobFields