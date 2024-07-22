import React from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoTrashBinSharp } from "react-icons/io5";

/*
    Name: ChronoList
    Use: Show the chronos and the button to eliminate
*/

const ChronoList = ({ chronos, handleDeleteChrono }) => {
    return (
        <div className="table-responsive chrono-table-container">
            {chronos.length < 1 ? (
                <h2>No hay cronómetros disponibles. ¡Empieza a agregar algunos cronómetros!</h2>
            ) : (
                <Table striped bordered hover className="chrono-table">
                    <thead>
                        <tr>
                            <th>Cronometro</th>
                            <th>Tiempo</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {chronos.map((chrono, index) => (
                            <tr key={chrono.chrono_id}>
                                <td>{chrono.chrono_name}</td>
                                <td>{`${chrono.chrono_hour}:${chrono.chrono_min}:${chrono.chrono_sec}`}</td>
                                <td>
                                    <Button variant="danger chrono-delete-button" onClick={() => handleDeleteChrono(chrono.chrono_id)}>
                                        <IoTrashBinSharp />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default ChronoList;
