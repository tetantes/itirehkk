/*CMD
  command: addTask_title
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

// command: addTask_title
if (!message) return Bot.sendMessage("❗ Send the task title now.");
User.setProperty("new_task_title", message, "string");
Bot.sendMessage("📎 Send task description (instructions):");
Bot.runCommand("addTask_desc");
