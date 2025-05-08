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


const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const lang = require('../../events/loadLanguage');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fact')
        .setDescription(lang.factDescription),

    async execute(interaction) {
        const apiUrl = 'https://uselessfacts.jsph.pl/random.json?language=en';

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            const embed = new EmbedBuilder()
                .setColor(0x0000FF)
                .setTitle(lang.factTitle)
                .setDescription(data.text)
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error fetching fact:', error);
            await interaction.reply(lang.factError);
        }
    },

    async executePrefix(message) {
        const apiUrl = 'https://uselessfacts.jsph.pl/random.json?language=en';

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            const embed = new EmbedBuilder()
                .setColor(0x0000FF)
                .setTitle(lang.factTitle)
                .setDescription(data.text)
                .setTimestamp();

            await message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error('Error fetching fact:', error);
            await message.channel.send(lang.factError);
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
