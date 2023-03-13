const express = require("express");
const got = require("got");
const dotenv = require("dotenv");
const fs = require("fs")
dotenv.config();
const app = express();

//grab data every 4 hours
setInterval( () => {
    console.log("grabbing the api's json")
    got(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
    .then(response =>{
        const norris = JSON.parse(response.body);
        fs.writeFileSync("data.json", JSON.stringify(norris));
    })}, 14400000)

//when the site is loaded return the stored json
app.get(`/`, function (req, res, next){
    var data = require("./data.json")
    return res.json(data);
});

app.listen(process.env.PORT, () => {
    console.log(`api online and running on port ${process.env.PORT}`)
    //grab api data on startup
    console.log("grabbing the api's json")
    got(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
    .then(response =>{
        const norris = JSON.parse(response.body);
        fs.writeFileSync("data.json", JSON.stringify(norris));
    }, 14400000)
})