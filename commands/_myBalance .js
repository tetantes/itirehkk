/*CMD
  command: /myBalance 
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: /mybalance
  group: 
CMD*/

// command: myBalance
let bal = Libs.ResourcesLib.userRes("balance").value();
let approvedCount = Bot.getProperty("approved_submissions_count_" + user.telegramid, 0);
Api.sendMessage({ chat_id: user.telegramid, text: "*💰 Your balance:* " + bal.toFixed(6) + " TON\n✅ Approved submissions: " + approvedCount, parse_mode: "Markdown" });
