/*CMD
  command: /weeklySummary
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

// command: weeklySummary
// Run manually or schedule with Bot.runCommandAfter from admin
let users = Bot.getProperty("user_list", []);
let lines = [];
for (let uid of users){
  let bal = Libs.ResourcesLib.anotherUserRes(uid, "balance").value();
  let approved = Bot.getProperty("approved_submissions_count_" + uid, 0);
  if (approved > 0 || bal > 0) {
    lines.push("<a href='tg://user?id="+uid+"'>User</a>: " + approved + " approved — " + bal.toFixed(6) + " TON");
  }
}
let text = "*Weekly Summary*\n\n" + (lines.length ? lines.join("\n") : "No activity this week.");
Api.sendMessage({ chat_id: Bot.getProperty("admin_id"), text: text, parse_mode: "Markdown" });
