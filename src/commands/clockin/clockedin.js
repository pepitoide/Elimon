const Discord = require("discord.js")
const puertas = require("../../funciones/puertas")
const create =require("../../funciones/data_usser.js");
const embed = require("../../funciones/embed")
require("../../DB/db.js")

module.exports = {
    name: "clockedin",
    alias: ["fichando"],

    async execute(client, message, args){

        const server_id = message.guild.id;
        const clockedin = puertas.clockedin(server_id).then(cl =>{
            
            if(cl.find( e => e.server_id)){
                cl.forEach(e => {
                    let data_now = new Date()
                    let data_procecing = data_now.getTime() - e.date.getTime()
                    let data = new Date(data_procecing)
                    let day = data.toString().split(" ", 3).toString().slice(9) - 1;
                    
                    embed.clockedin(message, day, data, e)
                        
                })
            }else{
                message.channel.send({ embeds: [embed.no_fichajes]})
            }

        })
    }
}   