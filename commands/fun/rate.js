/*

☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.:*・°☆
                                                 
   _____           _     ______                
  / ____|         | |   |___  /                
 | |  __  ___   __| |___   / / ___  _ __   ___ 
 | | |_ |/ _ \ / _` / __| / / / _ \| '_ \ / _ \
 | |__| | (_) | (_| \__ \/ /_| (_) | | | |  __/
  \_____|\___/ \__,_|___/_____\___/|_| |_|\___|
                                            
                    
DISCORD :  https://discord.gg/akAkqGQdbb                 
YouTube : https://www.youtube.com/@AresGZ                       

Command Verified : ✓  
Test Passed    : ✓

☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.:*・°☆
*/


const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const lang = require('../../events/loadLanguage'); 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rate')
        .setDescription(lang.rateCommandDescription)
        .addStringOption(option =>
            option.setName('thing')
                .setDescription(lang.rateOptionDescription)
                .setRequired(true)),

    async execute(interaction) {
        let sender = interaction.user;
        let thingToRate;

        if (interaction.isCommand && interaction.isCommand()) {
            thingToRate = interaction.options.getString('thing');
        } else {
            const message = interaction;
            sender = message.author;
            const args = message.content.split(' ');
            args.shift(); 
            thingToRate = args.join(' ');
        }

        const rating = Math.floor(Math.random() * 11);

        const embed = new EmbedBuilder()
            .setColor(0x0000FF)
            .setTitle(lang.rateTitle)
            .setDescription(lang.rateDescription
                .replace('{thingToRate}', thingToRate)
                .replace('{rating}', rating))
            .setTimestamp();

        if (interaction.isCommand && interaction.isCommand()) {
            await interaction.reply({ embeds: [embed] });
        } else {
            await interaction.reply({ embeds: [embed] });
        }
    },
};

/*

☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.:*・°☆
                                                 
   _____           _     ______                
  / ____|         | |   |___  /                
 | |  __  ___   __| |___   / / ___  _ __   ___ 
 | | |_ |/ _ \ / _` / __| / / / _ \| '_ \ / _ \
 | |__| | (_) | (_| \__ \/ /_| (_) | | | |  __/
  \_____|\___/ \__,_|___/_____\___/|_| |_|\___|
                                            
                    
DISCORD :  https://discord.gg/akAkqGQdbb                 
YouTube : https://www.youtube.com/@AresGZ                       

Command Verified : ✓  
Test Passed    : ✓

☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.:*・°☆
*/
