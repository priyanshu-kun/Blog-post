const express = require("express");
const bodyParser = require("body-parser");
const EJS = require("ejs");
const lodash = require("lodash");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
// "str".split()

const aboutContent = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis minima voluptatum quam amet debitis deleniti hic culpa, optio rerum officia voluptatibus magni veniam natus. Excepturi fuga voluptatum sunt consequatur itaque? Dolores temporibus dolorum fugiat deleniti consequuntur at alias nemo eum porro facilis minima placeat natus, magnam fugit omnis rem sapiente, amet ipsum quisquam! Molestias cum velit, nam eos aut nisi voluptates possimus ratione, optio totam, corporis accusamus. Quod debitis cupiditate doloremque voluptate eaque ad eligendi quas ut ea corporis minima, ipsum sed esse, ipsa rerum adipisci nisi numquam iste molestiae illo in id reiciendis fugit blanditiis.";


// console.log(express)
const app = express();

mongoose.connect('mongodb://localhost:27017/BlogPost', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.error("An unexpected error occur", err);
    }
    else {
        console.log("Database created sucessfully!");
    }
});

// Create new schema
const BlogSchema = new mongoose.Schema({
    title: String,
    badge: String,
    blogpost: String

})

const Posts = [];

// create a model
const BlogModel = mongoose.model("blogData", BlogSchema);


app.set("view engine", 'EJS');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
    BlogModel.find({}, (err, post) => {
        if (err) {
            console.error(err);
        }
        else {
            res.render("home", { homeContent: post })
        }

    })

})

app.get("/about", (req, res) => {
    res.render("about", { aboutContent: aboutContent })
})

app.get("/contact", (req, res) => {
    res.send("This is not ready please stay tuned.")
})

app.get("/compose", (req, res) => {
    // res.render("composs");
    BlogModel.find({}, (err, post) => {
        if (err) {
            console.error(err);
        }
        else {
            res.render("composs", { homeContent: post })
        }

    })
})

app.get("/page/:data", (req, res) => {
    const PostId = req.params.data;
    BlogModel.findOne({ _id: PostId }, (err, post) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(post.badge)
            res.render("RenderPost", { title: post.title, Badge: post.badge, content: post.blogpost })
        }
    })
    console.log(req.params.data)
})

app.post("/", (req, res) => {
    const post_obj = new BlogModel({
        title: req.body.blogtitle,
        badge: req.body.blogbatch,
        blogpost: req.body.blogbody

    })
    post_obj.save((err) => {
        if (!err) {
            res.redirect("/")
        }
    });

    // console.log(post)
})


// Delete and edit posts
app.delete("/delete", (req, res) => {

    BlogModel.findOneAndRemove({ _id: req.body.deleteBtn }, (err, docs) => {
        if (err) {
            console.error(err);
        }
        else {
            console.log("fild remove in database", docs);
            res.redirect("/")
        }
    });
})


// edit post
app.get("/:edit",(req,res) => {
    res.render("edit",{editblog: req.params.edit})
    // console.log(req.params.edit)
})


app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("server is running on port 3000...");
    }
})