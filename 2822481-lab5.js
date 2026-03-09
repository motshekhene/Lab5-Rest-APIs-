const express=require('express');
const app=express();
const PORT=3000;

app.use(express.json());



let books = [];
// Your routes here

app.get('/whoami',(req,res)=>{

    const student={
        studentNumber:"2822481"
    }

    //res.send(student);
    res.status(200).send(student);
});

app.get('/books',(req,res)=>{
    res.send(books);
});


app.get('books/:id',(res,req)=>{
    const idBook=req.params.id;
    const book=books.find(b=>b.id===idBook);

    if(!book){
        return res.status(404).json({error:"Book not found"});
    }
    res.status(200).json(book);
    
})





app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



