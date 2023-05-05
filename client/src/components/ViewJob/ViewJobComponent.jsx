import { AssignmentRounded, PinDrop, Work } from "@mui/icons-material"
import "./viewJobComponent.css"
import PreviewJobComp from "../PreviewJob/PreviewJob"
import BasicTabs from "./TabBar.tsx"

function ViewJobComponent({ job }) {
    return (
        <div className="viewJobComponent">
            <div className="topBar">
                <div className="headingAndAtts">
                    <div className="Heading">{job.jobTitle}</div>
                    <div className="attsColumns">
                        <div className="attItem"><PinDrop /> {job.location} (On Site)</div>
                        <div className="attItem"><Work /> Part-time</div>
                    </div>
                </div>
                <div className="Spots">
                    <div className="spotsCircle">{job.spots}</div>
                    <div className="toFillS">SPOTS TO FILL</div>
                </div>
            </div>
            <div className="bottomStuff">
                <div className="bottomWrapper">
                    <div className="leftPane">
                        <div className="paneWrapper">
                            <div className="applicantsCount"><b>{job.applications.length}</b> Applicants</div>
                            <BasicTabs />
                        </div>
                    </div>
                    <div className="rightPane">
                        <div className="linkSection">
                            <div className="linkPartContainer">
                                <div className="linkPart">www.talenthive.com/jobs/{job._id}</div>
                            </div>
                            <div className="iconPat"><AssignmentRounded /></div>
                        </div>
                        <div className="rightpaneWrapper">
                            <PreviewJobComp onAppsPage={true} job={job} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ViewJobComponent