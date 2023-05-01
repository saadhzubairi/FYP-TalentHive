import PreviewJobComp from "../../components/PreviewJob/PreviewJob"
import Sidebar from "../../components/Sidebar/Sidebar"
import "./previewJob.css"
function PreviewJob(props) {
    return(
        
        <div className="previewJobWrapper">
            <Sidebar />
            <PreviewJobComp/>
        </div>
    )
}
export default PreviewJob