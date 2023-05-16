import PreviewJobComp from "../../components/CandPreviewJob/CandPreviewJob"
import Sidebar from "../../components/Candidate Sidebar/CSidebar"
import "./CandpreviewJob.css"
function PreviewJob(props) {
    return(
        
        <div className="previewJobWrapper">
            <Sidebar />
            <PreviewJobComp/>
        </div>
    )
}
export default PreviewJob