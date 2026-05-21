const express = require("express");

const cors = require("cors");

const mysql = require("mysql2");

require("dotenv").config();



const app = express();



/* =========================
   MIDDLEWARE
========================= */

app.use(cors());

app.use(express.json());



/* =========================
   PORT
========================= */

const PORT =
    process.env.PORT || 5010;



/* =========================
   MYSQL CONNECTION
========================= */

const db = mysql.createConnection({

    host:
        process.env.MYSQLHOST,

    user:
        process.env.MYSQLUSER,

    password:
        process.env.MYSQLPASSWORD,

    database:
        process.env.MYSQLDATABASE,

    port:
        process.env.MYSQLPORT

});



db.connect(function(error){

    if(error){

        console.log("MYSQL ERROR");

        console.log(error);

    } else {

        console.log(
            "MYSQL CONNECTED 🔥"
        );
    }

});



/* =========================
   HOME
========================= */

app.get("/", function(request, response){

    response.send(
        "VNChord API Running 🔥"
    );

});



/* =========================
   GET SONGS
========================= */

app.get("/songs", function(request, response){

    const query =
        "SELECT * FROM songs ORDER BY id DESC";



    db.query(

        query,

        function(error, result){

            if(error){

                response.status(500).json({

                    success: false,

                    message:
                        "Failed get songs"

                });

            } else {

                response.json(result);
            }

        }

    );

});



/* =========================
   ADD SONG
========================= */

app.post("/songs", function(request, response){

    const title =
        request.body.title;

    const artist =
        request.body.artist;

    const chord =
        request.body.chord;



    const query =

        `
        INSERT INTO songs
        (title, artist, chord)

        VALUES (?, ?, ?)
        `;



    db.query(

        query,

        [title, artist, chord],

        function(error, result){

            if(error){

                response.status(500).json({

                    success: false

                });

            } else {

                response.json({

                    success: true
                });

            }

        }

    );

});



/* =========================
   UPDATE SONG
========================= */

app.put("/songs/:id", function(request, response){

    const id =
        request.params.id;

    const title =
        request.body.title;

    const artist =
        request.body.artist;

    const chord =
        request.body.chord;



    const query =

        `
        UPDATE songs

        SET
        title = ?,
        artist = ?,
        chord = ?

        WHERE id = ?
        `;



    db.query(

        query,

        [title, artist, chord, id],

        function(error, result){

            if(error){

                response.status(500).json({

                    success: false

                });

            } else {

                response.json({

                    success: true
                });

            }

        }

    );

});



/* =========================
   DELETE SONG
========================= */

app.delete("/songs/:id", function(request, response){

    const id =
        request.params.id;



    const query =

        `
        DELETE FROM songs

        WHERE id = ?
        `;



    db.query(

        query,

        [id],

        function(error, result){

            if(error){

                response.status(500).json({

                    success: false

                });

            } else {

                response.json({

                    success: true
                });

            }

        }

    );

});



/* =========================
   START SERVER
========================= */

app.listen(PORT, function(){

    console.log(

        `SERVER RUNNING ON ${PORT}`

    );

});
