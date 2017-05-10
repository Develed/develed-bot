// Description:
//   Script per inviare testo al DeveLED!
//
// Commands:
//   hubot scrivi <text> - Invia a DeveLED il testo specificato.
//
// Notes:
//   <optional notes required for the script>
//
// Author:
//   batt

module.exports = function (robot) {
  var room = 'C4AM1K414'

  var fs = require('fs');
  var grpc = require('grpc');
  var srv = grpc.load("../develed/services/services.proto").services;

  var textd = new srv.Textd('localhost:20001', grpc.credentials.createInsecure());

  var frasi_url = "https://dl.dropboxusercontent.com/s/nx7icory52foizv/lines.txt"
  var CronJob = require('cron').CronJob;
  var job = new CronJob('00 03 11,16 * * 1-5', function () {
    robot.http(frasi_url).get()(function (err, resp, body) {
      if (err) {
        robot.messageRoom(room, err);
      }
      else {
        var frasi = body.split('\n');
        var rnd = Math.floor(Math.random() * frasi.length);
        robot.messageRoom(room, frasi[rnd]);
      }
    });
  }, function () {
    /* This function is executed when the job stops */
  },
    true, /* Start the job right now */
    "Europe/Rome" /* Time zone of this job. */
  );
  job.start();

  var frasi = [
    'Che cosa accadrebbe se il male si formerebbe dentro di te?',
    'Un virus micidiale che ti fa stare proprio una cosa malissimo...',
    'Il peggio è tornato...',
    'Esistono storie che non esistono.',
    'Mio padre dice che diventerò un ottimo ballerina!',
    "Io voglio fare l'usciere!",
    "Ma tu sei Billy Ballo: il miglior ballerino del mondo!",
    "Mannaggia, mannaggia, mannaggia...",
    "Vedo la gente scema.. Tu sei il sesto, oggi!",
    "Voglio divenire uno scienziato!",
  ]

  robot.respond(/mostra (.*)/i, function (res) {
    fs.readFile('/home/root/images/' + res.match[1].trim() + '.png', 'binary', function (err, original_data) {
      fs.writeFile('/home/root/images/' + res.match[1].trim() + '.png', original_data, 'binary', function (err) { });
      var base64Image = new Buffer(original_data, 'binary').toString('base64');

      var writerStream = fs.createWriteStream('/home/root/ledfifo');
      writerStream.write(base64Image);
      writerStream.end();
      console.log("File streamed!");

      fs.writeFile('/tmp/mostra.bin', base64Image, 'binary', function (err) {
        console.log(err);
      });
    });
    res.reply("Show image: " + res.match[1].trim());
  });

  robot.respond(/scrivi (.*)/i, function (res) {
    var msg = { text: res.match[1] };

    textd.write(msg, function (err, resp) {
      if (err) {
        console.log(err);
      } else {
        robot.messageRoom(room, res.message.user.name + ": " + res.match[1]);
        res.reply("Write: " + res.match[1]);
      }
    });
  });

  robot.respond(/lista/i, function (res) {
    const testFolder = '/home/root/images/';
    const fs = require('fs');
    var ss = ""
    fs.readdir(testFolder, function (err, files) {
      files.forEach(file, function (file) {
        ss = ss + file + "\n"
        console.log(file);
      });
    })
    res.reply(res.random(frasi));
  });

  robot.respond(/pug bomb/i, function (res) {
    res.reply(res.random(frasi));
  });

  robot.respond(/pug me/i, function (res) {
    res.reply(res.random(frasi));
  });

  robot.respond(/ciao/i, function (res) {
    res.reply(res.random(frasi));
  });

  robot.respond(/dici (.*)/i, function (res) {
    if (res.message.user.name == "batt") {
      robot.messageRoom(room, res.match[1].trim());
    }
  });
};
