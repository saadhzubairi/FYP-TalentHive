import WorkIcon from '@mui/icons-material/Work';
import ModeOfWok from '@mui/icons-material/ModeOfTravel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import "./ApplyJobCard.css"
import Upperbar from '../Upperbar/Upperbar';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import EducationForm from './EducationForm';
import { useState } from "react";
function ApplyJobCard(props) {

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


        <div className="ApplyNowFeed">


            <div className="jobCardContaineraap">


                <div className="Optionsapp">
                <div className="UppBar"> 
                    <Upperbar />
                </div>
              <div className="Application">
                
                    <div className="form">
                        <div className="formbasic">
                            <div className="upload-cv-box">
                                <h3>Upload Your CV</h3>
                                <p>Select a file to upload:</p>
                                <label htmlFor="cv-upload" className="cv-upload-label">Choose File</label>
                                <input type="file" id="cv-upload" className="cv-upload-input" />
                                <button className="cv-upload-btn" >Upload</button>
                            </div>
                            <div className="subHeading">
                                Basic Info
                            </div>

                            <div className="BasicInfo">




                                <div class="form_name">

                                    <input type="input" class="TextFieldSmall" placeholder="Name" required />



                                </div>
                                <div class="form_email">
                                    <input type="input" class="TextFieldSmall" placeholder="Email Address" required />


                                </div>

                                <div class="form_phone">
                                    <input type="input" class="TextFieldSmall" placeholder="Phone #" required />


                                </div>

                                <div class="form_address">
                                    <textarea type="text" class="TextFieldSmall" placeholder="Home Address" required />


                                </div>




                            </div>

                        </div>
                        <div className="form2">

                            <div className="formextra">

                                <div className="subHeading">
                                    Descriptive Info
                                </div>
                                <div class="form_why">
                                    <textarea type="text" class="TextFieldBig" placeholder="Why do you want to join?" required />


                                </div>

                            </div>


                        </div>

                        <div className="subHeading"> Add Education </div>
                       <EducationForm/>
                        
                    </div>

                    <div className="submit">
                     
                      <button className='Submit' onClick={handleSubmit}> Submit</button>
                      {showPopup && (
        <div className="Popup">
          <p>Application submitted successfully!</p>
          <button onClick={handleConfirm}>OK</button>
        </div>
      )}
                    </div>

              </div>


                </div>
            </div>
        </div>


    )
}
export default ApplyJobCard