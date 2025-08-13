/*CMD
  command: /startSubmit
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

// command: startSubmit
// params: taskId
let taskId = params[0];
if (!taskId) return Bot.sendMessage("Invalid task.");
User.setProperty("current_submission_task", taskId, "string");
Bot.sendMessage("📎 Please send your *proof* (photo or file).", { parse_mode: "Markdown" });
Bot.runCommand("handleSubmissionMedia");
