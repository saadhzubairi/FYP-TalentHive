import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CompanyDetailPage.css";
import { Button, Space } from 'antd';


function CompanyDetailPage() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch(`https://randomuser.me/api/?seed=${id}&inc=name,email,cell,picture`)
      .then((response) => response.json())
      .then((data) => setUserData(data.results[0]))
      .catch((error) => console.error(error));
  }, [id]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>

<div  className="card1">
      <h1 className="card__title"> XYZ company </h1>
      <h1 className="card__title">{`${userData.name.first} ${userData.name.last}`}</h1>
      <h2>Email: {userData.email}</h2>
      <h3> Cell: {userData.cell}</h3>
      <img src={userData.picture.large} alt={userData.name.first} />
       </div>

<Space className="btn" direction="vertical" style={{width : '10%'}} > 
      <Button type="primary" block>Primary Button</Button>
      <Button type="primary" danger block> Primary </Button>
      </Space>
    </div>

  );
}

export default CompanyDetailPage;
