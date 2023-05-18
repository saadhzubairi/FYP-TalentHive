import React from "react";
import "./Experience.css"
import AddIcon from '@mui/icons-material/Add';
function WorkExperienceForm({ workExperienceList, setWorkExperienceList }) {

  const handleInputChange = (event, id) => {
    event.preventDefault();
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;

    setWorkExperienceList((prevState) => {
      return prevState.map((workExperience) => {
        if (workExperience.id === id) {
          return { ...workExperience, [name]: inputValue };
        } else {
          return workExperience;
        }
      });
    });
  };

  const handleAddWorkExperience = (e) => {
    e.preventDefault();
    const newId = workExperienceList.length + 1;
    setWorkExperienceList((prevState) => {
      return [
        ...prevState,
        {
          id: newId,
          title: "",
          company: "",
          start_date: "",
          end_date: "",
          stillWorking: false,
          description: "",
        },
      ];
    });
  };

  const handleDeleteWorkExperience = (id) => {
    setWorkExperienceList((prevState) => {
      return prevState.filter((workExperience) => workExperience.id !== id);
    });
  };

  return (
    <div className="workExperienceForm">
      {workExperienceList.map((workExperience) => {
        return (
          <div key={workExperience.id}>
            <div className="educationHeader">
              <div className="educationTitle"><div className="tit">Company: </div> {workExperience.id}</div>
              <button className="Delete" onClick={() => handleDeleteWorkExperience(workExperience.id)}>Delete</button>
            </div>
            <div className="ApplyexperienceFields">
              <div className="box1">
                <div className="nameflex">
                  <div className="ExperienceTitle">
                    <input type="text" className="ApplyTextFieldSmall" placeholder="Title" name="title" value={workExperience.title}
                      onChange={(event) =>
                        handleInputChange(event, workExperience.id)
                      } required />
                  </div>
                  <div className="CompanyName">
                    <input type="text" className="ApplyTextFieldSmall" placeholder="Company" name="company" value={workExperience.company}
                      onChange={(event) =>
                        handleInputChange(event, workExperience.id)
                      } required />
                  </div>
                </div>
                <div className="dateflex">
                  <div className="description">
                    <textarea className="ApplyTextFieldSmall" placeholder="Description" name="description" value={workExperience.description}
                      onChange={(event) =>
                        handleInputChange(event, workExperience.id)
                      } required />
                  </div>
                </div>
              </div>

              <div className="box2">
                <div className="dates">
                  <div className="StartDate">
                    <div className="StartDateTitle">Start Date</div>
                    <input type="date" className="ApplyTextFieldSmall" placeholder="Start Date" name="start_date" value={workExperience.start_date}
                      onChange={(event) =>
                        handleInputChange(event, workExperience.id)
                      } required />
                  </div>
                  <div className="EndDate">
                    <div className="EndDateTitle">End Date</div>
                    <input type="date" className="ApplyTextFieldSmall" placeholder="End Date" name="end_date" value={workExperience.end_date}
                      onChange={(event) =>
                        handleInputChange(event, workExperience.id)
                      } />
                  </div>
                </div>
                <div className="StillWorking">
                  <div className="StillWorkingTitle">Still Working?</div>
                  <div className="checkbox">
                    <input type="checkbox" id="stillWorking" name="stillWorking"
                      checked={workExperience.stillWorking}
                      onChange={(event) => handleInputChange(event, workExperience.id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <button className="Add" onClick={(e) => handleAddWorkExperience(e)}>
        <AddIcon /> Add Work Experience
      </button>
    </div>
  );
}

export default WorkExperienceForm
