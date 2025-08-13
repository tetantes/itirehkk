/*CMD
  command: /withdraw
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

// command: withdraw
let bal = Libs.ResourcesLib.userRes("balance");
let minWithdraw = parseFloat(Bot.getProperty("min_withdraw") || 0.05);
if (bal.value() < minWithdraw) return Api.sendMessage({ chat_id: user.telegramid, text: "⚠️ Minimum withdraw is " + minWithdraw + " TON. Your balance: " + bal.value().toFixed(6) });

Api.sendMessage({ chat_id: user.telegramid, text: "💳 Send your TON wallet address (e.g., EQ...):" });
Bot.runCommand("withdraw_getAddress");
