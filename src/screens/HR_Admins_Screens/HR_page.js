import React from 'react'
import { useState, useEffect } from "react";
import "../../App.css";
import HR_Card from '../../components/Hr_pageComponents/HR_Card';
import SocialCard from "../../components/commonComponents/socailCard/SocialCard";


function HR_page() {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      let userData;
      try {
        const response = await fetch("https://randomuser.me/api/?results=10");
        userData = await response.json();
      } catch (error) {
        console.log(error);
        userData = [];
      }
      setAllUsers(userData.results);
      setUsers(userData.results);
    })();
  }, []);

  const filterCards = event => {
    const value = event.target.value.toLowerCase();
    const filteredUsers = allUsers.filter(user => (`${user.name.first} ${user.name.last}`.toLowerCase().includes(value)));
    setUsers(filteredUsers);
  }
  return (
    <div>
     <h1>HR USERS LIST  </h1> 
       
       <input className="search-box" onInput={filterCards} placeholder="Search..."/>
       <div className="cards-container">
 
       {users.map((user, index) => (
         <HR_Card key={index} userData={user} />
         ))}
       </div>
      </div>
  )
}

export default HR_page