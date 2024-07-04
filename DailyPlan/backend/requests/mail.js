import { transporter } from "../index.mjs";
import nodemailer from "nodemailer";

export const sendMailrest = (req, res, next) => {
    const email = req.body.email;
    const nombre = req.body.nombre;
    const codigo = req.body.codigo;

    var mensaje = '<span style="font-size: 13.0pt; font-family: sans-serif;">' + 
      '<p>Estimado usuario:<strong>' + nombre + '</strong></p>' + 
      '<p>Para actualizar tu contrase&ntilde;a necesitas ingresar el siguiente codigo de verificación es <strong>' + codigo + '</strong></p>' + 
      '<p><a href="https://dailyplan.javateam.mx/restore_pwd/' + email+ '" target="_blank">Restablecer Contrase&ntilde;a</a></p>' + 
      '<p style="text-align: center;" align="center"><a href="https://dailyplan.javateam.mx">DailyPlan</a></p></span>'
  
    var mail = {
      from: '"DailyPlan" <dailyplan@javateam.com.mx>',
      to: email,
      subject: 'Restauración de contraseña',
      html: mensaje
    }
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          msg: 'fail'
        })
      } else {
        res.json({
          msg: 'success'
        })
      }
    })
}
