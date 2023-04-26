import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/commonComponents/Navbar";
import SocialCard from "./components/commonComponents/SocialCard";
import CompanyPage from "./screens/CompanyPage";
import HomePage from "./screens/HomePage";
import HR_page from "./screens/HR_page";
import { Route, Routes } from "react-router-dom";
import CompanyDetailPage from "./components/CompanyDetailPage/CompanyDetailPage";

import ShowCompanyList from "./components/companyComponents/ShowCompanyList";
import CreateCompany  from "./components/companyComponents/CreateCompany";
import UpdateCompanyInfo from "./components/companyComponents/UpdateCompanyInfo"
import ShowCompanyDetails from "./components/companyComponents/ShowCompanyDetails"

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route exact path="/" element={<ShowCompanyList/>} />
        <Route path="/HR_page" element={<HR_page />}></Route>

        <Route path="/create-company" element={<CreateCompany />} />
        <Route path="/edit-company/:id" element={<UpdateCompanyInfo />} />
        <Route path="/show-company/:id" element={<ShowCompanyDetails />} />
      </Routes>
    </div>
  );
}

export default App;
