const express = require('express')
const app = express()
const router = express.Router()
const serverless = require('serverless-http')
const axios = require("axios");

app.use(express.static('static'))
app.use(express.json());

require('dotenv').config();
const { Telegraf } = require('telegraf');
const { json } = require('body-parser');

const bot = new Telegraf(process.env.BOT_TOKEN);

router.get("/", (req, res) => {
res.send("Welcome");
});
app.use('/.netlify/functions/api',router);
bot.launch()

bot.command('start', ctx => {
    console.log(ctx.update.message.text)
    bot.telegram.sendMessage(ctx.chat.id, 'Hello there! Welcome to heartbeat', {
    })

  })

  bot.command("cookies", async (ctx) => {
    var inp = ctx.message.text.split("$");
    const username = inp[1];
    const cookies = inp[2];
  
    function makeRequest() {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://www.fiverr.com/users/${username}/manage_gigs`,
        headers: { 
          'Cookie': cookies,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        }
      };
  
      axios.request(config)
        .then((response) => {
          console.log(response.status);
          ctx.reply('ok');
        })
        .catch((error) => {
          console.log(error);
          ctx.reply('error');
        });
    }
  
    // Call the request immediately
    makeRequest();
  
    // Schedule the request to be called every 5 minutes
    setInterval(makeRequest, 5 * 60 * 1000);
  });



module.exports.handler = serverless(app)