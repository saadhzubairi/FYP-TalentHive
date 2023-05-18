import React from "react";
import './CandApplyJobComp'
import AddIcon from '@mui/icons-material/Add';

function EducationForm({ educationList, setEducationList }) {

  const handleInputChange = (event, id) => {
    event.preventDefault();
    const { name, value } = event.target;
    const inputValue = value;

    setEducationList((prevState) => {
      return prevState.map((education) => {
        if (education.id === id) {
          return { ...education, [name]: inputValue };
        } else {
          return education;
        }
      });
    });
  };

  const handleAddEducation = (e) => {
    e.preventDefault();
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
          status: ""
        },
      ];
    });
  };

  const handleDeleteEducation = (id) => {
    setEducationList(prevState => {
      return prevState.filter(education => education.id !== id);
    });
  };

  return (
    <div className='educationForm'>
      {educationList.map((education) => {
        return (
          <div key={education.id} className="educationSectionStuff">
            <div className='educationHeader'>
              <div className='educationTitle'>{education.id}.<div className="tit"><b><i>{education.institution}</i></b> </div> </div>
              <button className='Delete' onClick={() => handleDeleteEducation(education.id)}>Delete</button>
            </div>
            <div className="educationGridContainer">

              <div className="ApplynameFields">
                <input type='input' className='ApplyTextFieldSmall' placeholder='Degree' name='degree' value={education.degree}
                  onChange={
                    (event) => handleInputChange(event, education.id)
                  } required />
                <input type='input' className='ApplyTextFieldSmall' placeholder='Institution' name='institution' value={education.institution}
                  onChange={
                    (event) => handleInputChange(event, education.id)
                  } required />
                <input type='input' className='ApplyTextFieldSmall' placeholder='Grade/CGPA' name='grade' value={education.grade}
                  onChange={
                    (event) => handleInputChange(event, education.id)
                  } required />
              </div>
              <div className="ApplynameFields">
                <input type='date' className='ApplyTextFieldSmall' placeholder='Start Date' name='start_date' value={education.start_date}
                  onChange={
                    (event) => handleInputChange(event, education.id)
                  } required />
                <input type='date' className='ApplyTextFieldSmall' placeholder='End Date' name='end_date' value={education.end_date}
                  onChange={
                    (event) => handleInputChange(event, education.id)
                  } required />
              </div>
              <select name="status" id="" className="ComboBox" onClick={(event) => handleInputChange(event, education.id)} required>
                <option value="Completed">Completed</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Enrolled">Enrolled</option>
              </select>
            </div>
          </div>
        );
      })}
      <button className='Add' onClick={(e) => handleAddEducation(e)}>
        <AddIcon /> Add Education
      </button>
    </div>

  );
}



export default EducationForm