const bookModel = require("../model/bookModel");
const {readingTime} = require("../readingTime");
const userModel = require("../model/userModel");

const getAllBook = async (req, res)=>{
    try {
        const book = await bookModel.find()
        res.staus(200).send(book)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const createBook = async (req, res) => {
    const {title, description, isbn, body} = req.body;
    

    if(!title || !description || !isbn || !body){
        return res.status(500).send("Please input all fields!")
    }


    try{
        // const user = await userModel.findById(req.user.id)
        // console.log(user)
        const book = new bookModel({
            title: title,
            description: description,
            isbn: isbn,
            body: body,
            // user: user._id,
            readingTime: readingTime(body)
        })

        res.status(200).send({message:"book created successfully", book})
    }catch(error){
        res.status(400).send(error.message)
    }
}

module.exports = {getAllBook, createBook}