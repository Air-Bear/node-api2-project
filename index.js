const express = require("express");
const app = express();
const db = require("./data/db");

app.use(express.json());

//creates a new post
app.post("/api/posts", (req, res) => {
    db.insert(req.body)
    .then(post => {
        res.status(201).json(post);
    })
    .catch(err => {
        res.status(500).json({
            message: "Error adding the post"
        });
    });
});

//creates a comment for post with specific id
app.post("/api/posts/:id/comments", (req, res) => {
    const {id} = req.params
    req.body.post_id = id;

    db.insertComment(req.body)
    .then(comment => {
        res.status(201).json(comment)
    })
    .catch(err => {
        res.status(500)
    })
   
});

// returns array of all post objects
app.get("/api/posts", (req, res) => {
    db.find().then(posts => {
        res.json(posts);
    })
});

//returns post object with specific id
app.get("/api/posts/:id", (req, res) => {
    const {id} = req.params;
    
    db.findById(id)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => {
        res.status(500)
    })
});


//returns array of all comment objects associated with post id
app.get("/api/posts/:id/comments", (req, res) => {
    const {id} = req.params;

    db.findPostComments(id)
    .then(comments => {
        res.status(200).json(comments)
    })
    .catch(err => {
        res.status(500)
    });
});

//removes post with matching id and returns deleted item
app.delete("/api/posts/:id", (req, res) => {
    const {id} = req.params;

    db.remove(id)
    .then(numDel => {
        res.status(200).json(numDel);
    })
    .catch(err => {
        res.status(500);
    });
});


//updates post with matching id and returns modified
app.put("/api/posts/:id", (req, res) => {
    const {id} = req.params;

    db.update(id, req.body)
    .then(numUpdated => {
        res.status(200).json(numUpdated);
    })
    .catch(err => {
        res.status(500);
    });
});

const port = 5000 || port.env.PORT;
app.listen(port, () => {
    console.log("server listening on: ", port);
});