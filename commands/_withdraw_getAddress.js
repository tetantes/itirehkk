/*CMD
  command: /withdraw_getAddress
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

// command: withdraw_getAddress
if (!message) return Api.sendMessage({ chat_id: user.telegramid, text: "Send TON address now." });
let address = message.trim();
if (address.length < 10) return Api.sendMessage({ chat_id: user.telegramid, text: "Invalid address. Try again." });

User.setProperty("withdraw_address", address, "string");
Api.sendMessage({ chat_id: user.telegramid, text: "💸 Enter amount to withdraw (in TON):" });
Bot.runCommand("withdraw_getAmount");
