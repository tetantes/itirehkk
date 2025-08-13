/*CMD
  command: /setMustJoin 
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: /setmustjoin
  group: 
CMD*/

// command: setMustJoin
Bot.sendMessage("Send the must-join channels separated by comma (e.g., @ch1,@ch2,@ch3). Send 'none' to clear.");
Bot.runCommand("setMustJoin_save");
