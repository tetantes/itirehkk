/*CMD
  command: /adminApproveSub
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

// command: adminApproveSub
let sid = params[0];
let submissions = Bot.getProperty("pending_submissions", {});
let sub = submissions[sid];
if (!sub) return Api.sendMessage({ chat_id: user.telegramid, text: "Submission not found." });

let admin = Bot.getProperty("admin_id");
if (parseInt(user.telegramid) !== parseInt(admin)) return Api.sendMessage({ chat_id: user.telegramid, text: "❌ Not authorized." });

Libs.ResourcesLib.anotherUserRes(sub.userId, "balance").add(sub.reward);

sub.status = "approved";
sub.approved_at = Date.now();
sub.approved_by = user.telegramid;
submissions[sid] = sub;
Bot.setProperty("pending_submissions", submissions, "json");

Api.sendMessage({ chat_id: sub.userId, text: "✅ Your submission has been approved by admin and you were paid *" + sub.reward + " TON*.", parse_mode: "Markdown" });
Api.sendMessage({ chat_id: user.telegramid, text: "✅ You approved submission and user was paid." });
