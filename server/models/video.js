const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    id: String,
    title: String,
    url: String,
    description: String
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;

