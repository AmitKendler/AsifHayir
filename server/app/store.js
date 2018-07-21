const loggedInVoluntarieesTokens = [];

let registerVolunteerClientToken = function(token) {
	loggedInVoluntarieesTokens.push(token);
	console.log("Added volunteer token " + token);
}

let getRegisteredVolunteerClientsToken = function () {
	return new Array(loggedInVoluntarieesTokens);
}

exports.store = {registerVolunteerClientToken, getRegisteredVolunteerClientsToken};