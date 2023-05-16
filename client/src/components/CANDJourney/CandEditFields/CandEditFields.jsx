import { Delete, Upload } from '@mui/icons-material'
import './candEditFields.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CandEditFields(props) {
    

    return (
        <div className="CandFieldsWrapper">
            <div className="CandtopBar">
                <div className="CandtopHeadings">
                    <div className="CandHeading">Edit Details</div>
                    <div className="CandText">Edit profile details here</div>
                </div>
                <div className="CandbuttonContainer">
                    <button className="Canddiscard">Discard</button>
                    <button className="Candpreview">Save</button>
                </div>
            </div>
            <div className="Candpanes">
                <div className="CandrightSide">
                    <div className="CandpfpSelectionHeading">
                        <div className="subHeading">Details</div>
                        <div className="Candforms">
                            <div className="CandnameFields">
                                <input type="text" id='CandnameF' className="CandTextFieldSmall" placeholder='First Name'/>
                                <input type="text" id='CandnameL' className="CandTextFieldSmall" placeholder='Last Name' />
                            </div>
                            <input type="text" className="CandTextFieldSmall" placeholder='Email' />
                            <input type="text" className="CandTextFieldSmall" placeholder='LinkedIn' />
                            <input type="text" className="CandTextFieldSmall" placeholder='Phone#' />
                            <input type="text" className="CandTextFieldSmall" placeholder='City' />
                            <input type="text" className="CandTextFieldSmall" placeholder='Country' />
                           
                          
                            <textarea name="" id="" cols="30" rows="10" className="CandTextFieldBig" placeholder='Bio'></textarea>
                            <div className="subHeading">Password Settings</div>
                        <input type="Password" className="CandTextFieldSmall" placeholder='Password' />
                       

                        </div>

                           
                       
                    </div>
                </div>
                <div className="CandleftSide">
                    <div className="CandpfpSelectionHeading">
                        <div className="subHeading">Profile Picture</div>
                        {/* <div className="HTextSmaller">Select a dashing confident profile picture.</div> */}
                    </div>
                    <div className="CandprofileImageSelection">
                        <div className="profilePic">
                            <img src="https://th.bing.com/th/id/OIP.KdBSw8TPL34eU6T7bjhpAAHaLH?pid=ImgDet&rs=1" alt="" className="pfp" />
                        </div>
                        <div className="pfpButtons">
                            <button className="pfpUpload"><Upload /> UPLOAD</button>
                            <button className="pfpDelete"><Delete /> DELETE</button>
                        </div>
                    </div>
                   
                </div>

            </div>
        </div>
    )
}
export default CandEditFields