/*CMD
  command: addTask_duration
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

// command: addTask_duration
let dur = parseInt(message) || 0;
let title = User.getProperty("new_task_title");
let desc = User.getProperty("new_task_desc");
let reward = parseFloat(User.getProperty("new_task_reward"));

let tasks = Bot.getProperty("tasks", {});
let id = "task_" + (new Date().getTime());
tasks[id] = {
  id: id,
  title: title,
  desc: desc,
  reward: reward,
  creator: user.telegramid,
  created_at: Date.now(),
  duration_hours: dur,
  expires_at: dur>0 ? Date.now() + dur*3600*1000 : null,
  active: true,
  total_submissions: 0,
  approved_count: 0
};
Bot.setProperty("tasks", tasks, "json");

// clear temporary props
User.setProperty("new_task_title", null);
User.setProperty("new_task_desc", null);
User.setProperty("new_task_reward", null);

Api.sendMessage({ chat_id: user.telegramid, text: "✅ Task created: *" + title + "*\nReward: " + reward + " TON", parse_mode: "Markdown" });

// Broadcast to users automatically about new task
Bot.runCommand("broadcastNewTask", { taskId: id });
