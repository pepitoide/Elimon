const { PermissionFlagsBits } = require("discord.js");
const embed = require("../../funciones/embed.js")

module.exports = {
    name: "channel_name",
    alias: ["cn"],

    async execute(client, message, args, comando) {

        const has_role_admin = message.member.permissions.has(PermissionFlagsBits.Administrator);

        if (!has_role_admin) return (message.channel.send({ embeds: [embed.no_has_permisson] }))
        if (has_role_admin) {

            message.channel.edit({ name: `${args.shift()}│${args.join("-")}` })
                .then(message.channel.send({ embeds: [embed.embed_exito] }))
                .catch(console.error);
        }
    }
}