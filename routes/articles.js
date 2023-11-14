const express = requrie('express')
const Article = require('./../models/articles')
const router = express.Router()

router.get('/new',(req,res)=>{
    res.render('article/new',{ article: new Article() })
})

router.get('/:id', async (req,res)=>{
    const article = await Article.findById(req.params.id)
    res.render('article/show', {article: article})
})
router.post('/', async (req,res)=>{
    let article = new Article(
        {
            title: req.body.title,
            description : req.body.description,
            markdown : req.body.markdown
        }
    )
    try {
        article = await article.save()
        res.redirect(  `/article/${article.id}`)
    } catch (e) {
        res.render('article/new',{ article: article})
    }
})

module.exports = router