/*CMD
  command: /leaderboard
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

// command: leaderboard
let userList = Bot.getProperty("user_list", []);
let leaderboard = [];
for (let i=0;i<userList.length;i++){
  let uid = userList[i];
  let bal = Libs.ResourcesLib.anotherUserRes(uid, "balance").value();
  leaderboard.push({ uid: uid, bal: bal });
}
leaderboard.sort((a,b)=>b.bal - a.bal);

let text = "*🏆 Leaderboard (by balance)*\n";
for (let i=0;i<Math.min(10, leaderboard.length); i++){
  let row = leaderboard[i];
  text += (i+1)+". <a href='tg://user?id="+row.uid+"'>User</a> — " + row.bal.toFixed(6) + " TON\n";
}
Api.sendMessage({ chat_id: user.telegramid, text: text, parse_mode: "Markdown" });
