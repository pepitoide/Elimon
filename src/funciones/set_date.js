const Discord = require("discord.js")
const mongoose = require("mongoose")
const puertas = require("../db/Modelos/puertas")
const create =require("../db/Modelos/data_ussers");
require("../db/db.js")


function setData() {
    let fecha = Date.now() - Date.now()
    let Fecha = new Date(fecha)
    return(Fecha)
}

exports.setDate = setData;