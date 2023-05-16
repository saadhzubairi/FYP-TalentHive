import { Email, LinkOff, LinkRounded, LinkedIn, Phone, Web } from "@mui/icons-material"
import "./viewCandidateComp.css"
import EducationCard from "../../Widgets/EducationCard/EducationCard"
import SkillChip from "../../Widgets/SkillChips/SkillChip"
import XPCard from "../../Widgets/XPCard/XPCard"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { CircularProgress, LinearProgress, Link } from "@mui/material"
import axios from "axios"
import { format } from "timeago.js"
function ViewCandidateComp(props) {
    const { appId } = useParams()
    const [application, setApplication] = useState({ _id: "n/a" })
    const [candidate, setCandidate] = useState({ _id: "n/a" })
    const [educations, setEducations] = useState([])
    const [skills, setSkills] = useState([])
    const [xp, setXp] = useState([])
    const [links, setLinks] = useState([])

    useEffect(() => {
        const fetchApp = () => {
            axios.get(`/jobApplications?id=${appId}`).then((res) => setApplication(res.data)).catch((e) => console.log(e))
        }

        const fetchCand = () => {
            axios.get(`/candidate?id=${application.candidateId}`).then((res) => {
                setEducations(res.data.education)
                setXp(res.data.work_experience)
                setSkills(res.data.skills)
                setLinks(res.data.other_links)
                setCandidate(res.data)
            }
            ).catch((e) => console.log(e))
        }
        if (application._id === "n/a") {
            fetchApp()
        }
        else {
            if (candidate._id === "n/a") {
                fetchCand()
            }
        }
    })

    return (
        <div className="viewCandidateComp">
            <div className="dWrapper">
                <div className="TopBar">
                    {candidate._id === "n/a" ? <CircularProgress /> : <div className="avatarNameStuff">
                        <img src="https://th.bing.com/th/id/R.387f4c96716b91254cf66b480c1d2416?rik=IlLosc18G%2fW7JA&pid=ImgRaw&r=0" alt="" className="avatarCircle" />
                        <div className="nameStuff">
                            <div className="Name">{candidate.name.fname} {candidate.name.lname}</div>
                            <div className="applied">Applied {format(application.createdAt)}</div>
                        </div>
                        {candidate._id === "n/a" ? <CircularProgress /> : <div className="linksBar">

                            <div className="linker">
                                <div className="linkIcon" id="P"><Phone sx={{ fontSize: 30 }} />        </div>
                                <span>{candidate.phone_number}</span>
                            </div>
                            <div className="linker">
                                <div className="linkIcon" id="E"><Email sx={{ fontSize: 30 }} />        </div>
                                <span>{candidate.email}</span>
                            </div>
                            <div className="linker">
                                <div className="linkIcon" id="L"><LinkedIn sx={{ fontSize: 30 }} />     </div>
                                <span>{candidate.linkedin}</span>
                            </div>
                            {
                                links.map((l) => <div className="linker">
                                    <div className="linkIcon" id="N"><LinkRounded sx={{ fontSize: 30 }} />  </div>
                                    <span>{l}</span>
                                </div>
                                )
                            }


                        </div>}
                    </div>}
                    <div className="rating">{candidate._id === "n/a" ? <CircularProgress /> : application.rating}</div>
                </div>
                {candidate._id === "n/a" ? <LinearProgress /> : <div className="bottomPaneC">
                    <div className="rightPaneC">
                        <div className="rightPaneWrapperC">
                            <div className="subHeading">Education</div>
                            {educations.map((e) => <EducationCard key={e._id} education={e} />)}
                            <div className="subHeading">Skills</div>
                            <div className="skillsArea">
                                {skills.map((s) => <SkillChip key={s} skill={s} />)}
                            </div>
                        </div>
                    </div>
                    <div className="leftPaneC">
                        <div className="leftPaneWrapperC">
                            <div className="subHeading">Work Experience</div>
                            {xp.map((x) => <XPCard key={x._id} xp={x} />)}
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default ViewCandidateComp