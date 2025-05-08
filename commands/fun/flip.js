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
        .setName('flip')
        .setDescription(lang.flipDescription),

    async execute(interaction) {
        try {
            const result = Math.random() < 0.5 ? lang.flipHeads : lang.flipTails;
            const embed = new EmbedBuilder()
                .setTitle(lang.flipTitle)
                .setDescription(`${lang.flipResult} ${result}`)
                .setColor(0xffcc00);

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('An error occurred during command execution:', error);
            await interaction.reply(lang.flipError);
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
