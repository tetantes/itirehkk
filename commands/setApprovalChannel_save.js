/*CMD
  command: setApprovalChannel_save
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// command: setApprovalChannel_save
let ch = message.trim();
if (!ch.startsWith("@")) return Bot.sendMessage("Please send a channel username starting with @");
Bot.setProperty("approval_channel", ch.slice(1), "string");
Bot.sendMessage("✅ Approval channel set to " + ch);
Bot.runCommand("/admin");
