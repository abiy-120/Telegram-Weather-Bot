import { Context, Telegraf } from "telegraf";
const bot = new Telegraf("7665808766:AAGgaLn6fr-mNJ0zEy7i6-LKQn_vlYIUtzM");

const startHandler = async (ctx: Context) => {
  ctx.reply(
    "Welcome - This bot shows you weather information. Enter the city name to get weather information."
  );
};

const helpHandler = async (ctx: Context) => {
  ctx.reply(
    "/start - Starts the bot.\n/help - Shows help information.\nEnter city name to get weather information."
  );
};

const getWeatherHandler = async (ctx: Context) => {
  const message = await ctx.message?.text;
  if (message[0] != "/") {
    const fetchWeatherInfo = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${message}&appid=c580f3a206d96aa35f9969b28f72ef6b`
    );
    if (fetchWeatherInfo.ok) {
      const weatherInfo = await fetchWeatherInfo.json();
      console.log(weatherInfo);
      ctx.reply(
        `City - ${weatherInfo.name}\nWeather - ${
          weatherInfo.weather[0].main
        } - ${weatherInfo.weather[0].description}\nTemperature - ${parseInt(
          weatherInfo.main.temp
        )} °C`
      );
    } else {
      if (fetchWeatherInfo.status == 404) {
        ctx.reply(
          "Can't get weather information of the city you entered. Make sure you entered a correct city name."
        );
      }
    }
  }
};
bot.command("start", startHandler);
bot.command("help", helpHandler);
bot.hears(/.+/, getWeatherHandler);
bot.launch();
