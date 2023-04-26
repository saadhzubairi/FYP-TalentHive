import './Location.css';

const Location = ({ location }) => {
  return <div className="location">
     
      <p>{location.city}</p>
      <p>{location.state}</p>
      
      <p>{location.country}</p>
    </div>;
};

export default Location;