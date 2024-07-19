import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import '../../../styles/UI/Calendar/ObjectivesBlocks.css';



const GoalsModule = ({ onClose, onSave }) => {
    const [blocks, setBlocks] = useState([]);
    const [blockColors, setBlockColors] = useState(['#FFA07A', '#FA8072', '#E9967A', '#F08080', '#CD5C5C', '#DC143C', '#B22222']);

    const addBlock = () => {
        if (blocks.length < 7) {
            setBlocks([...blocks, { name: '', time: '', objectives: [] }]);
        }
    };

    const addObjective = (index) => {
        const newBlocks = [...blocks];
        if (newBlocks[index].objectives.length < 10) {
            newBlocks[index].objectives.push('');
            setBlocks(newBlocks);
        }
    };

    const handleBlockChange = (index, field, value) => {
        const newBlocks = [...blocks];
        newBlocks[index][field] = value;
        setBlocks(newBlocks);
    };

    const handleObjectiveChange = (blockIndex, objectiveIndex, value) => {
        const newBlocks = [...blocks];
        newBlocks[blockIndex].objectives[objectiveIndex] = value;
        setBlocks(newBlocks);
    };

    const handleSave = () => {
        onSave(blocks);
    };

    return (
        <div className="goals-module-container">
            <div className="goals-module-actions">
                <Button onClick={handleSave} className="save-button">Guardar objetivos</Button>
                <Button onClick={onClose} className="reminders-close-button">X</Button>
            </div>
            <h3>Lista de Objetivos</h3>
            {blocks.map((block, blockIndex) => (
                <div className="block-container" key={blockIndex} style={{ backgroundColor: blockColors[blockIndex % blockColors.length] }}>
                    <Row className="block-header">
                        <Col xs={8}>
                            <Form.Control
                                type="text"
                                placeholder="Nombre del Bloque"
                                value={block.name}
                                onChange={(e) => handleBlockChange(blockIndex, 'name', e.target.value)}
                                maxLength={20}
                            />
                        </Col>
                        <Col xs={4}>
                            <Form.Control
                                type="number"
                                placeholder="Tiempo (min)"
                                value={block.time}
                                onChange={(e) => handleBlockChange(blockIndex, 'time', e.target.value)}
                                min={1}
                                max={60}
                            />
                        </Col>
                    </Row>
                    {block.objectives.map((objective, objectiveIndex) => (
                        <div className="objective-container" key={objectiveIndex} style={{ backgroundColor: `${blockColors[blockIndex % blockColors.length]}99` }}>
                            <Form.Control
                                type="text"
                                placeholder="Objetivo"
                                value={objective}
                                onChange={(e) => handleObjectiveChange(blockIndex, objectiveIndex, e.target.value)}
                                maxLength={20}
                            />
                        </div>
                    ))}
                    <Button onClick={() => addObjective(blockIndex)} className="add-objective-button">
                        Agregar Objetivo
                    </Button>
                </div>
            ))}
            <Button onClick={addBlock} className="add-block-button">
                Agregar Bloque
            </Button>
            {/* <div className="goals-module-actions">
                <Button onClick={handleSave} className="save-button">Guardar</Button>
                <Button onClick={onClose} className="close-button">X</Button>
            </div> */}
        </div>
    );
};

export default GoalsModule;
