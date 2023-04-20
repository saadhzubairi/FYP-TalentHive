import "./interviewCard.css"
function InterviewCard(props) {
    return(
        <div className="intCard">
            <div className="intCardWrapper">
                <div className="intCardTime">12:00</div>
                <div className="intCardNamePos">
                    <div className="name">Javed Kahn</div>
                    <div className="pos">Gallatic Leader</div>
                </div>
            </div>
        </div>
    )
}
export default InterviewCard