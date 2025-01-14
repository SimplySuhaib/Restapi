const Book = require("../models/book");
const getAllBook = async (req,res) => {
    try{
        const allBook = await Book.find({});
        if(allBook?.length > 0){
            res.status(200).json({
                success: true,
                message: "List of Book fetched succesfully",
                data: allBook,
        });
        } else{
            res.status(404).json({
                success: false,
                message: "No book found in collection",
            });
        }
    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
const getSingleBookById = async (req,res) => {
    try{
        const singleBook = await Book.findById(req.params.id);
        if(singleBook) {
            res.status(200).json({ 
                success: true,
                message: "Book fetched succesfully",
                data: singleBook,
           });
        } else{
             res.status(404).json({
                success: false,
                message: "Book doesn't exist",
            });
        }
    }  catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
const addNewBook = async (req, res) => {
    try {
        console.log(req.body);
             // Ensure the body contains a title, author, and year
      const { title, author, year } = req.body;
      
      // Check if title, author, and year are present
      if (!title || !author || !year) {
        return res.status(400).json({
          success: false,
          message: "Title, author, and year are required fields"
        });
      }
  
      const newBookFromData = req.body;
      const newlyCreatedBook = await Book.create(newBookFromData);
  
      if (newlyCreatedBook) {
        res.status(201).json({
          success: true,
          message: "Book added successfully",
          data: newlyCreatedBook,
        });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
  
const updateBook = async (req,res) => {
    try{
        const updatedBookFromData = req.body;
        const updateBook = await Book.findByIdAndUpdate(req.params.id , updatedBookFromData ,{new: true});
        if(updateBook) {
            res.status(200).json({ 
                success: true,
                message: "Book updated succesfully",
                data: updatedBookFromData,
           });
        } else{
             res.status(404).json({
                success: false,
                message: "update failure",
            });
        }
    }  catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
const deleteBook = async (req,res) => {
    try{
        const deleteBook = await Book.findByIdAndDelete(req.params.id);
        if(deleteBook) {
            res.status(200).json({ 
                success: true,
                message: "Book deleted succesfully",
                data: deleteBook,
           });
        } else{
             res.status(404).json({
                success: false,
                message: "no book found in collection",
            });
        }
    }  catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports ={
    getAllBook,
    getSingleBookById,
    addNewBook,
    updateBook,
    deleteBook
};