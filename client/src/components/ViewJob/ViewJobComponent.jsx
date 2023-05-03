import { AssignmentRounded, PinDrop, Preview, Work } from "@mui/icons-material"
import "./viewJobComponent.css"
import PreviewJobComp from "../PreviewJob/PreviewJob"
import { Box, Tab, Tabs } from "@mui/material"
import BasicTabs from "./TabBar.tsx"

function ViewJobComponent(props) {
    const handleTabs = (e, val) => {
        console.warn(val)
    }
    return (
        <div className="viewJobComponent">
            <div className="topBar">
                <div className="headingAndAtts">
                    <div className="Heading">Java Developer</div>
                    <div className="attsColumns">
                        <div className="attItem"><PinDrop /> California, LA (On Site)</div>
                        <div className="attItem"><Work /> Part-time</div>
                    </div>
                </div>
                <div className="Spots">
                    <div className="spotsCircle">13</div>
                    <div className="toFillS">SPOTS TO FILL</div>
                </div>
            </div>
            <div className="bottomStuff">
                <div className="bottomWrapper">
                    <div className="leftPane">
                        <div className="paneWrapper">
                            <div className="applicantsCount"><b>10</b> Applicants</div>
                            <BasicTabs />
                        </div>
                    </div>
                    <div className="rightPane">
                        <div className="linkSection">
                            <div className="linkPartContainer">
                                <div className="linkPart">www.talenthive.com/balulageller/joasdashk</div>
                            </div>
                            <div className="iconPat"><AssignmentRounded /></div>
                        </div>
                        <div className="rightpaneWrapper">
                            <PreviewJobComp onAppsPage={true} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ViewJobComponent