import React, { useState } from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
import { FaUserFriends, FaUserCheck, FaUserPlus } from 'react-icons/fa';
import '../../styles/UI/Invitations/invitation_card.css';

const InvitationCard = ({ name, color, Icon, content }) => {
  
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };
  console.log(Icon);
  // let Icon;
  // switch (icon) {
  //   case 'FaUserFriends':
  //     Icon = FaUserFriends;
  //     break;
  //   case 'FaUserCheck':
  //     Icon = FaUserCheck;
  //     break;
  //   case 'FaUserPlus':
  //     Icon = FaUserPlus;
  //     break;
  //   default:
  //     Icon = null;
  // }

  return (
    <div className="invitation-card" style={{ backgroundColor: color }}>
      <div className="invitation-content" onClick={handleClick}>
        <h3 className="invitation-name">{name}</h3>
        <div className="invitation-icon-container">
          {Icon && <Icon className="invitation-icon" />}
          
        </div>
      </div>
      {isExpanded && (
        <div className="invitation-details" style={{ backgroundColor: color }}>
          {content.map((item, index) => (
            <div key={index} className="invitation-detail">
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvitationCard;
