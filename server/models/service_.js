const { Schema, model } = require('mongoose')

const schema = new Schema({
    'slug' : {
        type: String,
        required : true,
    },
    'title' : {},
    'parentId' : {
        type : Schema.Types.ObjectId,
        ref : 'services',
        default : null
    }
})

module.exports = model('services', schema)
