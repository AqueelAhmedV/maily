var sqlite3 = require("sqlite3").verbose();
const path = require("path")

const DBSOURCE = path.resolve(__dirname,`./db.sqlite`);

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message);
        throw err;
    } else {
        console.log("Connected to the SQLite database.");
        db.run(
            `CREATE TABLE clients (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name text, 
                email text UNIQUE, 
                CONSTRAINT email_unique UNIQUE (email)
            )`,
            (err) => {
                if (err) {
                    //console.log(err)
                    console.error("clients table already exists");
                } else {
                    console.log("clients Table created");
                }
            }
        );
    }
});

[
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@mail.com",
    },
    {
      id: 2,
      name: "Jane Eyre",
      email: "jane@mail.com",
    },
    {
      id: 3,
      name: "Jack",
      email: "jack@example.com",
    },
    {
      id: 4,
      name: "Test",
      email: "test.aqueel.v@gmail.com"
    }
  ].forEach(p => db.all("SELECT * from clients",(err, data) => {
    if(err) {
      return console.log(err)
    } else {
        if( data.length === 0 ) {
            console.log('clients initialised')
            db.run('INSERT INTO clients (name, email) VALUES (?,?)', [p.name, p.email], (err) => {
                console.log(err)
            })
        }
    }
  })
  )
module.exports = db;