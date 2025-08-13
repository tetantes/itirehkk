/*CMD
  command: /adminStats
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

// command: adminStats
let usersCount = (Bot.getProperty("user_list") || []).length;
let tasksCount = Object.keys(Bot.getProperty("tasks", {})).length;
let pendingCount = Object.keys(Bot.getProperty("pending_submissions", {})).length;
Api.sendMessage({ chat_id: user.telegramid, text: "*Global Stats*\nUsers: " + usersCount + "\nTasks: " + tasksCount + "\nPending submissions: " + pendingCount, parse_mode: "Markdown" });
