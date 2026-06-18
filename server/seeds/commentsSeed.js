const mongoose = require('mongoose')
const { Schema } = mongoose;
const Comment = require('../models/Comment')

mongoose.connect('mongodb://127.0.0.1:27017/blog')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const comments = [
    {
        author: "Sarah Chen",
        content: "Great article! The explanation of React hooks was really clear and easy to follow."
    },
    {
        author: "Mike Johnson",
        content: "I've been struggling with this concept for weeks. This post finally made it click."
    },
    {
        author: "Alex Rivera",
        content: "Would love to see a follow-up post covering more advanced use cases."
    },
    {
        author: "Emma Wilson",
        content: "Thanks for sharing this. The code examples were especially helpful."
    },
    {
        author: "David Kim",
        content: "I found a small typo in the third code snippet, but otherwise excellent content."
    },
    {
        author: "Priya Patel",
        content: "This saved me a ton of debugging time. Bookmarked for future reference."
    },
    {
        author: "James Miller",
        content: "Interesting perspective. I usually approach it differently, but your method makes sense."
    },
    {
        author: "Olivia Brown",
        content: "The screenshots and examples made this much easier to understand."
    },
    {
        author: "Carlos Martinez",
        content: "Could you add a section on performance considerations? That would be really useful."
    },
    {
        author: "Sophia Garcia",
        content: "One of the best tutorials I've read on this topic. Looking forward to more posts."
    },
    {
        author: "Noah Anderson",
        content: "I implemented this in my project today and it worked perfectly."
    },
    {
        author: "Ava Thompson",
        content: "The step-by-step breakdown was exactly what I needed as a beginner."
    }
];



const seedDB = async () => {
    await Comment.deleteMany({});
    await Comment.insertMany(comments);

    console.log('Comments Database Seeded!');
    mongoose.connection.close();
};

seedDB();