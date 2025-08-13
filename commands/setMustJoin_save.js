/*CMD
  command: setMustJoin_save
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// command: setMustJoin_save
let txt = message.trim();
if (txt.toLowerCase() === "none") {
  Bot.setProperty("mustjoin1", null);
  Bot.setProperty("mustjoin2", null);
  Bot.setProperty("mustjoin3", null);
  Bot.sendMessage("✅ Cleared must-join channels.");
  Bot.runCommand("/admin");
  return;
}
let parts = txt.split(",");
for (let i=0;i<3;i++){
  Bot.setProperty("mustjoin"+(i+1), parts[i] ? parts[i].trim().replace("@","") : null, "string");
}
Bot.sendMessage("✅ Must-join channels updated.");
Bot.runCommand("/admin");
