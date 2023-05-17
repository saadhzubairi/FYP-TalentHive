import "./Jobapplication.css"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import axios from "axios";

import { BrandingWatermarkRounded, Build, Dataset, ExpandCircleDownOutlined, FormatTextdirectionRToLSharp, LocationCity, LocationCityOutlined, PinDrop, PlayArrowOutlined, SixKPlusOutlined, Work, WorkOff, Workspaces } from '@mui/icons-material'

import StoreIcon from '@mui/icons-material/Store';
import { useNavigate } from 'react-router-dom';
function Jobapplication({}) {
    const { jobApplicationId } = useParams();
    const [jobApplication, setJobApplication] = useState(null);
    const [candidate, setCandidate] = useState(null);
  
  
    useEffect(() => {
        const fetchJobApplication = async () => {
          try {
            const response = await axios.get(`/jobApplications/${jobApplicationId}`);
            setJobApplication(response.data);
            console.log(response.data);
         
            const candidateresponse= await axios.get(`/candidate?id=${response.data.candidateId}`)
            setCandidate(candidateresponse.data)
      console.log(candidateresponse.data)
          } catch (error) {
            console.error(error);
          }
        };
      
        fetchJobApplication();
      }, [jobApplicationId]);
      
   
  

    if (candidate === null ) {
        return <div>Loading...</div>;
      }
    
      // Accessing candidate properties assuming it is not null
      const { email } = candidate;
      console.log(email);

    return (
        <div className="JobapplicationPage">

            <div className="JobApplicationsWrapper">

                <div className="TopBarThings">

                <div className="JobtopBar">
               
                <div className="ApplyHeading" required>Java</div>

                <div className="buttonContainer">
                    <button className="preview" type="submit">Back to Home</button>
                </div>
                </div>
                 <div className="belowTop">
                 <div className="firstSection">
<div className="listItem"><PinDrop /> </div>
<div className="listItem"><Work /></div>
<div className="listItem"><LocationCity /> Manhattan Software, LLC.</div>
</div>
                 </div>

              <div className="BasicAddedInfo">
              <div className="subHeading">Basic Info</div>
                                <div className="ApplynameFields">
                                    <input type="text" id='ApplynameF' name="name" className="ApplyTextFieldSmall" value={email} readOnly />
                                    <input type="text" id='ApplynameL' name="" className="ApplyTextFieldSmall" readOnly />
                                </div>
                                <div className="ApplynameFields">
                                    <input type="text" id='ApplynameF' name="email" className="ApplyTextFieldSmall" readOnly/>
                                    <input type="text" id='ApplynameF' name="linkedin" className="ApplyTextFieldSmall" readOnly/>

                                </div>

                                <div className="ApplynameFields">
                                    <input type="text" id='ApplynameF' name="city" className="ApplyTextFieldSmall"  readOnly/>
                                    <input type="text" id='ApplynameF' name="phone_number" className="ApplyTextFieldSmall" readOnly />
                                </div>
              </div>

<div className="Descriptiveaddedinfo">
<div className="ApplyDescriptiveInfo">
                                <div className="subHeading">Descriptive Info</div>
                                <textarea type="text" className="ApplyTextFieldBig" placeholder="What made you apply for the job?" readOnly/>
                                <textarea type="text" className="ApplyTextFieldBig" placeholder="Why do you think you will be the perfect fit?" readOnly />
                              </div>
</div>

<div className="EducationAddedDetails">
    
</div>
                </div>

            </div>
        </div>
    )
}

export default Jobapplication


