/*CMD
  command: /start
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// command: start
// Welcome + compulsory channels join + register
let must1 = Bot.getProperty("mustjoin1");
let must2 = Bot.getProperty("mustjoin2");
let must3 = Bot.getProperty("mustjoin3");

// Register user once
let userList = Bot.getProperty("user_list", []);
if (!userList.includes(user.telegramid)) {
  userList.push(user.telegramid);
  Bot.setProperty("user_list", userList, "json");
}

// Save display name
let displayName = user.username ? "@" + user.username : (user.first_name || "User");
Bot.setProperty("name_" + user.telegramid, displayName, "string");

// Welcome text
let text = "*👋 Welcome to TaskTON — Earn TON by completing tasks!* \n\n" +
  "Complete tasks, submit proof, get approved by the task creator and earn TON.\n\n" +
  "⚠️ Please join the required channels before using the bot.";

// Build channel buttons (only show set ones)
let buttons = [];
if (must1) buttons.push([{ text: "🔗 Join Channel 1", url: "https://t.me/" + must1 }]);
if (must2) buttons.push([{ text: "🔗 Join Channel 2", url: "https://t.me/" + must2 }]);
if (must3) buttons.push([{ text: "🔗 Join Channel 3", url: "https://t.me/" + must3 }]);

buttons.push([{ text: "✅ I Joined / Continue", callback_data: "/checkJoin" }]);
buttons.push([{ text: "📨 Support", callback_data: "/support" }]);

Api.sendPhoto({
  chat_id: user.telegramid,
  photo: "https://i.imgur.com/4M7IWwP.png",
  caption: text,
  parse_mode: "Markdown",
  reply_markup: { inline_keyboard: buttons }
});
