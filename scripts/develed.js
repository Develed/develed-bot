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

  robot.respond(/scrivi (.*)/i, function (res) {
    var msg = res.match[1].trim()
    res.reply('Ok ' + res.message.user + ', invio "' + msg + '" a DeveLED!');
  });

};