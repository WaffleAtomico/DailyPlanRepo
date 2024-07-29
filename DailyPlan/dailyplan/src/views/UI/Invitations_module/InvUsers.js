import React, { useState, useEffect } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { FaBan, FaTimes } from 'react-icons/fa';

const InvUserList = ({ inv_id, user_id }) => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userToBlock, setUserToBlock] = useState(null);
  const [showList, setShowList] = useState(true);

  useEffect(() => {
    // Simulación de solicitud a la tabla de usuarios
    const fetchUsers = async () => {
      // Supongamos que esta es la respuesta de una API
      const response = [
        { id: 1, name: 'Usuario 1' },
        { id: 2, name: 'Usuario 2' },
        { id: 3, name: 'Usuario 3' },
      ];
      setUsers(response);
    };
    fetchUsers();
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
    showList && (
      <div className="user-list">
        <Button variant="secondary" className="close-btn" onClick={() => setShowList(false)}>
          <FaTimes /> Cerrar
        </Button>
        <Table striped bordered hover variant="dark">
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
                    <FaBan /> Bloquear
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
