//npm install express mongoose cors path

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname)));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Compass local connection (adjust if needed)
mongoose.connect('mongodb://127.0.0.1:27017/musical').then(() => console.log('MongoDB connected')).catch(err => console.error(err));

// Schema and model
const songSchema = new mongoose.Schema({
    songname: String,
    film: String,
    music_director: String,
    singer: String,
    actor: String,
    actress: String
});
const Song = mongoose.model('Song', songSchema);

// Sample data route
app.get('/init', async (req, res) => {
    await Song.deleteMany({});
    await Song.insertMany([
        {
            songname: "Tum Hi Ho", film: "Aashiqui 2", music_director: "Mithoon",
            singer: "Arijit Singh", actor: "Aditya Roy Kapur", actress: "Shraddha Kapoor"
        },
        {
            songname: "Kesariya", film: "Brahmastra", music_director: "Pritam",
            singer: "Arijit Singh", actor: "Ranbir Kapoor", actress: "Alia Bhatt"
        },
        {
            songname: "Channa Mereya", film: "Ae Dil Hai Mushkil", music_director: "Pritam",
            singer: "Arijit Singh", actor: "Ranbir Kapoor", actress: "Anushka Sharma"
        },
        {
            songname: "Gerua", film: "Dilwale", music_director: "Pritam",
            singer: "Arijit Singh", actor: "Shah Rukh Khan", actress: "Kajol"
        },
        {
            songname: "Raabta", film: "Agent Vinod", music_director: "Pritam",
            singer: "Arijit Singh", actor: "Saif Ali Khan", actress: "Kareena Kapoor"
        }
    ]);
    res.json({ message: 'Initialized sample data' });
});

// API routes
app.get('/songs', async (req, res) => {
    const songs = await Song.find();
    const count = await Song.countDocuments();
    res.json({ count, songs });
});

app.post('/songs', async (req, res) => {
    const song = new Song(req.body);
    await song.save();
    res.json(song);
});

app.delete('/songs/:id', async (req, res) => {
    await Song.findByIdAndDelete(req.params.id);
    res.json({ message: 'Song deleted' });
});

app.get('/songs/director/:director', async (req, res) => {
    const songs = await Song.find({ music_director: req.params.director });
    res.json(songs);
});

app.get('/songs/director/:director/singer/:singer', async (req, res) => {
    const songs = await Song.find({ music_director: req.params.director, singer: req.params.singer });
    res.json(songs);
});

app.get('/songs/singer/:singer/film/:film', async (req, res) => {
    const songs = await Song.find({ singer: req.params.singer, film: req.params.film });
    res.json(songs);
});

app.put('/songs/updateByName/:name', async (req, res) => {
    const updated = await Song.findOneAndUpdate(
        { songname: req.params.name },
        { $set: req.body },
        { new: true }
    );
    res.json(updated);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
