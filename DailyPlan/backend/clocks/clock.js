// import moment from 'moment-timezone/builds/moment-timezone-with-data-10-year-range.js'; // or .min.js


// //ELIMINAR ESTO LUEGO, o usarlo solo para las querys

// var test = moment().tz("America/Bahia_Banderas").format();

// console.log(test);

// // console.log(moment.tz.names());


// const getTimeZone = (zonefromUser, res) =>
// {
//     return res.json(moment().tz(zonefromUser).format());
// }

// const getAllTimeZones = (res) =>
// {
//     return res.json(moment.tz.names());
// }

// // Obtén la fecha y hora actual del usuario
// const fechaActual = moment();

// // Define la zona horaria objetivo (por ejemplo, 'America/New_York')
// const zonaHorariaObjetivo = 'America/New_York';

// // Convierte la fecha actual a la zona horaria objetivo
// const fechaHoraObjetivo = fechaActual.tz(zonaHorariaObjetivo);

// // Formatea la fecha y hora en el formato deseado
// const formatoFechaHora = 'DD/MM/YYYY HH:mm:ss';
// const fechaHoraFormateada = fechaHoraObjetivo.format(formatoFechaHora);

// console.log(`Fecha y hora en ${zonaHorariaObjetivo}: ${fechaHoraFormateada}`);



// export {
//     getTimeZone,
//     getAllTimeZones
// }