const express = require("express");
const bodyParser = require("body-parser");
const EJS = require("ejs");


const homeContent = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis minima voluptatum quam amet debitis deleniti hic culpa, optio rerum officia voluptatibus magni veniam natus. Excepturi fuga voluptatum sunt consequatur itaque? Dolores temporibus dolorum fugiat deleniti consequuntur at alias nemo eum porro facilis minima placeat natus, magnam fugit omnis rem sapiente, amet ipsum quisquam! Molestias cum velit, nam eos aut nisi voluptates possimus ratione, optio totam, corporis accusamus. Quod debitis cupiditate doloremque voluptate eaque ad eligendi quas ut ea corporis minima, ipsum sed esse, ipsa rerum adipisci nisi numquam iste molestiae illo in id reiciendis fugit blanditiis. Veniam dicta officia, et, possimus repellendus recusandae quo optio, iure rem laboriosam assumenda eos consequuntur totam! Cupiditate neque nulla voluptates eum obcaecati, ducimus autem? Iure doloremque voluptatem quis sit. Placeat quam facilis odio eaque illo perspiciatis deleniti, totam nisi iusto doloremque cum reiciendis dicta repellat praesentium ab dolor excepturi voluptate exercitationem modi veritatis laudantium? Nobis sed veniam possimus autem obcaecati unde! Eveniet dolor nulla molestiae nisi corporis. Quasi, perferendis mollitia nostrum illo architecto corporis eveniet. "

const aboutContent = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis minima voluptatum quam amet debitis deleniti hic culpa, optio rerum officia voluptatibus magni veniam natus. Excepturi fuga voluptatum sunt consequatur itaque? Dolores temporibus dolorum fugiat deleniti consequuntur at alias nemo eum porro facilis minima placeat natus, magnam fugit omnis rem sapiente, amet ipsum quisquam! Molestias cum velit, nam eos aut nisi voluptates possimus ratione, optio totam, corporis accusamus. Quod debitis cupiditate doloremque voluptate eaque ad eligendi quas ut ea corporis minima, ipsum sed esse, ipsa rerum adipisci nisi numquam iste molestiae illo in id reiciendis fugit blanditiis.";

const Posts = [{BlogTitle: "Home",BlogBody: homeContent}];

// console.log(express)
const app = express();

app.set("view engine",'EJS');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));

app.get("/",(req,res) => {
    // res.send("Hello world")
    // console.log(Posts)
    res.render("home",{homeContent: Posts})
})

app.get("/about",(req,res) => {
    res.render("about",{aboutContent: aboutContent})
})

app.get("/contact",(req,res) => {
    res.send("This is not ready please stay tuned.")
})

app.get("/compose",(req,res) => {
    res.render("composs");
})

app.post("/",(req,res) => {
    const post = {
        BlogTitle: req.body.blogtitle,
        BlogBody: req.body.blogbody
    }
    Posts.push(post);
    res.redirect("/")
    // console.log(post)
})


app.listen(3000,(err) => {
    if(err) {
        console.log(err);
    }
    else {
        console.log("server is running on port 3000...");
    }
})