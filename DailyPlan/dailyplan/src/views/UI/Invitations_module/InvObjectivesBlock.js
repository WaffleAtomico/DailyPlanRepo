import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import '../../../styles/UI/Invitations/InvObjectivesBlock.css';

const InvObjectivesBlock = ({ users }) => {
  const [showBlock, setShowBlock] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleShowBlock = (user) => {
    setSelectedUser(user);
    setShowBlock(true);
  };

  const handleCloseBlock = () => {
    setSelectedUser(null);
    setShowBlock(false);
  };

  return (
    <div>
      <Button variant="primary" onClick={() => setShowBlock(true)}>
        Mostrar Objetivos
      </Button>
      {showBlock && (
        <div className="InvObjectivesBlock-overlay">
          <div className="InvObjectivesBlock-container">
            <Button variant="danger" className="InvObjectivesBlock-close-btn" onClick={handleCloseBlock}>
              Cerrar
            </Button>
            <div className="InvObjectivesBlock-content">
              <div className="InvObjectivesBlock-user-list">
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Usuarios</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users && users.map((user) => (
                      <tr key={user.id} onClick={() => handleShowBlock(user)}>
                        <td>{user.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div className="InvObjectivesBlock-details">
                {selectedUser ? (
                  <p>{selectedUser.name} - Información cargada correctamente.</p>
                ) : (
                  <p>Seleccione un usuario para ver la información.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvObjectivesBlock;
