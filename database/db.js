const { default: mongoose } = require("mongoose");

const connectToDb = async () =>{
    try{
        await mongoose.connect(
            "mongodb+srv://mohamedsuhaib7865:gySiysUAFxN7bh2i@cluster0.kh9eo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        );
        console.log("mongodb is connected ");

    }catch(e){
        console.error("connection error",e);
        process.exit(1);
    }
}
module.exports = connectToDb;