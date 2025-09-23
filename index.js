// Here work with Mongoose and just test connect server to mongoDB

// ==>>>>>

const express = require('express')
const app = express()
// mongooseJS
const mongoose = require('mongoose');
const port = 8000


// Mongoose Schema
// Schema (BluePrint) => Model (ProtoType) => Real Data

const todoSchema = new mongoose.Schema({
    todo: String,
    priority: {
        type: String,
        enum: ['low','medium','high'],
    },
});


// Mongoose Model
const Todo = mongoose.model('Todo', todoSchema);


// add midleware
app.use(express.json())



const { MongoClient, ServerApiVersion } = require('mongodb');

// Database Access UserName and Password
const uri = "mongodb+srv://todo_user:wS4qwYGbfyzNdDSP@cluster0.kybpity.mongodb.net/todoDB?retryWrites=true&w=majority&appName=Cluster0";


// Create a MongoClient with a MongoClientOptions object to set the Stable API version

// MONGO CLIENT NOT NEED NOW COURSE OF WE ARE WORK WITH MONGOOSE
// =>>>>>>
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    
    // MONGO CLIENT.CONNECT() NOT NEED NOW COURSE OF WE ARE WORK WITH MONGOOSE
    // =>>>>>>
    //   await client.connect();
      
      // HERE NEED MONGOOSE CONNECT
      await mongoose.connect(uri);

    // Send a ping to confirm a successful connection
    //   await client.db("admin").command({ ping: 1 });
      
      
    // MONGO database collection NOT NEED NOW COURSE OF WE ARE WORK WITH MONGOOSE
    // =>>>>>>
    // database collection
    //   const todosCollection = client.db('todoDB').collection("todos")

      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      
      // 1. get data from database
      app.get("/todos", async (req, res) => {
    // MONGO this find NOT NEED NOW COURSE OF WE ARE WORK WITH MONGOOSE
    // =>>>>>>
          //   const todos = await todosCollection.find({}).toArray();
          
         const todos = await Todo.find({});

          res.send(todos)
      });

      // 2. post data to database
      app.post("/todo", async (req, res) => {
          
          const todoData = req.body;

        // options : 01
        //   const todo = new Todo(todoData)
        //   todo.save();

        // options : 02
        // alternative of save()
          const todo = await Todo.create(todoData)



          console.log(todo)
    // MONGO this insertOne NOT NEED NOW COURSE OF WE ARE WORK WITH MONGOOSE
    // =>>>>>>
        //   const todo = await todosCollection.insertOne(todoData)
          res.send(todo)
      });


  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// main route
      app.get('/', (req, res) => {
          res.send('Hello World!')
      });




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
