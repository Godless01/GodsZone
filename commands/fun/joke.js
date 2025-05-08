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
const giveMeAJoke = require('give-me-a-joke');
const lang = require('../../events/loadLanguage'); 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription(lang.jokeCommandDescription),
    async execute(interaction) {
        const { jokeEmbedTitle, jokeError } = lang;

        try {
      
            giveMeAJoke.getRandomDadJoke((joke) => {
                const embed = new EmbedBuilder()
                    .setColor(0xffcc00)
                    .setTitle(jokeEmbedTitle)
                    .setDescription(joke);

                
                interaction.reply({ embeds: [embed] });
            });
        } catch (error) {
            console.error('An error occurred during command execution:', error);
            await interaction.reply({ content: jokeError, ephemeral: true });
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
