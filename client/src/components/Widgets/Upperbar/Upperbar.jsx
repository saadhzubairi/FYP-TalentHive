
import './JobDescCard.css'
import WorkIcon from '@mui/icons-material/Work';
import ModeOfWok from '@mui/icons-material/ModeOfTravel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
function Upperbar(props){
    return(
        <div className="Upperbar">
        <div className="TitleApp"> 
     <div className="feedTitle">Java Developer</div>
   
     <div className="details">
             <div className="work"><WorkIcon /> Job Type: Full Time  </div>
             <div className="Location"><LocationOnIcon /> Location: Pakistan</div>
             <div className="Mode"><ModeOfWok /> Mode of Work : Remote  </div>


             
         </div>
        
    
        </div>
                     
         </div>

    )
}
export default Upperbar