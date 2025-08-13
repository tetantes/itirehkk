/*CMD
  command: support_send
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

// command: support_send
if (!message) return Bot.sendMessage("Send your message.");
let admin = Bot.getProperty("admin_id");
Api.sendMessage({ chat_id: admin, text: "📩 Support message from " + user.first_name + " (tg://user?id=" + user.telegramid + "):\n\n" + message, parse_mode: "Markdown" });
Bot.sendMessage("✅ Your message was sent to support.");
