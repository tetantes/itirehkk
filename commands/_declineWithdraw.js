/*CMD
  command: /declineWithdraw
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

// command: declineWithdraw
let wid = params[0];
let w = Bot.getProperty("withdrawals", {});
let req = w[wid];
if (!req) return Api.sendMessage({ chat_id: user.telegramid, text: "Request not found." });
let admin = Bot.getProperty("admin_id");
if (parseInt(user.telegramid) !== parseInt(admin)) return Api.sendMessage({ chat_id: user.telegramid, text: "❌ Not authorized." });

req.status = "declined";
req.declined_at = Date.now();
req.declined_by = user.telegramid;
w[wid] = req;
Bot.setProperty("withdrawals", w, "json");

Api.sendMessage({ chat_id: req.userId, text: "❌ Your withdrawal request was declined by admin. Reason: Contact support.", parse_mode: "Markdown" });
Api.sendMessage({ chat_id: user.telegramid, text: "✅ Withdrawal declined." });
