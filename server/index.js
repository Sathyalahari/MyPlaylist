const express = require('express');
// const { MongoClient } = require('mongodb');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const Video = require('./models/video');
const bodyParser = require('body-parser');

const CONNECTION_STRING = 
"mongodb+srv://admin:admin@cluster0.vrvbk5p.mongodb.net/myplaylistdb?retryWrites=true&w=majority";
const PORT = 3000;

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const connectDB = async () => {
    try {
        await mongoose.connect(CONNECTION_STRING);
        console.log("Connected to MongoDB");
        startServer();
    } catch (error) {
        console.error(error.message);
    }
};

const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

app.get('/', (req, res) => {
    res.send('Hello NODE API')
});

app.get('/tutorials', async (req,res)=>{
    try {
        const videos = await Video.find({});
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/tutorials/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        console.log(id);
        const tutorial = await Video.findById(id);
        res.status(200).json(tutorial);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

// create a video

app.post('/tutorials', async(req, res) => {
    try {
        console.log(req.body);
        const video = await Video.create(req.body)
        res.status(200).json(video);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// update a video
app.put('/tutorials/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const video = await Video.findByIdAndUpdate(id, req.body);
        // we cannot find any tutorial in database
        if(!video){
            return res.status(404).json({message: `cannot find any tutorial with ID ${id}`})
        }
        const updatedVideo = await Video.findById(id);
        res.status(200).json(updatedVideo);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete a video

app.delete('/tutorials/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const video = await Video.findByIdAndDelete(id);
        if(!video){
            return res.status(404).json({message: `cannot find any tutorial with ID ${id}`})
        }
        res.status(200).json(video);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


// Call the connectDB function to initiate the connection and start the server
connectDB();

