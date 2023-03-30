const { PermissionFlagsBits } = require("discord.js");
const embed = require("../../funciones/embed.js")

module.exports = {
    name: "anuncio",
    alias: ["spam"],

    async execute(client, message, args, comando){

        const has_role_admin = message.member.permissions.has(PermissionFlagsBits.Administrator);

        if(!has_role_admin)return(message.channel.send({embeds: [embed.no_has_permisson]}))
        if(has_role_admin){

            const opcion = args.shift();

            if(opcion === "1"){
                message.channel.send({embeds: [embed.embed_elimon(op = 1,val1 = args.join(" "))]})
            }else if(opcion === "2"){
                console.log(args)
                message.channel.send({embeds: [embed.embed_elimon(op = 2,val1= args.shift(),val2=args.join(" "))]})
            }else if(opcion === "3"){
                message.channel.send({embeds: [embed.embed_elimon(op = 3,val1= args.shift(),val2= args.shift(),val3=args.join(" "))]})
            }
        }
    }
}