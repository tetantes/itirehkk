/*CMD
  command: /setMinWithdraw
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

// command: setMinWithdraw
Bot.sendMessage("Send new minimum withdraw in TON (e.g., 0.05):");
Bot.runCommand("setMinWithdraw_save");
