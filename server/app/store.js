const loggedInVoluntarieesTokens = [];

exports.registerVolunteerClientToken = function(token) {
	loggedInVoluntarieesTokens.push(token);
	console.log("Added volunteer token " + token);
}

exports.getRegisteredVolunteerClientsToken = function () {
	return new Array(loggedInVoluntarieesTokens);
}

// exports.store = {registerVolunteerClientToken, getRegisteredVolunteerClientsToken};