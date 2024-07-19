import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CancelReasonModal = ({ show, onClose, onSave }) => {
    const [reason, setReason] = useState('');

    const handleSave = () => {
        onSave(reason || null);
        setReason('');
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cancelar Invitación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="cancelReason">
                        <Form.Label>Motivo de Cancelación (Opcional)</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={reason}
                            max={250}
                            onChange={(e) => setReason(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CancelReasonModal;
