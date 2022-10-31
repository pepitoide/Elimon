const Discord = require("discord.js")
const mongoose = require("mongoose")
const puertas = require("../DB/Modelos/puertas")
const create =require("../DB/Modelos/data_ussers");
require("../DB/db.js")


function setData() {
    let fecha = Date.now() - Date.now()
    let Fecha = new Date(fecha)
    return(Fecha)
}

exports.setDate = setData;