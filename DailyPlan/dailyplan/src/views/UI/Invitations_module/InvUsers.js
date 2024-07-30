import React, { useState, useEffect } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { FaBan, FaTimes } from 'react-icons/fa';
import '../../../styles/UI/Invitations/InvUserList.css'
import { getUsrName } from '../../../utils/validations/user';
import { getUserIdsByReminder } from '../../../utils/validations/remindershare';

const InvUserList = ({ inv_id, user_id, reminderId, alarmId,
  showUserList, setShowUserList
}) => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userToBlock, setUserToBlock] = useState(null);
  const [showList, setShowList] = useState(true);

  useEffect(() => {
    const fetchcreator = () => {
      getUsrName(user_id).then(response => {
        if (response) {
          const userCreator = {
            id: user_id,
            name: response.data[0].user_name,
          }
          /*
          setDetailedContent(detailedContent => {
                        if (!detailedContent.some(detail => detail.invId === newDetail.invId)) {
                            return [...detailedContent, newDetail];
                        }
                        return detailedContent;
                    });
          */
          setUsers(prevData => {
            if (!prevData.some(data => data.id === userCreator.id)) {
              return [...prevData, userCreator];
            }
            return prevData;
          });
        }
      }).catch(error => {
        console.error(error);
      })
    }
    const fetchUsers = () => {
      if (reminderId) {
        getUserIdsByReminder(reminderId).then(res => {
          console.log(res)
          console.log("Users data: ", res.data);
          const usersIds = res.data;
          usersIds.map(user => {
            console.log("User Mapeado", user)
            if (user) {
              const user_id = user.rs_user_id_target;
              getUsrName(user_id)
                .then(response => {
                  console.log("User", user_id);
                  console.log(response);
                  if (response) {
                    const acceptedUser = {
                      id: user_id,
                      name: response.data[0].user_name,
                    };
                    setUsers(prevData => {
                      if (!prevData.some(data => data.id === acceptedUser.id)) {
                        return [...prevData, acceptedUser];
                      }
                      return prevData;
                    });
                  }
                }).catch(error => { console.error(error); })
            }
          })
        }).catch(error => { console.error(error); })
      }
      if (alarmId) {
        //ALARMS SHARE PTM
        //variable de adentro: ar_user_id_target 
      }
    };
    fetchcreator();
    fetchUsers();
    // dummy
    // const response = [
    //   { id: 1, name: 'Usuario 1' },
    //   { id: 2, name: 'Usuario 2' },
    //   { id: 3, name: 'Usuario 3' },
    // ];
    // setUsers(response);
  }, []);

  const handleBlockUser = (user) => {
    setUserToBlock(user);
    setShowModal(true);
  };

  const confirmBlockUser = () => {
    // Simulación de solicitud para bloquear al usuario
    console.log(`Bloqueando al usuario con ID: ${userToBlock.id}`);
    setUsers(users.filter((u) => u.id !== userToBlock.id));
    setShowModal(false);
  };

  return (
    showUserList && (
      <div className="user-list">
        <h1> Usuarios </h1>
        <Button variant="secondary" className="close-btn" onClick={() => setShowUserList(false)}>
          <FaTimes /> Cerrar
        </Button>

        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td className="text-center">
                  <Button variant="danger" onClick={() => handleBlockUser(user)}>
                    <FaBan size={40} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Bloqueo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Estás seguro de que deseas bloquear a {userToBlock?.name}?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={confirmBlockUser}>
              Bloquear
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  );

};

export default InvUserList;
