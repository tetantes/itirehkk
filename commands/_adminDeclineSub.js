/*CMD
  command: /adminDeclineSub
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

// command: adminDeclineSub
let sid = params[0];
let submissions = Bot.getProperty("pending_submissions", {});
let sub = submissions[sid];
if (!sub) return Api.sendMessage({ chat_id: user.telegramid, text: "Submission not found." });

let admin = Bot.getProperty("admin_id");
if (parseInt(user.telegramid) !== parseInt(admin)) return Api.sendMessage({ chat_id: user.telegramid, text: "❌ Not authorized." });

sub.status = "declined";
sub.declined_at = Date.now();
sub.declined_by = user.telegramid;
submissions[sid] = sub;
Bot.setProperty("pending_submissions", submissions, "json");

Api.sendMessage({ chat_id: sub.userId, text: "❌ Your submission was declined by admin. You may re-submit.", parse_mode: "Markdown" });
Api.sendMessage({ chat_id: user.telegramid, text: "✅ Submission declined." });
