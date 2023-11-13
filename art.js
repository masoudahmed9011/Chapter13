const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const jsonPath = path.join(__dirname, 'paintings.json');

let paintings;
fs.readFile(jsonPath, (err,data) => {
    if (err)
        console.log('Unable to read json data file');
    else 
    paintings = JSON.parse(data);
});



let port = 8080;
app.listen(port, () => {
    console.log("Server running at port= " + port);
});



app.get('/', (req,resp) => {resp.json(paintings)});
app.get('/:id', (req, resp) => {
    const idToFind = req.params.id;
    const matches = paintings.filter(obj => idToFind == obj.paintingID);
    resp.json(matches);
});

app.get('/gallery/:id', (req, resp) => {
    const idToFind = req.params.id;
    const matches = paintings.filter(obj => idToFind == obj.gallery.galleryID );
resp.json(matches);    
});

app.get('/artist/:id', (req,resp) => {
    const idToFind = req.params.id;
    const matches = paintings.filter(obj => idToFind == obj.artist.artistID);
    resp.json(matches);
});

app.get('/year/:min/:max', (req, resp) => {
     
    const min = req.params.min;
    const max = req.params.max;
    const matches = paintings.filter(obj => min <= obj.yearOfWork && max >= obj.yearOfWork);
    resp.json(matches);
});