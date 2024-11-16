import { Telegraf, Markup } from "telegraf";

const token = '6392442670:AAFxIkX7YW76odBJuX1_xXNhKPcnzWrOL3U';
const webAppUrl = 'https://clicker-35e7c.web.app';

const bot = new Telegraf(token);

bot.command('start', ctx => {
    const userId = ctx.from?.id || 'default';
    
    ctx.reply('Hello! Press to start Playing', Markup.inlineKeyboard([
        Markup.button.webApp(
            'Open Game 🎮',
            `${webAppUrl}?ref=${userId}`
        )
    ]));
});

bot.launch()
    .then(() => console.log('Bot is running'))
    .catch(err => console.error('Error launching bot:', err));
