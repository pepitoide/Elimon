const { PermissionFlagsBits } = require("discord.js");
const Discord = require("discord.js")
const embed = require("../../funciones/embed")
const data_usser = require("../../funciones/data_usser")

module.exports = {
    name: "export",
    alias: ["exportar"],

    async execute(client, message){
        const user_id = message.author.id;
        const server_id = message.guild.id;

        data_usser.data_all_export(server_id, message)
    }
}