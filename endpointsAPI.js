var endpointsAPI  = function(app, database, rootDir) {

    var self = this;

    var request=require('request');

    var fs = require('fs'), ini = require('ini');

    var config = ini.parse(fs.readFileSync('./Config/config.ini', 'utf-8'));



    self.activateEndpoints = function() {
             
        app.get('/', function (req, res) {
          res.sendFile('index.html')
        });   

        app.get('/userLastPlayed/', function(req, res) {
            console.log(req.query);
            if(! req.query.username) {
                return res.status(400).send();
            }
            /*
            getSteamIDbyUserName(req.params.steamUserName, function(err, info) {
                //callback hell?
            });
            */   

            getSteamIDbyUserName(req.query.username, res);
        });


        function getSteamIDbyUserName(steamUserName, res) {
            request.get('http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=' + config.steamAPI.key + '&vanityurl=' + steamUserName, function(err, innerRes, body){
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
            //important endpoints

            //http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=' + config.steamAPI.key + '&steamid=

            //http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + config.steamAPI.key + '&steamid=

            //http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + config.steamAPI.key + '&steamids=



            request.get('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + config.steamAPI.key + '&steamid=' + steamID + '&format=json', function(err, innerRes, body){
                if(err) {
                    console.log("err!");
                    return res.status(400).send();
                }
                if(innerRes.statusCode !== 200 ) {
                   console.log("service not available!");
                    return res.status(503).send();
                }

                body = JSON.parse(body);
                var userGames = body.response.games;

                userGames.sort(function(a, b) {
                    return parseInt(a.appid) - parseInt(b.appid);
                });

                fetchUserGames(res, userGames);
            });
        }

        //will take in the user's list of games and times and match them with the game's name.
        //return HTTP 200 to client
        function fetchUserGames(res, userGames) {
            var sql = formatGameNameSQL(userGames);

            database.fetchAll(sql, extractGameIDs(userGames), function(data) {
                for(var i = 0; i < data.length; i++) {
                    data[i].time = userGames[i].playtime_forever;
                }
                return res.status(200).send(data);
            });
        }

        //formatting for SQL statement, to prevent injection
        function formatGameNameSQL(userGames) {
            var sql = "SELECT * FROM Games WHERE SteamID = ?";

            for(var i = 0; i < userGames.length; i++) {
                //make sure not last iteration
                if(i != userGames.length - 1) {
                    sql += " OR SteamID = ?";
                }
            }
            return sql;
        }

        //helper function for SQL formatting function
        function extractGameIDs(userGames) {
            var gameIDs = [];
            for(var i = 0; i < userGames.length; i++) {
                gameIDs.push(userGames[i].appid);
            }
            console.log("gameIDs: ", gameIDs);
            return gameIDs;
        }



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
