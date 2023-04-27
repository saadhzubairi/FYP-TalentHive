import React, { useState } from "react";
import './ApplyJobCard.css'

import { useEffect } from 'react';

function EducationForm() {
  const [educationList, setEducationList] = useState([]);

  useEffect(() => {
    // initialize educationList with one empty education entry
    setEducationList([{ id: 1, instituteName: '', program: '', graduationYear: '' }]);
  }, []);

  const handleInputChange = (event, id) => {
    const { name, value } = event.target;
    setEducationList(prevState => {
      return prevState.map(education => {
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
    setEducationList(prevState => {
      return [...prevState, { id: newId, instituteName: '', program: '', graduationYear: '' }];
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
          <div key={education.id}>
            <div className='educationHeader'>
              <div className='educationTitle'> <div className="tit">Institute: </div> {education.id}</div>
              <button className='Delete' onClick={() => handleDeleteEducation(education.id)}>Delete</button>
            </div>
            <div className='form_name'>
              <input type='input' className='TextFieldSmall' placeholder='Institute Name' name='instituteName' value={education.instituteName} onChange={(event) => handleInputChange(event, education.id)} required />
            </div>
            <div className='form_Program'>
              <input type='input' className='TextFieldSmall' placeholder='Program' name='program' value={education.program} onChange={(event) => handleInputChange(event, education.id)} required />
            </div>
            <div className='form_GraduationYear'>
              <input type='input' className='TextFieldSmall' placeholder='Graduation Year' name='graduationYear' value={education.graduationYear} onChange={(event) => handleInputChange(event, education.id)} required />
            </div>
          </div>
        );
      })}
      <button className='Add' onClick={handleAddEducation}>Add Education</button>
    </div>
  );
}

  

export default EducationForm