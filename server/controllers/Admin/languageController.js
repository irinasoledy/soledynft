const Language = require('../../Models/language');

class LanguageController {
    async get(req, res)
    {
        try {
            const languages = await Language.find()
            return res.status(200).json(languages)
        } catch (e) {
            return res.status(400).send(`Error on get languages. $(e)`)
        }
    }


    async create(req, res)
    {
        try {
            await Language.create({
                name: req.body.name,
                code: req.body.code,
                status: req.body.status,
            })
            const languages = await Language.find()
            return res.status(200).json(languages)
        } catch (e) {
            return res.status(400).send(`Error on create language. ` + e)
        }
    }


    async update(req, res)
    {
        try {
            await Language.findOneAndUpdate({_id: req.body._id}, {$set: {
                name: req.body.name,
                code: req.body.code
            }}, {new : true})
            const languages = await Language.find()
            return res.status(200).json(languages)
        } catch (e) {
            return res.status(400).send(`Error on update language. ` + e)
        }
    }


    async remove(req, res)
    {
        try {
            await Language.deleteOne({_id : req.body.id})
            const languages = await Language.find()
            return res.status(200).json(languages)
        } catch (e) {
            return res.status(400).send(`Error on delete language. ` + e)
        }
    }
    

    async changeStatus(req, res)
    {
        try {
            await Language.findOneAndUpdate({_id: req.body.id}, {$set: {
                status: req.body.status
            }}, {new : true})
            const languages = await Language.find()
            return res.status(200).json(languages)
        } catch (e) {
            return res.status(400).send(`Error on change status language. ` + e)
        }
    }
}

module.exports = function(){
    return new LanguageController()
}
