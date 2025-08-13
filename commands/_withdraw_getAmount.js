/*CMD
  command: /withdraw_getAmount
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

// command: withdraw_getAmount
let amt = parseFloat(message);
if (!amt || amt <= 0) return Api.sendMessage({ chat_id: user.telegramid, text: "Enter a valid amount." });

let minWithdraw = parseFloat(Bot.getProperty("min_withdraw") || 0.05);
let bal = Libs.ResourcesLib.userRes("balance");

if (amt < minWithdraw) return Api.sendMessage({ chat_id: user.telegramid, text: "Amount is less than minimum withdraw: " + minWithdraw });
if (amt > bal.value()) return Api.sendMessage({ chat_id: user.telegramid, text: "Insufficient balance." });

let w = Bot.getProperty("withdrawals", {});
let wid = "wd_" + new Date().getTime();
w[wid] = {
  id: wid,
  userId: user.telegramid,
  userName: user.first_name,
  address: User.getProperty("withdraw_address"),
  amount: amt,
  status: "pending",
  created_at: Date.now()
};
Bot.setProperty("withdrawals", w, "json");

Api.sendMessage({ chat_id: user.telegramid, text: "✅ Withdraw request created. Await approval." });

let approvalChannel = Bot.getProperty("approval_channel");
let admin = Bot.getProperty("admin_id");
let caption = "📤 *Withdrawal Request*\nUser: " + user.first_name + " (tg://user?id=" + user.telegramid + ")\nAmount: *" + amt + " TON*\nAddress: `" + User.getProperty("withdraw_address") + "`";
let kb = [
  [{ text: "✅ Approve", callback_data: "/approveWithdraw " + wid }],
  [{ text: "❌ Decline", callback_data: "/declineWithdraw " + wid }]
];

if (approvalChannel) {
  Api.sendMessage({ chat_id: "@" + approvalChannel, text: caption, parse_mode: "Markdown", reply_markup: { inline_keyboard: kb } });
} else {
  Api.sendMessage({ chat_id: admin, text: caption, parse_mode: "Markdown", reply_markup: { inline_keyboard: kb } });
}
