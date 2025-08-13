/*CMD
  command: addTask_reward
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

// command: addTask_reward
let amt = parseFloat(message);
if (!amt || amt <= 0) return Bot.sendMessage("❗ Enter a valid number like 0.01");
User.setProperty("new_task_reward", amt, "string");
Bot.sendMessage("⏰ Optional: Send task duration in hours (e.g., 72) or send 0 for no expiry:");
Bot.runCommand("addTask_duration");
