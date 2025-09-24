// Here work with Mongoose and Applied GET,POST,UPDATE & DELETE DATA FROM DATABASE

// ==>>>>>

// ^ Require the express
const express = require('express')

// ^ express function call to app;
const app = express()
// mongooseJS

// ^ require the mongoose
const mongoose = require('mongoose');

// ^ define the port (ex: http://localhost:8000)
const port = 8000


// ====>>>
// ---------->>>
// Mongoose Schema
// Schema (BluePrint) => Model (ProtoType) => Real Data


// ^ define Todo schema

// 🔹 Why We are Use Schema in Mongoose?
// ---> 1. Structure → Defines blueprint of data (fields & types).

// ---> 2. Validation → Ensures correct data (required, enum, min/max).

// ---> 3. Default Values → Auto set fields (like createdAt).

// ---> 4. Methods & Middleware → Add custom functions & hooks.

// ---> 5. Relationships → Connect collections (User ↔ Todo).

// ^ follow mongoose website: https://mongoosejs.com/docs/index.html
// TODO SCHEMA
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


// define User Schema
// USER SCHEMA
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required:true,
    }
})
// ---------->>>

// ====>>>

// ---------->>>
// Mongoose Model


// Why We Use Model in Mongoose?

// ---> 1. Bridge → Model connects Schema with the actual MongoDB collection.

// ---> 2. CRUD Operations → Lets you create, read, update, delete documents easily.

// ---> 3. Reuse → Once a model is defined, you can use it anywhere in your app.

// ---> 4. Validation & Rules Applied → Every time you use the model, schema rules auto-apply.

// TODO MODEL
const Todo = mongoose.model('Todo', todoSchema);


// USER MODEL
const User = mongoose.model('User', userSchema)

// ---------->>>

// add midleware

// what's the middleware? app.use(express.json())

// => Middleware (short)

// ---> 1. Middleware = function that runs before routes.

// ---> 2. Used for: parse, check, modify request/response.

// 🔹 app.use(express.json())

// ---> 1. It’s a built-in middleware.

// ---> 2. It converts JSON body → JavaScript object so we can use req.body.

app.use(express.json())


// Require mongoDB
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
    
    //===>>>
    // ---------->>>
    // GET, POST, UPDATE, & DELATE DATA FOR TODOS
      
    // 1. get all TODOS data from database with Mongoose
      app.get("/todos", async (req, res) => {
    // MONGO this find NOT NEED NOW COURSE OF WE ARE WORK WITH MONGOOSE
    // =>>>>>>
          //  const todos = await todosCollection.find({}).toArray();
          
         const todos = await Todo.find({});

          res.send(todos)
      });

    // 2. get single TODO data from database with Mongoose
      app.get("/todo/:id", async (req, res) => {
          
          console.log(req.params)

          const todoId = req.params.id;

          // findById just work  MongoDB Object Id But findOne support any id , ex: fineOne({-id: todoId})
          const todo = await Todo.findById(todoId);
          res.send(todo)
      })


    // 3. post single TODO data to database with Mongoose
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

    // 4. update TODO data from database with Mongoose
      
      // Put => If not exist then auto create
      // Patch => Already exist and then update
      
      // findByIdAndUpdate() => It's work detect just match id and update
      // updateOne() => It's work with detect any think match

      app.patch('/todo/:id', async (req, res) => {
          const todoId = req.params.id;
          const updatedData = req.body;

          const updateTodo = await Todo.findByIdAndUpdate(todoId, updatedData, {
              new:true
          })
          
          res.send(updateTodo)

      })

      // 5. Delate TODO data from database with Mongoose
      app.delete("/todo/:id", async (req, res ) => {
          const todoId = req.params.id;
          await Todo.findByIdAndDelete(todoId);
          res.send('Deleted Successfully.');

      })

    // ---------->>>
      
      // ===>>>
      
    // ---------->>>
      // GET, POST, UPDATE, & DELATE DATA FOR USERS
      
      // Register user with Post
      app.post('/register',async (req, res) => {
          const userData = req.body;
          const user = await User.create(userData)
          res.send(user)

    })
      


      

      



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

