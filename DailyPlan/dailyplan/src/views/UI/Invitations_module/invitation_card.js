import React, { useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { FaUserFriends, FaUserCheck, FaUserPlus, FaCheck, FaCog, FaTasks, } from 'react-icons/fa';
import { MdBlock } from "react-icons/md";
import { ImCross } from 'react-icons/im';
import '../../../styles/UI/Invitations/invitation_card.css';

const InvitationCard = ({ name, color, Icon, content, flag, handleInvAccepted,
                          handleInvRejected, handleInvObjectives, handleInvChange,
                          handleInvCanceled, handleInvDelete, handleInvUsers,
                         }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(content.length / itemsPerPage);
    const currentContent = content.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="invitation-card" style={{ backgroundColor: color }}>
            <div className="invitation-content" onClick={handleClick}>
                <h3 className="invitation-name">{name}</h3>
                <div className="invitation-icon-container">
                    {Icon && <Icon className="invitation-icon" />}
                </div>
            </div>
            {isExpanded && (
                <div className="invitation-details" style={{ backgroundColor: color }} >
                    {currentContent.map((item, index) => (
                        <div key={index} className="invitation-detail" onClick={handleInvUsers(item.inv_id)}>
                            <p>ID: {item.inv_id} </p>
                            <p>Razón: {item.inv_reason}</p>
                            {/* Add other relevant fields here */}
                            <div className="invitation-buttons">
                                {flag === 1 && (
                                    <>
                                        <button className="button-large" onClick={()=>handleInvAccepted(item.inv_id)}><FaCheck /> Aceptar</button>
                                        <button className="button-large" onClick={()=>handleInvRejected(item.inv_id)}><ImCross  /> Cancelar</button>
                                    </>
                                )}
                                {flag === 2 && (
                                    <>
                                        <button className="button-large" onClick={()=>handleInvObjectives(item.inv_id)}><FaTasks /> Objetivos</button>
                                        <button className="button-large" onClick={()=>handleInvCanceled(item.inv_id)}><MdBlock /> Eliminar</button>
                                    </>
                                )}
                                {flag === 3 && (
                                    <>
                                        <button className="button-large" onClick={()=>handleInvChange(item.inv_id)}><FaCog /> Ajustes</button>
                                        <button className="button-large" onClick={()=>handleInvObjectives(item.inv_id)}><FaTasks /> Objetivos</button>
                                        <button className="button-large" onClick={()=>handleInvDelete(item.inv_id)}><MdBlock /> Eliminar</button>
                                    </>
                                )}
                            </div>
                            <br />
                        </div>
                    ))}
                    <Pagination className="custom-pagination">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <Pagination.Item
                                key={i}
                                active={i + 1 === currentPage}
                                onClick={() => handlePageChange(i + 1)}
                            >
                                {i + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </div>
            )}
        </div>
    );
};

export default InvitationCard;
