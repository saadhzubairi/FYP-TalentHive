import { FormatMonth, FormatYear } from "react-date-time-formatter"
import "./xPCard.css"
function XPCard({xp}) {
    return (
        <div className="cardContainer">
            <div className="cardTitle">{xp.title}</div>
            <div className="cardCompany">{xp.company}</div>
            <div className="cardDuration"><FormatMonth date={xp.start_date} /> <FormatYear date={xp.start_date} /> - 
                        <FormatMonth date={xp.end_date} /> <FormatYear date={xp.end_date} /></div>
            <div className="cardDescription">{xp.description}</div>
        </div>

    )
}
export default XPCard