/*CMD
  command: addTask_desc
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

// command: addTask_desc
if (!message) return Bot.sendMessage("❗ Send the task description now.");
User.setProperty("new_task_desc", message, "string");
let defaultBonus = Bot.getProperty("per_task_bonus") || 0.01;
Bot.sendMessage("💰 Send reward amount in TON (e.g., 0.01). Default: " + defaultBonus);
Bot.runCommand("addTask_reward");
