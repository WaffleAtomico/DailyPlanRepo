import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import '../../../styles/UI/Invitations/InvObjectivesBlock.css';
import { getUsrName } from '../../../utils/validations/user';
import { getUserIdsByReminder } from '../../../utils/validations/remindershare';
import GoalsModule from '../Calendar_module/ObjectivesBlocks';
import { getReminderById, getReminderBySourceIdAndUserId } from '../../../utils/validations/reminders';
import { getObjectivesBlockByReminderId, saveObjectivesBlock } from '../../../utils/validations/objetiveblock';
import { saveObjective } from '../../../utils/validations/objetive';

const InvObjectivesBlock = ({ user_id, reminderId, ownerId, setshowObjectivesBlock }) => {
  // const [showBlock, setShowBlock] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [userObjBlocks, setUserObjBlocks] = useState([]);
  const [userRemId, setUserRemId] = useState(null);

  useEffect(() => {
    const fetchcreator = () => {
      // if (user_id == ownerId) {
      //   return;
      // }
      getUsrName(ownerId).then(response => {
        if (response) {
          const userCreator = {
            id: ownerId,
            name: response.data[0].user_name,
          }
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
          // console.log(res)
          // console.log("Users data: ", res.data);
          const usersIds = res.data;
          usersIds.map(user => {
            // console.log("User Mapeado", user)
            if (user) {
              const current_user_id = user.rs_user_id_target;
              getUsrName(current_user_id)
                .then(response => {
                  // console.log("User", current_user_id);
                  // console.log(response);
                  if (response) {
                    const acceptedUser = {
                      id: current_user_id,
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
    };
    fetchcreator();
    fetchUsers();
  }, []);

  // useEffect(() => {
  //   const getObjectivesBlocksEachUser = () => {
  //     // console.log("ya va a comenzar lo feo");

  //   }

  //   if (users.length > 0) {
  //     getObjectivesBlocksEachUser();
  //   }
  // }, [users]);

  const handleShowBlock = (user) => {
    setSelectedUser(user);
    // setShowBlock(true);
    if (user.id == ownerId) {
      console.log("usuario creador");
      getObjectivesBlockByReminderId(reminderId).then(res => {
        console.log("ObjBlock data ", res.data);
        console.log("ObjBlock data ", Array.isArray(res.data));
        if (Array.isArray(res.data)) {
          console.log("Es un arreglo con longitud: ", res.data.length);
          res.data.forEach((item, index) => {
            console.log(`Elemento ${index}:`, item);
          });
          setUserObjBlocks(res.data);
        } else {
          console.log("No es un arreglo, estructura: ", res.data);
        }
      }).catch(err => { console.log(err) });
    } else {
      // console.log("Usario normal");
      getReminderBySourceIdAndUserId(reminderId, user.id).then(res => {
        console.log("Info del usuario con copia: ", res.data[0]);
        setUserRemId(res.data[0].reminder_id);
        getObjectivesBlockByReminderId(res.data[0].reminder_id).then(res => {
          // console.log("ObjBlock data ", Array.isArray(res.data));
          setUserObjBlocks(res.data);
        }).catch(err => { console.log(err) })
      }).catch(err => { console.log(err) })
    }
  };

  // useEffect(() => {
  //   console.log("userObjBlocks ha cambiado: ", userObjBlocks);
  // }, [userObjBlocks]);

  const handleObjectiveBlocksChange = (objectiveBlocks) => {
    console.log("Si es mayor a 0? ", (objectiveBlocks.length > 0))
    console.log(objectiveBlocks);
    if (objectiveBlocks.length > 0) {
      console.log("Si entra a objectives bloq")
      objectiveBlocks.forEach(goal => {
        const objectiveBlockData = {
          objblo_name: goal.name,
          objblo_duration_min: (goal.time == 0 ? 5 :goal.time),
          objblo_durationreal_min: 0,
          objblo_check: false,
          reminder_id: (user_id == ownerId ? reminderId : userRemId),
        };
        saveObjectivesBlock(objectiveBlockData).then(response => {
          const { objblo_id } = response.data;
          goal.objectives.forEach(objective => {
            // console.log("almacene 1 objetivo: ", objective);
            const goalData = {
              obj_name: objective,
              objblo_id: objblo_id,
              id_user: user_id,
            };
            console.log(goalData);
            saveObjective(goalData).then(response => {
              console.log("Objective saved:", response.data);
            }).catch(error => {
              console.error("Error saving objective", error);
            });
          });
          setshowObjectivesBlock(false);
        }).catch(error => {
          console.error("Error saving objective block", error);
        });
      });
    }
    // setShowBlock(false);
    

    //Falta actualizar o revisar que si actualice
  };

  return (
    <div>
      <div className="InvObjectivesBlock-overlay">
        <div className="InvObjectivesBlock-container">
          <Button variant="danger" className="InvObjectivesBlock-close-btn" onClick={() => setshowObjectivesBlock(false)}>
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
                <>
                  {user_id != selectedUser.id ?
                    <>
                      <h3>
                        Bloques de objetivos de: {selectedUser.name}
                      </h3>
                      {(userObjBlocks && userObjBlocks.length > 0) ?
                        <>
                          <div className="InvObjectivesBlock-blocks">
                            {userObjBlocks.map((block, index) => (
                              <div key={index} className="InvObjectivesBlock-block card">
                                <div className="IOB-card-body">
                                  <spam className="IOB-card-title">{block.objblo_name}</spam>
                                  <spam className="IOB-card-duration">{block.objblo_duration_min} min </spam>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                        :
                        <>
                          <h2>
                            Parece que {selectedUser.name} todavia no ha querido planear su viaje
                          </h2>
                        </>
                      }
                    </>
                    :
                    <>
                      <h3>
                        Bloques de objetivos propios
                        {(userObjBlocks && userObjBlocks.length > 0) ?
                          <>
                            <div className="InvObjectivesBlock-blocks">
                              {userObjBlocks.map((block, index) => (
                                <div key={index} className="InvObjectivesBlock-block card">
                                  <div className="IOB-card-body">
                                    <spam className="IOB-card-title" >{block.objblo_name}</spam>
                                    <spam className="IOB-card-duration">{block.objblo_duration_min} min </spam>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                          :
                          <>
                            <h2>Intenta agregar (Solo podras hacerlo una vez)</h2>
                            <GoalsModule onSave={handleObjectiveBlocksChange} />
                          </>
                        }
                      </h3>
                    </>}
                </>
              ) : (
                <p>Seleccione un usuario para ver la información.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default InvObjectivesBlock;
