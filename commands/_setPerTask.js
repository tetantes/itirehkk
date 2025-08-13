/*CMD
  command: /setPerTask
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

// command: setPerTask
Bot.sendMessage("Send new per-task bonus in TON (e.g., 0.01):");
Bot.runCommand("setPerTask_save");
