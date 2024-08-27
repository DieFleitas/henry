const fs = require("fs");
const request = require("request");

function pwd() {
  process.stdout.write(process.cwd());
  process.stdout.write("nprompt > ");
}

function date() {
  process.stdout.write(Date());
  process.stdout.write("nprompt > ");
}

function ls() {
  fs.readdir(process.cwd(), "utf8", (error, data) => {
    if (error) {
      console.log(error);
    } else {
      var output = data.reduce((prevValue, currValue) => {
        return prevValue + "\n " + currValue + "\n ";
      }, "");
      process.stdout.write(output);
      process.stdout.write("nprompt > ");
    }
  });
}

function echo(arg) {
  process.stdout.write(arg.join(" "));
}

function cat(fileName) {
  if (!fileName[0]) {
    process.stdout.write("Not Found");
    process.stdout.write("nprompt > ");

    return;
  }

  fileName = fileName[0];
  fs.readFile("./" + fileName, "utf8", function (error, data) {
    if (error) {
      console.log(error);
    } else {
      process.stdout.write(data);
      process.stdout.write("nprompt > ");
    }
  });
}

function head(fileName) {
  if (!fileName[0]) {
    process.stdout.write("Not Found");
    process.stdout.write("nprompt > ");

    return;
  }

  fileName = fileName[0];
  fs.readFile("./" + fileName, function (error, data) {
    if (error) {
      console.log(error);
    } else {
      var lineas = data.toString().split("\n");
      var primerasDiez = lineas.slice(0, 10);
      var output = primerasDiez.join("\n");
      process.stdout.write(output);
      process.stdout.write("nprompt > ");
    }
  });
}

function tail(fileName) {
  if (!fileName[0]) {
    process.stdout.write("Not Found");
    process.stdout.write("nprompt > ");

    return;
  }

  fileName = fileName[0];
  fs.readFile("./" + fileName, function (error, data) {
    if (error) {
      console.log(error);
    } else {
      var lineas = data.toString().split("\n");
      var ultimasDiez = lineas.slice(-10);
      var output = ultimasDiez.join("\n");
      process.stdout.write(output);
      process.stdout.write("nprompt > ");
    }
  });
}

function curl(url) {
  if (!url[0]) {
    process.stdout.write("Not Found");
    process.stdout.write("nprompt > ");

    return;
  }

  url = url[0];
  request(url, function (error, response, body) {
    if (error) {
      console.log(error);
    } else {
      process.stdout.write(body);
      process.stdout.write("\nprompt > ");
    }
  });
}

module.exports = {
  date,
  pwd,
  ls,
  echo,
  cat,
  head,
  tail,
  curl,
};
