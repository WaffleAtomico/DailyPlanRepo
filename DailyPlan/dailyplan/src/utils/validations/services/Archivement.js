import React from 'react';

import { grantArchivement, isCompleted } from '../../archivements/grantArchivement';
import { myPojo } from '../../ShowNotifInfo';

import { TbNumber29Small, TbClockCheck } from "react-icons/tb";
import { MdOutlineTimer10Select, MdOutlineTimer3Select, MdOutlineTimelapse, MdDomainVerification } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import { IoAlertCircleOutline } from "react-icons/io5";
import { FaTrophy } from 'react-icons/fa';
import { FaSlideshare, FaListCheck, FaHourglassStart } from "react-icons/fa6";
import { GiTomato } from "react-icons/gi";
import { BsCalendarWeek, BsClockHistory } from "react-icons/bs";
import { GoGear } from "react-icons/go";

export const confirmArchivement = async (grantTitleId, userId) => {
  isCompleted(userId, grantTitleId).then(response => {
      if (response === false) {
          return response;
      }
  }).catch(error => {
      console.error("Error confirming achievement: ", error);
  });
};

export const grantArchivement = async (grantTitleId, userId, isCompletedArchivement, name) => {
  if (!isCompletedArchivement) { //si no esta completado hay que entregarlo
      grantArchivement(userId, grantTitleId).then(res => {
          const logro_name = "Logro: " + name;
          const size_tag = 220;
          
          switch(grantTitleId) {
              case 1:
                  // Obten una puntuacion mayor de 80 en puntualidad
                  myPojo.setNotif(logro_name, <TbNumber29Small size={size_tag} />);
              case 2:
                  // Obten una puntuacion mayor de 90 en puntualidad
                  myPojo.setNotif(logro_name, <MdOutlineTimer10Select size={size_tag} />);
              case 3:
                  // Obten una puntuacion mayor de 95 en puntualidad
                  myPojo.setNotif(logro_name, <MdOutlineTimer3Select size={size_tag} />);
              case 4:
                  // Acepta una invitacion de un recordatorio compartido
                  myPojo.setNotif(logro_name, <TiGroup size={size_tag} />);
              case 5:
                  // Notifica que llegarás tarde
                  myPojo.setNotif(logro_name, <IoAlertCircleOutline size={size_tag} />);
              case 6:
                  // Gana en alguna categoría de competición durante un recordatorio compartido
                  myPojo.setNotif(logro_name, <FaTrophy size={size_tag} />);
              case 7:
                  // Comparte una alarma con otro usuario
                  myPojo.setNotif(logro_name, <FaSlideshare size={size_tag} />);
              case 8:
                  // Completa un ciclo pomodoro
                  myPojo.setNotif(logro_name, <GiTomato size={size_tag} />);
              case 9:
                  // Completa tu primer grupo de objetivos
                  myPojo.setNotif(logro_name, <FaListCheck size={size_tag} />);
              case 10:
                  // Completa todas tus actividades a tiempo teniendo activa la preparación
                  myPojo.setNotif(logro_name, <MdOutlineTimelapse size={size_tag} />);
              case 11:
                  // No dejes que baje tu puntualidad por una semana
                  myPojo.setNotif(logro_name, <BsCalendarWeek size={size_tag} />);
              case 12:
                  // Crea un recordatorio compartido e invita otros usuarios
                  myPojo.setNotif(logro_name, <MdDomainVerification size={size_tag} />);
              case 13:
                  // Cambia tu titulo desde configuración
                  myPojo.setNotif(logro_name, <GoGear size={size_tag} />);
              case 14:
                  // Agrega un nuevo reloj
                  myPojo.setNotif(logro_name, <TbClockCheck size={size_tag} />);
              case 15:
                  // Guarda un cronómetro con al menos 5 marcas de tiempo
                  myPojo.setNotif(logro_name, <BsClockHistory size={size_tag} />);
              case 16:
                  // Obten todos los logros
                  myPojo.setNotif(logro_name, <FaHourglassStart size={size_tag} />);
          }

          return true;
      }).catch(error => {
          console.error("Error granting achievement:", error);
      });
  }
};
