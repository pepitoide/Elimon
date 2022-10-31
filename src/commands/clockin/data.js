const Discord = require("discord.js")
const data_usser = require("../../funciones/data_usser")
const embed = require("../../funciones/embed")

module.exports = {
    name: "data",
    alias: ["dates"],

    async execute(client, message, args){

        const user_id = message.author.id;
        const server_id = message.guild.id;


        if(args[0] === "all" || !args[0] ||message.mentions.members.first()){

            if(!args[0]){
                const busqueda_usser = await data_usser.buscar(user_id, server_id);
                if(!busqueda_usser)return(message.channel.send({embeds:[embed.no_data_creada]}))
                if(busqueda_usser){
                    let day = busqueda_usser.date.toString().split(" ", 3).toString().slice(9) - 1;
                    embed.data(message, day, busqueda_usser)
                }
            }
    
            if(args[0] && args[0] === "all"){
                const data_all = await data_usser.buscar_data_all(server_id);
                if(!data_all[0])return(message.channel.send({embeds:[embed.no_data_creada]}))
                if(data_all){
                    message.react(`✅`)
                    data_all.forEach(e => {
                        let day = e.date.toString().split(" ", 3).toString().slice(9) - 1;
                        embed.data_all(message, day, e)
                    })
                }
                
            }
    
            if(message.mentions.members.first()){
                const mencion = message.mentions.members.first()
                const mencion_id = mencion.id
                const busqueda_data_id = await data_usser.buscar_id(mencion_id, server_id);
                
                if(!busqueda_data_id)return(message.channel.send({embeds:[embed.no_data_creada]}))
                if(busqueda_data_id){
                    let day = busqueda_data_id.date.toString().split(" ", 3).toString().slice(9) - 1;
                    embed.data(message, day, busqueda_data_id)                }
            }



        }else{
            return(message.channel.send({ embeds: [embed.arguments_warning]}))
        }
        
        
    }
}