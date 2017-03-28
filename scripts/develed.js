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

  var frasi_url = "https://dl.dropboxusercontent.com/s/nx7icory52foizv/lines.txt"
  var CronJob = require('cron').CronJob;
  var job = new CronJob('00 03 11,16 * * 1-5', function() {
    robot.http(frasi_url).get()(function(err, resp, body) {
        if (err) {
          robot.messageRoom("embeddedisbetter", err);
        }
        else {
          var frasi = body.split('\n');
          var rnd = Math.floor(Math.random()*frasi.length);
          robot.messageRoom("embeddedisbetter", frasi[rnd]);
        }
      });
    }, function () {
      /* This function is executed when the job stops */
    },
    true, /* Start the job right now */
    "Europe/Rome" /* Time zone of this job. */
  );
  job.start();

  robot.respond(/scrivi (.*)/i, function (res) {
    var msg = res.match[1].trim()
    res.reply('Ok ' + res.message.user.name + ', invio "' + msg + '" a DeveLED!');
  });


  robot.respond(/http (.*)/i, function (res) {
    var url = res.match[1].trim()
    robot.http(url)
      .get()(function(err, resp, body) {
        if (err) {
          res.reply(err);
        }
        else
          res.reply(body);
      });
  });


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
      robot.messageRoom("embeddedisbetter", res.match[1].trim());
    }
  });
};