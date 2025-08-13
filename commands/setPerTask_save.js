/*CMD
  command: setPerTask_save
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

// command: setPerTask_save
let val = parseFloat(message);
if (!val || val <= 0) return Bot.sendMessage("Invalid value.");
Bot.setProperty("per_task_bonus", val, "string");
Bot.sendMessage("✅ Per-task bonus set to " + val + " TON");
Bot.runCommand("/admin");
