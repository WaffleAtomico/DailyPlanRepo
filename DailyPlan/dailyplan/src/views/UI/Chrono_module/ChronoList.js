import React from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

/*
    Name: ChronoList
    Use: Show the chronos and the button to eliminate
*/

const ChronoList = ({ chronos, handleDeleteChrono }) => {
    return (
        <div className="table-responsive">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Cronometro</th>
                        <th>Tiempo</th>
                       
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {chronos.map((chrono, index) => (
                        <tr key={chrono.chrono_id}>
                            <td>{chrono.chrono_name}</td>
                            <td>{`${chrono.chrono_hour}:${chrono.chrono_min}:${chrono.chrono_sec}`}</td>
               
                            <td>
                                <Button variant="danger" onClick={() => handleDeleteChrono(chrono.chrono_id)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ChronoList;