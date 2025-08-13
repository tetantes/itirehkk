/*CMD
  command: /setApprovalChannel
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

// command: setApprovalChannel
Bot.sendMessage("Send the approval channel username (start with @):");
Bot.runCommand("setApprovalChannel_save");
