/*CMD
  command: /mainMenu 
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: /mainmenu
  group: 
CMD*/

// command: mainMenu
if (request.data) {
  var message_id = request.message.message_id;
  var chat_id = request.message.chat.id;

  Api.deleteMessage({
    chat_id: chat_id,
    message_id: message_id
  });
}

let kb = [
  [{ text: "📋 View Tasks", callback_data: "/viewTasks" }, { text: "➕ Create Task", callback_data: "/createTask" }],
  [{ text: "💰 My Balance", callback_data: "/myBalance" }, { text: "🏆 Leaderboard", callback_data: "/leaderboard" }],
  [{ text: "📤 Withdraw", callback_data: "/withdraw" }],
  [{ text: "📨 Support", callback_data: "/support" }]
];

Api.sendMessage({
  chat_id: user.telegramid,
  text: "*Main Menu*\nChoose an action below.",
  parse_mode: "Markdown",
  reply_markup: { inline_keyboard: kb }
});
