import React from "react";

function WorkExperienceForm({ workExperienceList, setWorkExperienceList }) {
  const handleInputChange = (event, id) => {
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




  const handleAddWorkExperience = () => {
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
            <div className="workExperienceHeader">
              <div className="workExperienceTitle">
                <div className="tit">Company: </div> {workExperience.id}
              </div>
              <button
                className="Delete"
                onClick={() => handleDeleteWorkExperience(workExperience.id)}
              >
                Delete
              </button>
            </div>

            <div className="ApplynameFields">
              <input
                type="text"
                id="ApplynameF"
                className="ApplyTextFieldSmall"
                placeholder="Title"
                name="title"
                value={workExperience.title}
                onChange={(event) =>
                  handleInputChange(event, workExperience.id)
                }
                required
              />
              <input
                type="text"
                id="ApplynameF"
                className="ApplyTextFieldSmall"
                placeholder="Company"
                name="company"
                value={workExperience.company}
                onChange={(event) =>
                  handleInputChange(event, workExperience.id)
                }
                required
              />
              <input
                type="date"
                id="ApplynameF"
                className="ApplyTextFieldSmall"
                placeholder="Start Date"
                name="start_date"
                value={workExperience.start_date}
                onChange={(event) =>
                  handleInputChange(event, workExperience.id)
                }
                required
              />
              <input
                type="date"
                id="ApplynameF"
                className="ApplyTextFieldSmall"
                placeholder="End Date"
                name="end_date"
                value={workExperience.end_date}
                onChange={(event) =>
                  handleInputChange(event, workExperience.id)
                }
              />

              <input
                type="checkbox"
                id="stillWorking"
                name="stillWorking"
                checked={workExperience.stillWorking}
                onChange={(event) => handleInputChange(event, workExperience.id)}
              />


              <textarea
                id="ApplynameF"
                className="ApplyTextFieldSmall"
                placeholder="Description"
                name="description"
                value={workExperience.description}
                onChange={(event) =>
                  handleInputChange(event, workExperience.id)
                }
                required
              ></textarea>
            </div>
          </div>
        );
      })}

      <button className="Add" onClick={handleAddWorkExperience}>
        Add Work Experience
      </button>
    </div>
  );
}

export default WorkExperienceForm
