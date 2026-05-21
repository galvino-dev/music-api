const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5010;



/* =========================
   MYSQL CONNECTION
========================= */

const db = mysql.createConnection({

    host: "localhost",

    user: "root",

    password: "",

    database: "VNCHORD"

});



db.connect(function (error) {

    if (error) {

        console.log(error);

    } else {

        console.log("MySQL Connected!");
    }

});



/* =========================
   GET SONGS
========================= */

app.get("/songs", function (request, response) {

    const query = "SELECT * FROM songs";



    db.query(query, function (error, result) {

        if (error) {

            response.json({

                success: false

            });

        } else {

            response.json(result);
        }

    });

});



/* =========================
   ADD SONG
========================= */

app.post("/songs", function (request, response) {

    const title = request.body.title;

    const artist = request.body.artist;

    const chord = request.body.chord;



    const query =

        `
        INSERT INTO songs
        (title, artist, chord)

        VALUES (?, ?, ?)
        `;



    db.query(

        query,

        [title, artist, chord],

        function (error, result) {

            if (error) {

                response.json({

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

app.put("/songs/:id", function (request, response) {

    const id = request.params.id;

    const title = request.body.title;

    const artist = request.body.artist;

    const chord = request.body.chord;



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

        function (error, result) {

            if (error) {

                response.json({

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

app.delete("/songs/:id", function (request, response) {

    const id = request.params.id;



    const query =

        `
        DELETE FROM songs

        WHERE id = ?
        `;



    db.query(

        query,

        [id],

        function (error, result) {

            if (error) {

                response.json({

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

app.listen(PORT, function () {

    console.log(

        `Server berjalan di http://localhost:${PORT}`

    );

});