import React from "react";

function EducationForm({ educationList, setEducationList }) {
  const handleInputChange = (event, id) => {
    const { name, value } = event.target;
    setEducationList((prevState) => {
      return prevState.map((education) => {
        if (education.id === id) {
          return { ...education, [name]: value };
        } else {
          return education;
        }
      });
    });
  };

  const handleAddEducation = () => {
    const newId = educationList.length + 1;
    setEducationList((prevState) => {
      return [
        ...prevState,
        {
          id: newId,
          degree: "",
          institution: "",
          start_date: "",
          end_date: "",
          grade: "",
          status: 1,
        },
      ];
    });
  };

  const handleDeleteEducation = (id) => {
    setEducationList((prevState) => {
      return prevState.filter((education) => education.id !== id);
    });
  };

  return (
    <div className="educationForm">
      {educationList.map((education) => {
        return (
          <div key={education.id}>
            <div className="educationHeader">
              <div className="educationTitle">
                <div className="tit">Institute: </div> {education.id}
              </div>
              <button
                className="Delete"
                onClick={() => handleDeleteEducation(education.id)}
              >
                Delete
              </button>
            </div>

            <div className="ApplynameFields">
              <input
                type="text"
                id="ApplynameF"
                className="ApplyTextFieldSmall"
                placeholder="Degree"
                name="degree"
                value={education.degree}
                onChange={(event) => handleInputChange(event, education.id)}
                required
              />
              <input
                type="text"
                id="ApplynameF"
                className="ApplyTextFieldSmall"
                placeholder="Institution"
                name="institution"
                value={education.institution}
                onChange={(event) => handleInputChange(event, education.id)}
                required
              />
              <input
                type="date"
                id="ApplynameF"
                className="ApplyTextFieldSmall"
                placeholder="Start Date"
                name="start_date"
                value={education.start_date}
                onChange={(event) => handleInputChange(event, education.id)}
                required
              />
              <input
                type="date"
                id="ApplynameF"
                className="ApplyTextFieldSmall"
                placeholder="End Date"
                name="end_date"
                value={education.end_date}
                onChange={(event) => handleInputChange(event, education.id)}
              />
              <input
                type="text"
                id="ApplynameF"
                className="ApplyTextFieldSmall"
                placeholder="Grade"
                name="grade"
                value={education.grade}
                onChange={(event) => handleInputChange(event, education.id)}
              />
              <select
                id="ApplynameF"
                className="ApplyTextFieldSmall"
                name="status"
                value={education.status}
                onChange={(event) => handleInputChange(event, education.id)}
              >
                <option value={1}>Completed</option>
                <option value={2}>Ongoing</option>
                <option value={3}>Have Enrolled</option>
              </select>
            </div>
          </div>
        );
      })}

      <button className="Add" onClick={handleAddEducation}>
        Add Education
      </button>
</div>
);
}

export default EducationForm
