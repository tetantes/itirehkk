/*CMD
  command: /admin
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

// command: admin
let savedAdmin = Bot.getProperty("admin_id");
if (!savedAdmin) {
  Bot.setProperty("admin_id", user.telegramid, "integer");
  Api.sendMessage({ chat_id: user.telegramid, text: "✅ You are set as admin." });
} else if (parseInt(savedAdmin) !== parseInt(user.telegramid)) {
  return Api.sendMessage({ chat_id: user.telegramid, text: "❌ You are not authorized." });
}

let perTask = Bot.getProperty("per_task_bonus") || 0.01;
let minW = Bot.getProperty("min_withdraw") || 0.05;
let approval = Bot.getProperty("approval_channel") || "Not set";

let buttons = [
  [{ text: "🧾 View Tasks", callback_data: "/adminViewTasks" }],
  [{ text: "➕ Add Task", callback_data: "/addTask" }],
  [{ text: "📣 Broadcast", callback_data: "/adminBroadcast" }],
  [{ text: "⚙️ Settings", callback_data: "/adminSettings" }],
  [{ text: "📊 Stats", callback_data: "/adminStats" }]
];

Api.sendMessage({
  chat_id: user.telegramid,
  text: "*Admin Panel*\nPer Task: " + perTask + " TON\nMin Withdraw: " + minW + " TON\nApproval Channel: " + approval,
  parse_mode: "Markdown",
  reply_markup: { inline_keyboard: buttons }
});
