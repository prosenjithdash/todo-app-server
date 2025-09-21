const express = require('express')
const app = express()
const port = 8000


const { MongoClient, ServerApiVersion } = require('mongodb');

// Database Access UserName and Password
const uri = "mongodb+srv://todo_user:wS4qwYGbfyzNdDSP@cluster0.kybpity.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    //   await client.db("admin").command({ ping: 1 });
      
      // database collection
      const todosCollection = client.db('todoDB').collection("todos")

      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      
      // routes
      app.get("/todos", async (req, res) => {
          const todos = await todosCollection.find({}).toArray();
          res.send(todos)
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
