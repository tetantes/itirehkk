/*CMD
  command: /support 
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

// command: support
Bot.sendMessage("✉️ Send your support message now:");
Bot.runCommand("support_send");
