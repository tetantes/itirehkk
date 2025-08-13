/*CMD
  command: /adminSettings
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

// command: adminSettings
let savedAdmin = Bot.getProperty("admin_id");
if (parseInt(savedAdmin) !== parseInt(user.telegramid)) return Api.sendMessage({ chat_id: user.telegramid, text: "❌ Not authorized." });

let perTask = Bot.getProperty("per_task_bonus") || 0.01;
let minW = Bot.getProperty("min_withdraw") || 0.05;
let approval = Bot.getProperty("approval_channel") || "";

let kb = [
  [{ text: "⚖️ Set per-task bonus (" + perTask + ")", callback_data: "/setPerTask" }],
  [{ text: "💳 Set min withdraw (" + minW + ")", callback_data: "/setMinWithdraw" }],
  [{ text: "🏷️ Set approval channel", callback_data: "/setApprovalChannel" }],
  [{ text: "🔁 Set must-join channels", callback_data: "/setMustJoin" }],
  [{ text: "🔙 Back", callback_data: "/admin" }]
];

Api.sendMessage({ chat_id: user.telegramid, text: "*Admin Settings*", parse_mode: "Markdown", reply_markup: { inline_keyboard: kb } });
