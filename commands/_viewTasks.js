/*CMD
  command: /viewTasks
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: /viewtasks
  group: 
CMD*/

// command: viewTasks
let tasks = Bot.getProperty("tasks", {});
let out = [];
for (let k in tasks) {
  let t = tasks[k];
  if (!t.active) continue;
  if (t.expires_at && Date.now() > t.expires_at) continue;
  out.push(t);
}

if (out.length === 0) return Api.sendMessage({ chat_id: user.telegramid, text: "No tasks available right now." });

for (let i=0;i<out.length;i++){
  let t = out[i];
  let kb = [[{ text: "📤 Submit Proof", callback_data: "/startSubmit " + t.id }]];
  Api.sendMessage({
    chat_id: user.telegramid,
    text: "*" + t.title + "*\n" + t.desc + "\n\nReward: *" + t.reward + " TON*",
    parse_mode: "Markdown",
    reply_markup: { inline_keyboard: kb }
  });
}
