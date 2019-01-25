
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo", { useNewUrlParser: true });

//------------------------------------------------- DATA

// post - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);


// user - email, name  ---- this comes after post is defined, because we embed that here
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
var User = mongoose.model("User", userSchema);


/*
// make fake data
var newUser = new User({
    email: "Hermione@hogwarts.edu",
    name: "Hermione Granger"
});
// push this post into the new user
newUser.posts.push({
    title: "How to brew polyjuice potion",
    content: "Just kidding, go to potions class to learn it..."
})

newUser.save(function(err, user){
    if(err){
        console.log(err);
    }else{
        console.log(user);
    }
})
*/

// find user, and add new post to associate with this user
User.findOne({name: "Hermione Granger"}, function(err, user){
    if(err){
        console.log(err)
    }else{
        // console.log(user);
        user.posts.push({
            title: "things I hate",
            content: "Voldemort!"
        });
        user.save(function(err, user){
            if(err){
                console.log(err);
            }else{
                console.log(user);
            }
        })
    }
});

// var newPost = new Post({
//     title: "thoughts about things",
//     content: "Things are cool, but so is stuff"
// });
// newPost.save(function(err, post){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(post);
//     }
// });