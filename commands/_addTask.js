/*CMD
  command: /addTask
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

// command: addTask
// Only allow users who have >=5 approved submissions
let completed = User.getProperty("approved_submissions_count", 0) || 0;
if (completed < 5) {
  return Api.sendMessage({ chat_id: user.telegramid, text: "⚠️ You must have *at least 5 approved task completions* before creating tasks.\nCompleted: " + completed, parse_mode: "Markdown" });
}

User.setProperty("new_task_title", null, "string");
Bot.sendMessage("📝 Send task title:");
Bot.runCommand("addTask_title");
