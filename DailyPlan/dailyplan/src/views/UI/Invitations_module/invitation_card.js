import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { FaUserFriends, FaUserCheck, FaUserPlus, FaCheck, FaCog, FaTasks, } from 'react-icons/fa';
import { MdBlock, MdGroups3 } from "react-icons/md";
import { ImCross } from 'react-icons/im';
import { Button } from 'react-bootstrap';

import '../../../styles/UI/Invitations/invitation_card.css';
import { getReminderById } from '../../../utils/validations/reminders';
import { getUsrName } from '../../../utils/validations/user';

const InvitationCard = ({ name, color, Icon, content, flag, handleInvAccepted,
    handleInvRejected, handleInvObjectives, handleInvChange,
    handleInvCanceled, handleInvDelete, handleInvUsers,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [detailedContent, setDetailedContent] = useState([
        // invCreator= null,
        // invName= null,
        // invHour= null,
        // invDate= null,
    ]);
    const itemsPerPage = 10;

    useEffect(() => {
        content.map((item) => {
            if (selectType(item.alarm_id, item.reminder_id)) {
                //reminder sol
                let creatorName = "CreatorUsrName";
                getUsrName(item.user_id_owner).then(response => {
                    if (response) {
                        creatorName = response.data[0].user_name;
                    }
                }).catch(error => {
                    console.error(error);
                })

                getReminderById(item.reminder_id).then(res => {
                    // console.log("reminder: ", res.data);
                    const dataRem = res.data[0];
                    const newDetail = {
                        invId: item.inv_id,
                        invRemId: dataRem.reminder_id,
                        invCreator: creatorName,
                        invName: dataRem.reminder_name,
                        invHour: dataRem.reminder_hour,
                        invDate: new Date(dataRem.reminder_date).toISOString().split('T')[0],
                    };
                    // console.log("NewDetail: ",newDetail)
                    setDetailedContent(detailedContent => {
                        if (!detailedContent.some(detail => detail.invId === newDetail.invId)) {
                            return [...detailedContent, newDetail];
                        }
                        return detailedContent;
                    });
                    // console.log("DetailedContent ", detailedContent);
                }
                ).catch(err => { console.log(err) })
            } else {
                //alarm solicitud
            }
        })
    }, [content])

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const truncateText = (text, maxLength) => {
        // console.log("texto recibido",text);
        // console.log("DetailedContent ", detailedContent);
        if (text) {
            return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
        }
    };

    const selectType = (alarm_id, reminder_id) => {
        if (reminder_id) {
            return true;
        }
        if (alarm_id) {
            return false;
        }
    }

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
                        <div key={index} className="invitation-detail" >
                            {/* <p>ID: {item.inv_id} </p> */}
                            {/* <p>Razón: {item.inv_reason}</p> */}
                            <p className='invitation-text'> Tipo: <br /><samp>{selectType(item.alarm_id, item.reminder_id) ? "Recordatorio" : "Alarma"}</samp></p>
                            <p className='invitation-text'>Motivo: <br /><samp>{truncateText(detailedContent[index]?.invName || "", 15)} </samp></p>
                            <p className='invitation-text'>De:<br /><samp>{truncateText(detailedContent[index]?.invCreator || "", 15)}</samp></p>
                            {selectType(item.alarm_id, item.reminder_id) ? <p className='invitation-text'>Fecha: <br /><samp>{detailedContent[index]?.invDate || ""}</samp></p> : <></>}
                            <p className='invitation-text'>Hora: <br /><samp>{detailedContent[index]?.invHour || ""}h</samp></p>
                            <div className="invitation-buttons">

                                <Button variant="success" className="button-large" onClick={() => handleInvUsers(item.inv_id, item.user_id_owner, detailedContent[index].invRemId, item.alarm_id)}>
                                    <MdGroups3 size={20} />
                                </Button>

                                {flag === 1 && (
                                    <>
                                        <Button variant="success" className="button-large" onClick={() => handleInvAccepted(item.inv_id, item.user_id_owner,
                                            selectType(item.alarm_id, item.reminder_id),
                                            (item.reminder_id ? item.reminder_id : null), (item.alarm_id ? item.alarm_id : null)
                                        )}>
                                            <FaCheck /> Aceptar
                                        </Button>
                                        <Button variant="danger" className="button-large" onClick={() => handleInvRejected(item.inv_id)}>
                                            <ImCross /> Cancelar
                                        </Button>
                                    </>
                                )}
                                {flag === 2 && (
                                    <>
                                        {item.reminder_id &&
                                            <Button variant="primary" className="button-large" onClick={() => handleInvObjectives(item.inv_id)}>
                                                <FaTasks /> Objetivos
                                            </Button>
                                        }
                                        <Button variant="danger" className="button-large" onClick={() => handleInvCanceled(item.inv_id, item.user_id_owner)}>
                                            <MdBlock /> Eliminar
                                        </Button>
                                    </>
                                )}
                                {flag === 3 && (
                                    <>

                                        {/* <Button variant="info" className="button-large" onClick={() => handleInvChange(item.inv_id)}>
                                            <FaCog /> Ajustes
                                        </Button> */}
                                        {item.reminder_id &&
                                            <Button variant="alert" className="button-large" onClick={() => handleInvObjectives(item.inv_id)}>
                                                <FaTasks /> Objetivos
                                            </Button>
                                        }
                                        <Button variant="danger" className="button-large" onClick={() => handleInvDelete(item.inv_id)}>
                                            <MdBlock /> Eliminar
                                        </Button>
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
