const Discord = require("discord.js")
const puertas = require("../../funciones/puertas")
const create =require("../../funciones/data_usser.js");
const embed = require("../../funciones/embed")

module.exports = {
    name: "clockin",
    alias: ["entrada"],
    
    async execute(client, message, args){
        const user_id = message.author.id;
        const server_id = message.guild.id;
        const usser_name = message.author.username;

        const clocked = puertas.buscar(user_id, server_id).then(val => {
            if(val){message.channel.send({embeds: [embed.embed_fichando]})}
            if(!val){puertas.clockin(user_id, server_id,usser_name, message)}
            const verificar_data = create.buscar(user_id, server_id).then(verificar => {
                if(!verificar){create.create_usser(user_id, server_id, usser_name, message)}
            })
        })
    }
}