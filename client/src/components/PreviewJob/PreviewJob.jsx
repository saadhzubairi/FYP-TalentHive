import { Dataset, LocationCity, PinDrop, Work } from '@mui/icons-material'
import './previewJob.css'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

function PreviewJobComp({ onAppsPage, job }) {
    const { jobId } = useParams()
    const [jobP, setJobP] = useState({ _id: "n/a" })

    useEffect(() => {
        const getJob = async () => {
            axios.get(`/jobs/${jobId}`).then((res) => {
                setJobP(res.data)
            }).catch((err) => console.log(err))
        }
        !onAppsPage ? jobP._id === "n/a" ? getJob() : console.log("") : setJobP(job);
    })

    return (
        <div className={onAppsPage ? "previewJobComOnPage" : "previewJobCom"}>
            <div className="previewJobCompWrapper">
                {onAppsPage ? null : <div className="topBar">
                    <div className="Heading">Preview</div>
                    <div className="buttonContainer">
                        <Link to={`/editJob/${jobId}`}>
                            <button className="preview">Edit</button>
                        </Link>
                        <Link to={"/createJob"}>
                            <button className="discard">Discard</button>
                        </Link>
                        <button className="preview">Publish</button>
                    </div>
                </div>}
                {jobP._id === "n/a" ?
                    <div>Loading...</div>
                    : <div className={onAppsPage ? "bottomAreaWoPadding" : "bottomArea"}>
                        {onAppsPage ? null : <div className="JTitle">{jobP.jobTitle}</div>}
                        <div className="panes">
                            <div className="leftSide">
                                {onAppsPage ? null : <div className="firstSection">
                                    <div className="listItem"><PinDrop /> {jobP.location} (On Site)</div>
                                    <div className="listItem"><Work /> Part-time</div>
                                    <div className="listItem"><LocationCity /> Manhattan Software, LLC.</div>
                                </div>}
                                {onAppsPage ? null : <div className="skillsSection">
                                    <div className="skillText"><Dataset /> Skills</div>
                                    <div className="skillItems">
                                        {jobP.skills.map((s) => <div className="skillItem">{s}</div>)}
                                    </div>
                                </div>}
                                <div className="Title">Job Description</div>
                                <div className="subText">
                                    {jobP.description}
                                </div>
                                <div className="Title">Requirements</div>
                                <div className="subText">
                                    {jobP.requiremets}
                                </div>

                                {onAppsPage ? <div className="skillsSection">
                                    <div className="skillText"><Dataset /> Skills</div>
                                    <div className="skillItems">
                                        {jobP.skills.map((s) => <div className="skillItem">{s}</div>)}

                                    </div>
                                </div> : null}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
export default PreviewJobComp