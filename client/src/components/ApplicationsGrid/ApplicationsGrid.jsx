import './applicationGrid.css'
import JobAppCard from "../Widgets/JobAppsCard/JobAppCard"
function ApplicationsGrid({ newApps }) {
    return (
        <div className="applicationGrid">
            <div className="appGridWrapper">
                {newApps? null:<JobAppCard />}
                {newApps? null:<JobAppCard />}
                {newApps? null:<JobAppCard />}
                {newApps? null:<JobAppCard />}
                {newApps? null:<JobAppCard />}
                {newApps? null:<JobAppCard />}
                <JobAppCard />
                <JobAppCard />
                <JobAppCard />
            </div>
        </div>
    )
}
export default ApplicationsGrid
