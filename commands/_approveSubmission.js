/*CMD
  command: /approveSubmission
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

// command: approveSubmission
let sid = params[0];
let submissions = Bot.getProperty("pending_submissions", {});
let sub = submissions[sid];
if (!sub) return Api.sendMessage({ chat_id: user.telegramid, text: "Submission not found." });

let admin = Bot.getProperty("admin_id");
if (parseInt(user.telegramid) !== parseInt(sub.creatorId) && parseInt(user.telegramid) !== parseInt(admin)) {
  return Api.sendMessage({ chat_id: user.telegramid, text: "❌ Only the task creator or admin can approve." });
}

// credit user
Libs.ResourcesLib.anotherUserRes(sub.userId, "balance").add(sub.reward);

// update submission
sub.status = "approved";
sub.approved_at = Date.now();
sub.approved_by = user.telegramid;
submissions[sid] = sub;
Bot.setProperty("pending_submissions", submissions, "json");

// update task approved count and user approved_submissions_count
let tasks = Bot.getProperty("tasks", {});
let t = tasks[sub.taskId];
t.approved_count = (t.approved_count || 0) + 1;
tasks[sub.taskId] = t;
Bot.setProperty("tasks", tasks, "json");

// increment submitter's approved_submissions_count
let submitterApproved = Libs.ResourcesLib.anotherUserRes(sub.userId, "approved_submissions_count");
if (!submitterApproved) {
  // Libs.ResourcesLib doesn't store arbitrary counters; store in User property
  let prev = Bot.getProperty("approved_submissions_count_" + sub.userId, 0);
  Bot.setProperty("approved_submissions_count_" + sub.userId, prev + 1, "integer");
} else {
  // fallback handled by property above
}

// notify
Api.sendMessage({ chat_id: sub.userId, text: "✅ Your submission for *" + t.title + "* has been *approved*. You earned *" + sub.reward + " TON*.", parse_mode: "Markdown" });
Api.sendMessage({ chat_id: user.telegramid, text: "✅ Submission approved and user paid." });
