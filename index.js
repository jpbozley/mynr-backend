const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
require("dotenv").config();
const { PORT, BACKEND_URL } = process.env;

//cors middleware
app.use(cors());

//middleware to give us access to req.body
app.use(express.json());

//checkups
app.get('/checkups', (req, res) => {
    let checkups = fs.readFileSync('./data/checkups.json')
    res.send(checkups)
});

app.post('/checkups', (req, res) => {
    const newCheckup = {
        date: req.body.date,
        dateNext: req.body.dateNext,
        reading: req.body.reading,
        lowerRange: req.body.lowerRange,
        upperRange: req.body.upperRange
    }
    fs.writeFileSync('./data/checkups.json', JSON.stringify(newCheckup));
    res.json(newCheckup)
}
)



//medications
app.get('/medications', (req, res) => {
    let medications = fs.readFileSync('./data/medications.json')
    res.send(medications)
});

app.post('/medications', (req, res) => {
    const newMedication = {
        name: req.body.name,
        dose: req.body.dose
    }
    fs.writeFileSync('./data/medications.json', JSON.stringify(newMedication));
    res.json(newMedication)
})

//schedule
app.get('/schedule', (req, res) => {
    let schedule = fs.readFileSync('./data/schedule.json')
    res.send(schedule)
})


app.post('/schedule', (req, res) => {
    const newSchedule = {
        Monday: req.body.Monday,
        Tuesday: req.body.Tuesday,
        Wednesday: req.body.Wednesday,
        Thursday: req.body.Thursday,
        Friday: req.body.Friday,
        Saturday: req.body.Saturday,
        Sunday: req.body.Sunday
    }
    fs.writeFileSync('./data/schedule.json', JSON.stringify(newSchedule));
    res.json(newSchedule)

}
)

//listener
app.listen(PORT, () => {
    console.log("We are live!")
})
