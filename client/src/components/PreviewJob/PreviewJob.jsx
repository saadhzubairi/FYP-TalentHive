import { Dataset, LocationCity, PinDrop, Work } from '@mui/icons-material'
import './previewJob.css'
import { Link } from 'react-router-dom'

function PreviewJobComp({ onAppsPage, job }) {
    return (
        <div className={onAppsPage ? "previewJobComOnPage" : "previewJobCom"}>
            <div className="previewJobCompWrapper">
                {onAppsPage ? null : <div className="topBar">
                    <div className="Heading">Preview</div>
                    <div className="buttonContainer">
                        <Link to={"/createJob"}>
                            <button className="discard">Discard</button>
                        </Link>
                        <button className="preview">Publish</button>
                    </div>
                </div>}
                <div className={onAppsPage ? "bottomAreaWoPadding" : "bottomArea"}>
                    {onAppsPage ? null : <div className="JTitle">{job.jobTitle}</div>}
                    <div className="panes">
                        <div className="leftSide">
                            {onAppsPage ? null : <div className="firstSection">
                                <div className="listItem"><PinDrop /> {job.location} (On Site)</div>
                                <div className="listItem"><Work /> Part-time</div>
                                <div className="listItem"><LocationCity /> Manhattan Software, LLC.</div>
                            </div>}
                            {onAppsPage ? null : <div className="skillsSection">
                                <div className="skillText"><Dataset /> Skills</div>
                                <div className="skillItems">
                                    {job.skills.map((s) => <div className="skillItem">{s}</div>)}
                                </div>
                            </div>}
                            <div className="Title">Job Description</div>
                            <div className="subText">
                                {job.description}
                            </div>
                            <div className="Title">Requirements</div>
                            <div className="subText">
                                {job.requiremets}
                            </div>

                            {onAppsPage ? <div className="skillsSection">
                                <div className="skillText"><Dataset /> Skills</div>
                                <div className="skillItems">
                                    {job.skills.map((s) => <div className="skillItem">{s}</div>)}
                                    
                                </div>
                            </div> : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PreviewJobComp