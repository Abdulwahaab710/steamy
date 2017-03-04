var endpointsAPI  = function(app, database, rootDir) {

    var self = this;

    var request=require('request');


    self.activateEndpoints = function() {
             
        app.get('/', function (req, res) {
            res.sendFile(rootDir + '/Public/index.html');
        });   

        app.get('/userLastPlayed/:username', function(req, res) {
            console.log(req.params);
            if(! req.params.username) {
                return res.status(400).send();
            }
            /*
            getSteamIDbyUserName(req.params.steamUserName, function(err, info) {
                //callback hell?
            });
            */   

            getSteamIDbyUserName(req.params.username, res);        
        });


        function getSteamIDbyUserName(steamUserName, res) {
            request.get('http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=E3FE0656FDE35ACAE60198177A24CD49&vanityurl=' + steamUserName, function(err, innerRes, body){
                if(err) {
                    console.log("err!");
                    return res.status(400).send();
                }
                if(innerRes.statusCode !== 200 ) {
                   console.log("status not 200!");
                    return innerRes.status(503).send();
                }

                console.log(body);

                console.log(typeof(body));
                body = JSON.parse(body);
                console.log(body);

                getAllGames(body.response.steamid, res);
            });
        }


        function getAllGames(steamID, res) {
            //http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=E3FE0656FDE35ACAE60198177A24CD49&steamid=

            //

            //http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=E3FE0656FDE35ACAE60198177A24CD49&steamid=
            request.get('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=E3FE0656FDE35ACAE60198177A24CD49&steamids=' + steamID + '&format=json', function(err, innerRes, body){
                if(err) {
                    console.log("err!");
                    return res.status(400).send();
                }
                if(innerRes.statusCode !== 200 ) {
                   console.log("status not 200!");
                    return innerRes.status(503).send();
                }

                console.log(body);

                console.log(typeof(body));
                body = JSON.parse(body);
                console.log(body);

                return res.status(200).send(body);
            });
        }


        http://store.steampowered.com/api/appdetails?appids=252950





        //consider putting these helper functions into a module.
        
        function registerUser(res, req) {
            var username = req.body.username;
            var password = req.body.password;
            database.insertOrUpdate("INSERT INTO User (Username, Password) VALUES (?, ?)", [username, passwordHash.generate(password)], function(err, userInsertID) {
                if(err) {
                    res.status(503).send("Database insert failure.");
                } else {
                    //here we pass in an object containing user information to serialize to their session.
                    //in practice, a database call with all pertinent user info would be used here instead.

                    getNewUserInfo(username, req, res, serializeNewUser);
                } 
            });  
        }

        
        function getNewUserInfo(username, req, res, callback) {
            database.fetchFirst("SELECT * FROM User WHERE User.Username = ?", [username], function (userRecord) {
                return callback(userRecord, req, res);
            });
        }

        function serializeNewUser(userRecord, req, res) {
            req.login(userRecord, function(err) {
                if(err) {
                    //unknown error, display error to console and die.
                    console.log("Fatal error in login serialization: ");
                    throw err;
                } else {
                    //success, user is serialized.
                    res.redirect('/protected');
                }
            });
        }

    };
};

//allow this entire file  to be exported to application.js 
module.exports = endpointsAPI;
