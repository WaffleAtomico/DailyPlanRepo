import '../../styles/UI/navbar.css';
import { FaCalendarDays } from "react-icons/fa6";
import { LuAlarmClock } from "react-icons/lu";
import { MdOutlineRunningWithErrors } from "react-icons/md";
import { TbClock24, TbWorld } from "react-icons/tb";
import { IoIosMailOpen } from "react-icons/io";
import { useParams } from "react-router-dom";

export default function Ui_navbar(props) {

    const { email } = useParams();
    const iconzise = 25;
    return (
        <>
            <div className="navbar">
                {['M1', 'M2', 'M3', 'M4', 'M5', 'M6'].map((module, index) => (
                    <div 
                        key={index}
                        onClick={() => props.handleOptionSelected(index)} 
                        className={`nav-item ${props.selectedOption === index ? 'selected' : ''}`}
                    >                        
                        {index === 0 &&  <FaCalendarDays size={iconzise} /> }
                        {(index === 1 || index === 7) &&  <LuAlarmClock size={iconzise} /> }
                        {index === 2 && <MdOutlineRunningWithErrors size={iconzise} /> }
                        {(index === 3 ||index === 8) && <TbClock24 size={iconzise} /> }
                        {index === 4 &&  <TbWorld size={iconzise} />}
                        {index === 5 && <IoIosMailOpen size={iconzise} />}
                    
                    </div>
                ))}
            </div>
        </>   
    );
}
