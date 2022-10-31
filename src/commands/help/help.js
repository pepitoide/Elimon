const Discord = require("discord.js");
const embed = require("../../funciones/embed")

module.exports = {
    name: "help",
    alias: ["ayuda"],

    async execute(client, message){
        message.channel.send({embeds: [embed.embed_ayuda]})
    }
}