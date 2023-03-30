const { PermissionFlagsBits } = require("discord.js");
const embed = require("../../funciones/embed.js")

module.exports = {
    name: "deletems",
    alias: ["dms"],

    async execute(client, message, args, comando) {

        const has_role_admin = message.member.permissions.has(PermissionFlagsBits.Administrator);

        if (!has_role_admin) return (message.channel.send({ embeds: [embed.no_has_permisson] }))
        
        const DeleteMessages = await message.channel.messages.fetch({ limit: args.join(""), cache: false })
        DeleteMessages.forEach(e => {
            e.delete()
        });
    }
}