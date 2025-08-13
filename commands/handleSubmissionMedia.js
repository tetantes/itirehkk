/*CMD
  command: handleSubmissionMedia
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

// command: handleSubmissionMedia
if (!message && !request.photo && !request.document) return Bot.sendMessage("Send a photo or screenshot as proof.");

let taskId = User.getProperty("current_submission_task");
if (!taskId) return Bot.sendMessage("No task selected. Use /viewTasks");

let tasks = Bot.getProperty("tasks", {});
let t = tasks[taskId];
if (!t) return Bot.sendMessage("Task not found.");

let submissions = Bot.getProperty("pending_submissions", {});
let submissionId = "sub_" + new Date().getTime();
let fileId = null;

if (request.photo && request.photo[request.photo.length-1]) {
  fileId = request.photo[request.photo.length-1].file_id;
} else if (message && message.photo) {
  fileId = message.photo[message.photo.length-1].file_id;
} else if (message && message.document) {
  fileId = message.document.file_id;
}

let proof_text = message || "";

submissions[submissionId] = {
  id: submissionId,
  taskId: taskId,
  taskTitle: t.title,
  userId: user.telegramid,
  userName: user.first_name,
  creatorId: t.creator,
  proof_file: fileId,
  proof_text: proof_text,
  created_at: Date.now(),
  status: "pending",
  reward: t.reward
};
Bot.setProperty("pending_submissions", submissions, "json");

Api.sendMessage({ chat_id: user.telegramid, text: "✅ Proof received. Waiting for the task creator to review." });

// Notify task creator or admin (if admin created the task)
let notifyTo = t.creator;
let admin = Bot.getProperty("admin_id");
if (parseInt(t.creator) === parseInt(admin)) notifyTo = admin;

let cap = "📥 New submission for your task *" + t.title + "*\nFrom: " + (user.first_name || "User") + " (tg://user?id=" + user.telegramid + ")";
let kb = [
  [{ text: "✅ Approve", callback_data: "/approveSubmission " + submissionId }],
  [{ text: "❌ Decline", callback_data: "/declineSubmission " + submissionId }]
];

if (fileId) {
  Api.sendPhoto({ chat_id: notifyTo, photo: fileId, caption: cap, parse_mode: "Markdown", reply_markup: { inline_keyboard: kb } });
} else {
  Api.sendMessage({ chat_id: notifyTo, text: cap + "\n\nProof:\n" + proof_text, parse_mode: "Markdown", reply_markup: { inline_keyboard: kb } });
}

// update counters
t.total_submissions = (t.total_submissions || 0) + 1;
tasks[taskId] = t;
Bot.setProperty("tasks", tasks, "json");

// schedule auto-escalation after 48 hours (172800 seconds)
Bot.runCommandAfter(172800, "autoEscalateSubmission", submissionId);
User.setProperty("current_submission_task", null);
