/*CMD
  command: /setMinWithdraw_save
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

// command: setMinWithdraw_save
let val = parseFloat(message);
if (!val || val <= 0) return Bot.sendMessage("Invalid value.");
Bot.setProperty("min_withdraw", val, "string");
Bot.sendMessage("✅ Minimum withdraw set to " + val + " TON");
Bot.runCommand("/admin");
