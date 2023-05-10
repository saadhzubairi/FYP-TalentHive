import "./educationCard.css"
import { FormatMonth, FormatYear, Formater } from 'react-date-time-formatter'

function EducationCard({ education }) {

    return (
        <div className="EducationCardContainer">
            <div className="EducationCard">
                <div className="degree">{education.degree}</div>
                <div className="institution">{education.institution}</div>
                <div className="toFromAndGrade">
                    <div className="toFrom">
                        <FormatMonth date={education.start_date} /> <FormatYear date={education.start_date} /> - 
                        <FormatMonth date={education.end_date} /> <FormatYear date={education.end_date} />
                        </div>
                    <div className="grade">Grade:<b>{education.grade}</b></div>
                </div>
            </div>
        </div>
    )
}
export default EducationCard