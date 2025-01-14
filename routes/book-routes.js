const express = require("express");
const router =  express.Router();

const {
    getAllBook,
    getSingleBookById,
    addNewBook,
    updateBook,
    deleteBook,
} = require("../controlers/books-controler");


// routes for books

router.get("/get",getAllBook);
router.get("/get/:id",getSingleBookById);
router.post("/add",addNewBook);
router.put("/update/:id",updateBook);
router.delete("/delete/:id",deleteBook);


module.exports = router;