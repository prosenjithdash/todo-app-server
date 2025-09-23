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
    todo: {
            type: String,
            required: true
        },
    // apply enum for condition
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: true
    },
    isComplete: {
        type: Boolean,
        required:true
    }
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
      
      // 1. get all data from database with Mongoose
      app.get("/todos", async (req, res) => {
    // MONGO this find NOT NEED NOW COURSE OF WE ARE WORK WITH MONGOOSE
    // =>>>>>>
          //   const todos = await todosCollection.find({}).toArray();
          
         const todos = await Todo.find({});

          res.send(todos)
      });

      // 2. get single data from database with Mongoose
      app.get("/todo/:id", async (req, res) => {
          
          console.log(req.params)

          const todoId = req.params.id;
          const todo = await Todo.findById(todoId);
          res.send(todo)
      })


      // 3. post single data to database with Mongoose
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


// WHY WE ARE WORK WITH MONGOOSE
// Course of =>>>

// 1. Schema & Model
//    - Define structure of data (fields, types, required, default, enum, etc.)
//    - Helps to keep data consistent and validated

// 2. Priority & Validation
//    - Add conditions (required, minlength, maxlength, enum, match, type checking)
//    - Prevents wrong or invalid data from being saved in MongoDB

// 3. Easy Connect & Integration
//    - Simple connection with MongoDB Atlas or Local MongoDB
//    - Works smoothly with Express.js server

// 4. Short & Clean Code
//    - Built-in methods for CRUD (create, find, update, delete)
//    - Less code compared to native MongoDB driver
//    - Easy to handle relations (populate, references)

