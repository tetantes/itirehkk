/*CMD
  command: joinCheckResult
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

// command: joinCheckResult
if (!options) return;

let checks = User.getProperty("join_check_list", []);
let idx = User.getProperty("join_check_index", 0);

let status = options.result && options.result.status ? options.result.status : "left";
User.setProperty("joined_chk_" + idx, (status === "member" || status === "administrator" || status === "creator"), "boolean");

idx++;
User.setProperty("join_check_index", idx, "integer");

if (idx < checks.length) {
  Api.getChatMember({ chat_id: "@" + checks[idx], user_id: user.telegramid, on_result: "joinCheckResult" });
  return;
}

// evaluate results
let allOk = true;
for (let i = 0; i < checks.length; i++) {
  if (!User.getProperty("joined_chk_" + i)) { allOk = false; break; }
}

// cleanup
User.setProperty("join_check_list", null);
User.setProperty("join_check_index", null);
for (let i = 0; i < checks.length; i++) { User.setProperty("joined_chk_" + i, null); }

if (allOk) {
  Bot.runCommand("/mainMenu");
} else {
  Api.sendMessage({ chat_id: user.telegramid, text: "*⚠️ You must join all required channels to use the bot.*\n\nReturn to /start and click 'I Joined' after joining.", parse_mode: "Markdown" });
}
