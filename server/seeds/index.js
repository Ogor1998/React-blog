
const mongoose = require('mongoose');
const Comment = require('../models/Comment')
const Blog = require('../models/Post')
const User = require('../models/User')

mongoose.connect('mongodb://127.0.0.1:27017/blog')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));



const seedBlogs = [
    {
        title: "Getting Started with React",
        content:
            "React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and efficiently update the DOM using a virtual DOM system.",
        author: "6a202d913e43945e57462666",
        category: "Programming",
        image:
            "https://images.unsplash.com/photo-1633356122544-f134324a6cee"
    },

    {
        title: "10 Tips for Better Productivity",
        content:
            "Productivity is about working smarter, not harder. Start by planning your day, eliminating distractions, and focusing on high-priority tasks first.",
        author: "6a202d913e43945e57462666",
        category: "Productivity",
        image:
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
    },

    {
        title: "Exploring the Mountains of Colorado",
        content:
            "Colorado offers some of the most beautiful mountain landscapes in the United States. Hiking, skiing, and camping are popular activities year-round.",
        author: "6a202d913e43945e57462666",
        category: "Travel",
        image:
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
    },

    {
        title: "Healthy Eating on a Budget",
        content:
            "Eating healthy doesn’t have to be expensive. Buying seasonal produce, meal prepping, and cooking at home can save money while improving nutrition.",
        author: "6a2af831fa32817dccc6e74d",
        category: "Health",
        image:
            "https://images.unsplash.com/photo-1490645935967-10de6ba17061"
    },

    {
        title: "Understanding JavaScript Closures",
        content:
            "Closures are a powerful feature in JavaScript that allow inner functions to access variables from outer functions even after the outer function has returned.",
        author: "6a2af831fa32817dccc6e74d",
        category: "Programming",
        image:
            "https://images.unsplash.com/photo-1515879218367-8466d910aaa4"
    },

    {
        title: "The Future of Artificial Intelligence",
        content:
            "Artificial Intelligence continues to evolve rapidly, impacting industries like healthcare, finance, education, and transportation.",
        author: "6a2af831fa32817dccc6e74d",
        category: "Technology",
        image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995"
    },

    {
        title: "Minimalist Living: Less is More",
        content:
            "Minimalism focuses on removing unnecessary clutter and prioritizing what truly matters in life, leading to less stress and greater clarity.",
        author: "6a2af831fa32817dccc6e74d",
        category: "Lifestyle",
        image:
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
    },

    {
        title: "A Beginner’s Guide to Investing",
        content:
            "Investing can seem intimidating, but understanding concepts like diversification, index funds, and long-term growth can help beginners get started.",
        author: "6a2af831fa32817dccc6e74d",
        category: "Finance",
        image:
            "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a"
    }
];

const seedDB = async () => {
    await Blog.deleteMany({});
    await Comment.deleteMany({})
    const blogs = await Blog.insertMany(seedBlogs);


    const users = await User.find();

    // 3. create comments using real user IDs
    const comments = await Comment.insertMany([
        {
            author: '6a202d913e43945e57462666',
            content: "Great article!"
        },
        {
            author: '6a202d913e43945e57462666',
            content: "Very helpful!"
        },
        {
            author: '6a202d913e43945e57462666',
            content: "Loved this explanation"
        }
    ]);

    blogs[0].comments = [
        comments[0]._id,
        comments[1]._id,
        comments[2]._id

    ]
    blogs[1].comments = [
        comments[0]._id,
        comments[2]._id
    ]

    await Promise.all(blogs.map(blog => blog.save()));

    const test = await Blog.find({}).populate("comments");
    console.log(JSON.stringify(test, null, 2));

    console.log('Database Seeded!');
    mongoose.connection.close();
};

seedDB();