const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,

    },
    markdown: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        require: Date.now
    },

    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
})
articleSchema.pre('validate', function (next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: ture })
    }
    if ((this.markdown)) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
    }

    next()
})

module.exports = mongoose.model('Article', articleSchema)