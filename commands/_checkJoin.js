/*CMD
  command: /checkJoin
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

// command: checkJoin
// start sequential checks for required channels
let must1 = Bot.getProperty("mustjoin1");
let must2 = Bot.getProperty("mustjoin2");
let must3 = Bot.getProperty("mustjoin3");
let checks = [];

if (must1) checks.push(must1);
if (must2) checks.push(must2);
if (must3) checks.push(must3);

if (checks.length === 0) {
  Bot.runCommand("/mainMenu");
  return;
}

User.setProperty("join_check_list", checks, "json");
User.setProperty("join_check_index", 0, "integer");

Api.getChatMember({ chat_id: "@" + checks[0], user_id: user.telegramid, on_result: "joinCheckResult" });
