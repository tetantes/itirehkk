/*CMD
  command: /approveWithdraw
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

// command: approveWithdraw
let wid = params[0];
let w = Bot.getProperty("withdrawals", {});
let req = w[wid];
if (!req) return Api.sendMessage({ chat_id: user.telegramid, text: "Request not found." });

let admin = Bot.getProperty("admin_id");
if (parseInt(user.telegramid) !== parseInt(admin)) return Api.sendMessage({ chat_id: user.telegramid, text: "❌ Not authorized." });

// deduct user balance
Libs.ResourcesLib.anotherUserRes(req.userId, "balance").add(-req.amount);

req.status = "paid";
req.paid_at = Date.now();
req.paid_by = user.telegramid;
w[wid] = req;
Bot.setProperty("withdrawals", w, "json");

Api.sendMessage({ chat_id: req.userId, text: "✅ Your withdrawal of *" + req.amount + " TON* has been approved and processed. Please allow manual transfer time.", parse_mode: "Markdown" });
let approvalChannel = Bot.getProperty("approval_channel");
if (approvalChannel) Api.sendMessage({ chat_id: "@" + approvalChannel, text: "✅ Withdrawal paid: " + req.userName + " — " + req.amount + " TON" });
