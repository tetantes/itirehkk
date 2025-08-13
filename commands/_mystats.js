/*CMD
  command: /mystats
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

// command: mystats
let bal = Libs.ResourcesLib.userRes("balance").value();
let userTasks = 0;
let tasks = Bot.getProperty("tasks", {});
for (let k in tasks){ if (tasks[k].creator == user.telegramid) userTasks++; }
let approvedCount = Bot.getProperty("approved_submissions_count_" + user.telegramid, 0);
Api.sendMessage({ chat_id: user.telegramid, text: "*My Stats*\nTasks created: " + userTasks + "\nBalance: " + bal.toFixed(6) + " TON\nApproved submissions: " + approvedCount, parse_mode: "Markdown" });
