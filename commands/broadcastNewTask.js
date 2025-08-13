/*CMD
  command: broadcastNewTask
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

// command: broadcastNewTask
let tid = options.taskId;
if (!tid) return;
let tasks = Bot.getProperty("tasks", {});
let t = tasks[tid];
if (!t) return;

let msg = "🚨 *New Task Available*\n\n" +
  "*" + t.title + "*\n" + t.desc + "\n\n" +
  "Reward: *" + t.reward + " TON*\n\n" +
  "Open /viewTasks to participate.";

let userList = Bot.getProperty("user_list", []);
let chunkSize = 40; // adjust smaller if you hit limits
for (let i = 0; i < userList.length; i += chunkSize) {
  let chunk = userList.slice(i, i + chunkSize);
  for (let uid of chunk) {
    Api.sendMessage({ chat_id: uid, text: msg, parse_mode: "Markdown" });
  }
}
