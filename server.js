const express = require('express')
const articleRouter = require("./routes/articles")
const Article = require('./models/article')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express();
const path = require("path");
const port = 8080;

mongoose.connect('mongodb://127.0.0.1:27017/bharatInterndb');

app.set('view engine', 'ejs')
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))


app.get('/', async(req, res) => {
    const articles =await Article.find().sort({ createdAt:'desc'})
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})