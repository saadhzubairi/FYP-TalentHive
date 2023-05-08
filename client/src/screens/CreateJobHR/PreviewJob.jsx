import PreviewJobComp from "../../components/PreviewJob/PreviewJob"
import Sidebar from "../../components/Sidebar/Sidebar"
import "./previewJob.css"
function PreviewJob(props) {
    return(
        
        <div className="previewJobWrapper">
            <Sidebar />
            <PreviewJobComp onAppsPage={false}/>
        </div>
    )
}
export default PreviewJob