import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/commonComponents/sideNav/Navbar";
import SocialCard from "./components/commonComponents/socailCard/SocialCard";
import CompanyPage from "./screens/CompanyPage";
import HomePage from "./screens/Hompage/HomePage";
import HR_page from "./screens/HR_Admins_Screens/HR_page";
import { Route, Routes } from "react-router-dom";

import ShowCompanyList from "./components/companyComponents/ShowCompanyList";
import CreateCompany  from "./components/companyComponents/CreateCompany";
import UpdateCompanyInfo from "./components/companyComponents/UpdateCompanyInfo"
import ShowCompanyDetails from "./components/companyComponents/ShowCompanyDetails"
import ShowCompanylistPage from "./screens/company_Routes_Screens/ShowCompanylistPage";
import Sidebar from './components/commonComponents/sideNav/Sidebar';

import CreateHr_Admin from "./components/HR_adminComponents/createHr_Admin";
import ShowHr_AdminList from "./components/HR_adminComponents/ShowHr_AdminList";
import ShowHr_AdminDetail from "./components/HR_adminComponents/ShowHr_AdminDetail";



function App() {
  return (
    <div className="App">
   
      <Routes>
        <Route path="/" element={<HomePage />} > </Route>
        <Route exact path="/Company-List-Page" element={<ShowCompanylistPage/>} />
        <Route path="/create-company" element={<CreateCompany />} />
        <Route path="/edit-company/:id" element={<UpdateCompanyInfo />} />
        <Route path="/show-company/:id" element={<ShowCompanyDetails />} />


        <Route exact path='/hr_admin' element={<ShowHr_AdminList />} />
          <Route path='/create-hr_admin' element={<CreateHr_Admin />} />
          <Route path='/show-hr_admin/:id' element={<ShowHr_AdminDetail />} />
      </Routes>
    </div>
  );
}

export default App;
