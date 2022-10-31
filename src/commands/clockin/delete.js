const { PermissionFlagsBits } = require("discord.js");
const Discord = require("discord.js")
const embed = require("../../funciones/embed")
const data_usser = require("../../funciones/data_usser")

module.exports = {
    name: "delete",
    alias: ["eliminar"],

    async execute(client, message){
        const user_id = message.author.id;
        const server_id = message.guild.id;
        const has_role_admin = message.member.permissions.has(PermissionFlagsBits.Administrator);

        if(!has_role_admin)return(message.channel.send({embeds: [embed.no_has_permisson]}))
        if(has_role_admin){
            const busqueda_data = await data_usser.buscar_data_all(server_id)
            if(!busqueda_data[0])return(message.channel.send({embeds: [embed.no_data_creada]}))
            
            data_usser.delete_data_all(server_id, message)
        }
    }
}