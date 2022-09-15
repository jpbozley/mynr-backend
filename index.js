const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
require("dotenv").config();
const { PORT, BACKEND_URL } = process.env;
const checkups = require('./data/checkups.json')
const medications = require('./data/medications.json')
const schedule = require('./data/schedule.json')

//cors middleware
app.use(cors());

//middleware to give us access to req.body
app.use(express.json());

//checkups
app.get('/checkups', (req, res) => {
    res.send(checkups)
});

app.post('/checkups', (req, res) => {
    const newCheckup = {
        date: req.body.date,
        reading: req.body.reading,
        lowerRange: req.body.lowerRange,
        upperRange: req.body.upperRange
    }
    fs.writeFileSync('./data/checkups.json', JSON.stringify(newCheckup));

}
)



//medications
app.get('/medications', (req, res) => {
    res.send(medications)
});


//schedule
app.get('/schedule', (req, res) => {
    res.send(schedule)
})
//listener
app.listen(PORT, () => {
    console.log("We are live!")
})