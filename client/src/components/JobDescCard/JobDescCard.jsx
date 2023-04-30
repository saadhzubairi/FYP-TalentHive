import WorkIcon from '@mui/icons-material/Work';
import ModeOfWok from '@mui/icons-material/ModeOfTravel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import './JobDescCard.css'
import { useNavigate } from 'react-router-dom';
function JobDescCard(props) {
    const history = useNavigate(); // Get access to the history object

  const handleButtonClick = () => {
    history("/ApplyJob"); 
    // Navigate to the "jobdesc" route
  };

    return (


        <div className="jobDescCard">


            <div className="jobDescCardContainer">


                <div className="Options">
                    <div className="Upperbar">
                   <div className="TitleApp"> 
                   <div className="Details">

                <div className="feedTitle">Java Developer</div>
              
                <div className="details">
                        <div className="work"><WorkIcon /> Job Type: Full Time  </div>
                        <div className="Location"><LocationOnIcon /> Location: Pakistan</div>
                        <div className="Mode"><ModeOfWok /> Mode of Work : Remote  </div>

                   </div>

                        
                    </div>

                    <div className="button">

                    <button class="apply-now" onClick={handleButtonClick}>Apply Now</button>  

                   
                    </div>
               
                   </div>
                    
                    
                    
                    </div>

                    <div className="JD">
                        <div className="JobDescTitle">
                            Company Overview
                        </div>
                        <div className="JobDescContent">
                            Ibex, for one of it's global client, is looking to hire a Data Analyst. The team is looking for a data centric Analyst to join the Strategy and Analytics team within Demand Gen Operations. This opportunity is ideal for someone with a strong attention to detail, general analytics background, and concrete understanding of the Marketing function of a SaaS company including Salesforce, Marketo, SQL, and Tableau experience.

                                The Demand Gen Operations team focuses on all aspects of making the go to market business run smoothly and efficiently. The team operationalizes market strategy, processes and reporting for supporting DG teams that are driving user acquisition, pipeline and revenue. Acting as the right hand of decision making to Demand Gen, the DG Ops team leverages data, insights and forecasting to advise on investment and resourcing decisions. DG Ops is cross functional, collaborating closely with DG team stakeholders to solve long term roadmap and Demand Gen vision. DG Ops team members are organized and process-oriented. Strong DG Ops members have a track record of delivering successful high-priority and impact initiatives in fast paced technology environments.



                            
                        </div>
                        <div className="JobDescT"> Job Overview </div>
                        <div className="Responsibility"> Responsibilities:
                            Support Demand Gen Ops team with ad hoc campaign cleanup/backfill requests. For example, backfills on ‘Acquisition Program’ for all Leads or campaign attribution details.
                            Own and manage data quality and master data management for leads, account reporting, in coordination with Marketing Operations
                            Write SQL to make changes to our Snowflake view of data
                            Use existing tables/views with additional requirements to add new fields using SQL logic
                            Compile analytics for external reporting into visually appealing slides, dashboards or PDFs (to Sales/other groups
                            Complete QA for our Tableau instance, dashboards, reporting and more
                            Support Terminus reporting by pulling in numbers from Terminus attribution instance for multi-touch and last-touch pipeline attribution
                            Help drive the operations behind our pipeline attribution project including:
                            Campaign/membership backfills
                            Lead source attribution reporting
                            Campaing data synthesis
                        </div>

                        <div className="skills"> Skills Needed : Tableau - creating dashboards to support business stakeholders, QA existing instance for optimization
                            SQL - basic SQL queries, as well as strong working knowledge of view development to support tableau builds
                            Salesforce - general knowledge as well as an understanding of back end objects to support system cleanup/backfill
                            Marketo - understanding of how Marketo & Salesforce align; Marketo reporting
                            Pipeline Attribution knowledge
                            Process and detail oriented
                            Analytical/systems thinking
                            Problem solving/Strategic thinking
                            Comfortable working in EST Time zone (Evening/Night shift)</div>


                    </div>

         
                    
                
              
                
            
           

         </div>
              
         




            </div>

            

        </div>


    )
}
export default JobDescCard