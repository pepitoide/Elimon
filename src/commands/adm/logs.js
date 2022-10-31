const server_config = require("../../funciones/server_config")

server_config

module.exports = {
    name: "setlogs",
    alias: ["logs"],

    async execute(client, message, args){
        let reqdb  = await server_config.buscar(server_id = message.guild.id)

        if(!reqdb)return(message.channel.send("Ha ocurrido un error, intentalo en 1 minuto"))
        if(args <= 0 || !args[0].startsWith("<#"))return(message.channel.send("Debes mencionar el canal => #namechannel"))

        const channel_filter = args[0].trim().slice(2).split("");
        let d = channel_filter.pop();
        const channelSet = await message.guild.channels.fetch(`${channel_filter.join("")}`)
        server_config.update_server_config_logs(server_id = message.guild.id, channelSet).then(e => {
            if(e){
                message.channel.send("Se ha configurado el canal de logs")
            }
        })
    }
}