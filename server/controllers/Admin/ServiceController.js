const Service = require('../../Models/service');

class ServiceController {
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
            console.log(req.body);
            await Service.create({
                slug: this.stringToSlug(req.body.titles[Object.keys(req.body.titles)[0]]),
                title: req.body.titles,
                parentId: req.body.parentId,
            })
            const services = await Service.find()
            return res.status(200).json(services)
        } catch (e) {
            return res.status(400).send(`Error on create service. ` + e)
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

    stringToSlug(str) {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        var from = "àáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
        var to   = "aaaaaeeeeiiiioooouuuunc------";

        for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

        return str;
    }
}

module.exports = function(){
    return new ServiceController()
}
