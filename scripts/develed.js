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
    res.reply('Ok ' + res.message.user.name + ', invio "' + msg + '" a DeveLED!');
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

  robot.hear(/fernandello/i, function (res) {
    res.send("Se ordinate al TuttoBene posso aiutarvi io!:tm:");
  });


/*
  robot.respond(/analizza (.*)/i, function (res) {
    var url = res.match[1].trim()
    robot.http("http://" + url)
    	.get() function (err, res, body) {
	    	if err
	    		res.reply "Mi spiace, ma c'è stato un errore: #{err}"
	    		return
	    	
	    	res.reply('Ok, ecco quello che ho preso:\n ' + body)
	    }
  });
*/

};