import React, { useEffect, useState } from 'react';
import "./Filter.css"
function FilterPopup(props) {
  const [selectedJobType, setSelectedJobType] = useState('');
  const [selectedModeOfWork, setSelectedModeOfWork] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDateAdded, setSelectedDateAdded] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error(error));
  }, []);

  const handleJobTypeChange = (event) => {
    setSelectedJobType(event.target.value);
  };

  const handleModeOfWorkChange = (event) => {
    setSelectedModeOfWork(event.target.value);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleDateAddedChange = (event) => {
    setSelectedDateAdded(event.target.value);
  };

  const handleApplyFilters = () => {
    props.onApplyFilters({
      jobType: selectedJobType,
      modeOfWork: selectedModeOfWork,
      location: selectedLocation,
      dateAdded: selectedDateAdded
    });
  };

  const handleClearFilters = () => {
    setSelectedJobType('');
    setSelectedModeOfWork('');
    setSelectedLocation('');
    setSelectedDateAdded('');
    props.onClearFilters();
  };

  return (
    <div className="filter-popup">
      <h3>Filter Job Postings</h3>
      <label>
        Job Type:
        <select value={selectedJobType} onChange={handleJobTypeChange}>
          <option value="">All</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="contract">Contract</option>
        </select>
      </label>
      <label>
        Mode of Work:
        <select value={selectedModeOfWork} onChange={handleModeOfWorkChange}>
          <option value="">All</option>
          <option value="in-office">In Office</option>
          <option value="remote">Remote</option>
        </select>
      </label>
      <label>
        Location:
        <select value={selectedLocation} onChange={handleLocationChange}>
          <option value="">All Countries</option>
          {countries.map(country => (
            <option value={country.name.common.toLowerCase()} key={country.name.common}>
              {country.name.common}
            </option>
          ))}
        </select>
      </label>
      <label>
        Date Added:
        <select value={selectedDateAdded} onChange={handleDateAddedChange}>
          <option value="">All</option>
          <option value="last-24-hours">Last 24 Hours</option>
          <option value="last-7-days">Last 7 Days</option>
          <option value="last-30-days">Last 30 Days</option>
        </select>
      </label>
      <div className="filter-buttons">
        <button onClick={handleApplyFilters}>Apply</button>
        <button onClick={handleClearFilters}>Clear</button>
      </div>
    </div>
  );
}

export default FilterPopup