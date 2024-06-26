import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { FaTrophy } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/UI/profile/archivementView.css';

const achievements = [
  // Agrega más logros si es necesario para llenar las filas
  { id: 1, title: 'Logro 1', description: 'Descripción del logro 1', image: 'ruta/a/la/imagen1.png', status: 'Logrado' },
  { id: 2, title: 'Logro 2', description: 'Descripción del logro 2', image: 'ruta/a/la/imagen2.png', status: 'Apagado' },
  { id: 3, title: 'Logro 3', description: 'Descripción del logro 3', image: 'ruta/a/la/imagen3.png', status: 'Logrado' },
  { id: 4, title: 'Logro 4', description: 'Descripción del logro 4', image: 'ruta/a/la/imagen4.png', status: 'Apagado' },
  { id: 5, title: 'Logro 5', description: 'Descripción del logro 5', image: 'ruta/a/la/imagen5.png', status: 'Logrado' },
  { id: 6, title: 'Logro 6', description: 'Descripción del logro 6', image: 'ruta/a/la/imagen6.png', status: 'Apagado' },
  { id: 7, title: 'Logro 7', description: 'Descripción del logro 7', image: 'ruta/a/la/imagen7.png', status: 'Logrado' },
  { id: 8, title: 'Logro 8', description: 'Descripción del logro 8', image: 'ruta/a/la/imagen8.png', status: 'Apagado' },
  { id: 9, title: 'Logro 9', description: 'Descripción del logro 9', image: 'ruta/a/la/imagen9.png', status: 'Logrado' },
  { id: 10, title: 'Logro 10', description: 'Descripción del logro 10', image: 'ruta/a/la/imagen10.png', status: 'Apagado' },
  { id: 11, title: 'Logro 11', description: 'Descripción del logro 11', image: 'ruta/a/la/imagen11.png', status: 'Logrado' },
  { id: 12, title: 'Logro 12', description: 'Descripción del logro 12', image: 'ruta/a/la/imagen12.png', status: 'Apagado' },
  { id: 13, title: 'Logro 13', description: 'Descripción del logro 13', image: 'ruta/a/la/imagen13.png', status: 'Logrado' },
  { id: 14, title: 'Logro 14', description: 'Descripción del logro 14', image: 'ruta/a/la/imagen14.png', status: 'Apagado' },
  { id: 15, title: 'Logro 15', description: 'Descripción del logro 15', image: 'ruta/a/la/imagen15.png', status: 'Logrado' },
  { id: 16, title: 'Logro 16', description: 'Descripción del logro 16', image: 'ruta/a/la/imagen16.png', status: 'Apagado' }
];

export default function Archivement_view() {
  return (
    <Container fluid className="archivement-view">
      <h2 className="text-center">Logros</h2>
      <Row>
        {achievements.map((achievement) => (
          <Col key={achievement.id} xs={6} sm={4} md={3}>
            <Card className={`achievement-card ${achievement.status === 'Logrado' ? 'achieved' : 'unachieved'}`}>
              <Card.Img variant="top" src={achievement.image} className="image-no-bg" />
              <Card.Body>
                <Card.Title>{achievement.title}</Card.Title>
                <Card.Text>{achievement.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
