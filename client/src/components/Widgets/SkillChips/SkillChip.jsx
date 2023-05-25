import "./skillChip.css"
function SkillChip({skill}) {
    return(
        <div className="chipContainer">
            <div className="skillDiv">{skill}</div>
        </div>
    )
}
export default SkillChip