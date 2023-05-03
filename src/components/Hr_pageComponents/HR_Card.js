import '../commonComponents/socailCard/SocialCard';
import Location from '../commonComponents/Location';
import Phone from '../commonComponents/socailCard/Phone';

const HR_Card = ({ userData }) => {
    return (
        <div className="card">
            <div className="card__title">{" NAME:"+userData.name.first} </div>
            <div className='card_subTitle'>{"COMPANY:"+userData.name.last+".Ltd"}</div>
            <div className="card__body">
                <Location location={userData.location}/>
                <Phone number={userData.phone} type="Home"/>
                <Phone number={userData.cell} type="Cell"/>
                <div className="card__image"><img src={userData.picture.medium}/></div>
            </div>

        </div>
    )
};

export default HR_Card;