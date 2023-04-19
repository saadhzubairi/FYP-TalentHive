import "./feed.css"
import { Search } from "@mui/icons-material"
function Feed() {
    return (
        <div className="feed">
            <div className="feedWrapper">
                <div className="feedTitle">Hello, Vladmir</div>
                <div className="searchbar">
                    <Search className="SearchIcon" />
                    <input placeholder="Search across the system..." type="text" className="searchInput" />
                </div>
                <div className="jobPostings">
                    
                </div>
            </div>
        </div>
    )
}
export default Feed