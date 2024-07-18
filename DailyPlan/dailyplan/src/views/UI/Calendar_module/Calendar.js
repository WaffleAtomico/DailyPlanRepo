import '../../../styles/UI/general.css'
import Calendar_Adapted from './calendarAdapted';

export default function Calendar_view(props) { 
    return(
        <div className="calendar-main-container">
            <Calendar_Adapted user_id={props.user_id}/>

        </div>
    );
}
//