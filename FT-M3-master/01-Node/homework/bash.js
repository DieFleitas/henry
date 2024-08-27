const commands = require("./commands/index");

process.stdout.write("prompt > ");

process.stdin.on("data", function (data) {
  var dataArr = data.toString().trim().split(" ");
  var cmd = dataArr.shift();
  var args = dataArr;

  if (typeof commands[cmd] === "function") {
    commands[cmd](args);
  } else {
    process.stdout.write("\ncomando no encontrado!");
    process.stdout.write("nprompt > ");
  }
});
