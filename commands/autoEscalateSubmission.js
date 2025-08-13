/*CMD
  command: autoEscalateSubmission
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

// command: autoEscalateSubmission
let sid = params[0] || options;
let submissions = Bot.getProperty("pending_submissions", {});
let sub = submissions[sid];
if (!sub) return;
if (sub.status !== "pending") return;

let approvalChannel = Bot.getProperty("approval_channel");
let admin = Bot.getProperty("admin_id");
let caption = "⏳ *Auto-escalation:* Submission pending over 48h\n\n" +
  "Task: *" + sub.taskTitle + "*\n" +
  "User: [tg://user?id=" + sub.userId + "]\n" +
  "Amount: *" + sub.reward + " TON*\n\n" +
  "Submission ID: " + sid;

let kb = [
  [{ text: "✅ Approve (Admin)", callback_data: "/adminApproveSub " + sid }],
  [{ text: "❌ Decline (Admin)", callback_data: "/adminDeclineSub " + sid }]
];

if (approvalChannel) {
  Api.sendMessage({ chat_id: "@" + approvalChannel, text: caption, parse_mode: "Markdown", reply_markup: { inline_keyboard: kb } });
} else {
  Api.sendMessage({ chat_id: admin, text: caption, parse_mode: "Markdown", reply_markup: { inline_keyboard: kb } });
}
