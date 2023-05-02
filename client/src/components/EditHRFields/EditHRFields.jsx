import { Delete, Upload } from '@mui/icons-material'
import './editHRFields.css'
function EditHRFields(props) {
    return (
        <div className="hrFieldsWrapper">
            <div className="topBar">
                <div className="topHeadings">
                    <div className="Heading">Edit Details</div>
                    <div className="HText">Edit profile details here</div>
                </div>
                <div className="buttonContainer">
                    <button className="discard">Discard</button>
                    <button className="preview">Save</button>
                </div>
            </div>
            <div className="panes">
                <div className="rightSide">
                    <div className="pfpSelectionHeading">
                        <div className="subHeading">Details</div>
                        <div className="forms">
                            <div className="nameFields">
                                <input type="text" id='nameF' className="TextFieldSmall" placeholder='First Name' />
                                <input type="text" id='nameF' className="TextFieldSmall" placeholder='Last Name' />
                            </div>
                            <input type="text" className="TextFieldSmall" placeholder='Email' />
                            <input type="text" className="TextFieldSmall" placeholder='LinkedIn' />
                            <input type="text" className="TextFieldSmall" placeholder='State' />
                            <input type="text" className="TextFieldSmall" placeholder='City' />
                            <input type="text" className="TextFieldSmall" placeholder='Country' />
                           
                          
                            <textarea name="" id="" cols="30" rows="10" className="TextFieldBig" placeholder='Bio'></textarea>
                            <div className="subHeading">Password Settings</div>
                        <input type="Password" className="TextFieldSmall" placeholder='Password' />
                       

                        </div>

                           
                       
                    </div>
                </div>
                <div className="leftSide">
                    <div className="pfpSelectionHeading">
                        <div className="subHeading">Profile Picture</div>
                        {/* <div className="HTextSmaller">Select a dashing confident profile picture.</div> */}
                    </div>
                    <div className="profileImageSelection">
                        <div className="profilePic">
                            <img src="https://th.bing.com/th/id/OIP.KdBSw8TPL34eU6T7bjhpAAHaLH?pid=ImgDet&rs=1" alt="" className="pfp" />
                        </div>
                        <div className="pfpButtons">
                            <button className="pfpUpload"><Upload /> UPLOAD</button>
                            <button className="pfpDelete"><Delete /> DELETE</button>
                        </div>
                    </div>
                    <div className="stats">
                        <div className="HTextSmaller">Joined: November 2018</div>
                        <div className="HTextSmaller">Jobs Posted: 795</div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default EditHRFields