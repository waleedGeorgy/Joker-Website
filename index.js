import bodyParser from "body-parser";
import axios from "axios";
import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

var app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const API_URL = "https://v2.jokeapi.dev/joke/"

app.use(express.static(path.join(__dirname + "/public")));
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/random-joke", async(req, res)=>{
    try{
        var content = await axios.get(API_URL + "Any");
        res.render("index.ejs", {jokes: content.data});
    }
    catch(error){
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {error: error.message,});
    }

});

app.post("/query-joke", async(req, res)=>{
    var jokeCategory = req.body.jokeCategory;
    var jokeType = req.body.jokeType;
    try{
        var content = await axios.get(API_URL + jokeCategory + "?type=" + jokeType);
        res.render("index.ejs", {queryJokes: content.data});
    }
    catch(error){
        console.log("Failed to make request: ", error.message);
        res.render("index.ejs", {error: error.message,});
    }
});

app.listen(port, ()=>{
    console.log(`Sever listening to port ${port}`);
});