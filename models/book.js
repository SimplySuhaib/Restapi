const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,"book title is required"],
        trim: true,
        maxLength: [100,"book title cannot be more than 100 char"],

    },
    author: {
        type: String,
        required: [true,"author name is required"],
        trim: true,
    },
    year: {
        type: Number,
        required: [true,"publication year is required"],
        trim: true,
        min: [1000,"year must be atleast 1000"],
        max: [new Date().getFullYear(),"year cannot be in future"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model("Book",BookSchema);