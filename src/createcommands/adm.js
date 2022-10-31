const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
    .setName('adm')
    .setDescription('Comando de administracion')
    .addSubcommand(option =>
        option.setName('ban')
            .setDescription("Se baneara al miembro del servidor")
            .addUserOption(option =>
                option
                    .setName('usuario').setDescription("El usuario que se vera afectado").setRequired(true))
    )
    .addSubcommand(option =>
        option
            .setName('kick')
            .setDescription("Se expulsara al miembro del servidor")
            .addUserOption(option =>
                option
                    .setName('usuario').setDescription("El usuario que se vera afectado").setRequired(true))
    )
    .addSubcommand(option =>
        option
            .setName('timeout')
            .setDescription('El usuario no podra interactuar con el servidor')
            .addStringOption(option =>
                option.setName('opciones')
                    .setDescription('El tiempo que el usuario no podra interactuar')
                    .setRequired(true)
                    .addChoices(
                        { name: '60 segundos', value: 'op_1' },
                        { name: '5 minutos', value: 'op_2' },
                        { name: '10 minutos', value: 'op_3' },
                        { name: "20 minutos", value: "op_4" },
                        { name: "40 minutos", value: "op_5" },
                        { name: "60 minutos", value: "op_6" },
                        { name: "1 dia", value: "op_7" },
                        { name: "3 dias", value: "op_8" },
                        { name: "1 semana", value: "op_9" },
                    )
            )
    )
    .addSubcommand(option =>
        option.setName('addrole')
            .setDescription('Añadir rol al usuario')
            .addUserOption(option =>
                option
                    .setName('usuario')
                    .setDescription("El usuario que se vera afectado")
                    .setRequired(true))
            .addRoleOption(option =>
                option
                    .setName('role')
                    .setDescription('seleccionar el role a añadir')
                    .setRequired(true))
    )
exports.data = data