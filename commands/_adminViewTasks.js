/*CMD
  command: /adminViewTasks
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

if (user.telegramid != 6011460052) {
  Bot.sendMessage("⛔️ You are not authorized to view this page.");
  return;
}

let pendingTasks = Bot.getProperty("pending_tasks");
if (!pendingTasks || pendingTasks.length === 0) {
  Bot.sendMessage("✅ No pending task submissions.");
  return;
}

let text = "📋 *Pending Task Submissions:*\n\n";
for (var i = 0; i < pendingTasks.length; i++) {
  let t = pendingTasks[i];
  text +=
    "🆔 Task ID: `" + t.id + "`\n" +
    "👤 User: " + "[" + t.username + "](tg://user?id=" + t.user_id + ")\n" +
    "📎 Screenshot: " + t.screenshot + "\n" +
    "💰 Reward: *" + t.reward + " TON*\n\n" +
    "/approveTask " + t.id + "  |  /declineTask " + t.id + "\n\n";
}

Bot.sendMessage(text, { parse_mode: "Markdown" });
