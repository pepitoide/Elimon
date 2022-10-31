const { PermissionFlagsBits } = require("discord.js");
const Discord = require("discord.js")
const embed = require("../../funciones/embed")
const data_usser = require("../../funciones/data_usser")


module.exports = {
    name: "create",
    alias: ["crear"],

    async execute(client, message){
        const user_id = message.author.id;
        const server_id = message.guild.id;
        const usser_name = message.author.username;

        data_usser.buscar(user_id, server_id).then(e=>{
            if(e) {
                message.channel.send({embeds: [embed.data_is_create]})
            }else{
                data_usser.create_usser(user_id, server_id, usser_name, message);
            }
        })
        
        
    }
}