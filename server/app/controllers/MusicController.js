import Music from '../Music'
import * as yup from 'yup'
import * as fs from 'fs'
import * as path from 'path'

class MusicController {
    async index(req, res) {
        const music_list = await Music.findAll()
        
        if(!music_list.length)
            return res.status(404).json({status: 404, message: 'Could not find any music'})
        
        return res.status(200).json({status: 200, music_list})
    }

    async show(req, res) {
        const {id} = req.params

        if(!id || isNaN(id))
            return res.status(400).json({status: 400, message: 'The id parameter must be intger and must exists'})

        const music = await Music.findOne({where: {musicId: id}})

        if(!music)
            return res.status(404).json({status: 404, message: `Could not find any music where id = ${id}`})

        return res.status(200).json({status: 200, music})
    }

    async store(req, res) {
        const {name, author} = req.body
        const {originalname, mimetype, size, filename, destination} = req.file
        const path_from = path.resolve(`../../storage/music/${filename}`)
        const path_to = path.resolve(`../../storage/music/${originalname}`)

        const schema = yup.object().shape({
            name: yup.string().min(4).max(255).trim().required(),
            author: yup.string().min(3).max(255).trim().required(),
        })

        try {await schema.validate({name, author})}
        catch (error) {return res.status(400).json({status: 400, message: error.message})}

        if(size > 5000000) {
            fs.unlink(path_from)
            return res.status(400).json({status: 400, message: 'Size of the file must be less than 5MB'})
        }

        if(mimetype !== 'audio/mpeg' || mimetype !== 'audio/mp3') {
            fs.unlink(path_from)
            return res.status(400).json({status: 400, message: `The mimetype "${mimetype}" is not supported`})
        }

        fs.rename(path_from, path_to, () => res.status(500).json({status: 500, message: 'Could not rename file'}))

        const newMusic = await Music.create(
            {
                name: name,
                author: author,
                src: path_to,
                extension: mimetype
            }
        )

        if(!newMusic)
            return res.status(500).json({status: 500, message: 'Could not create new music'})

        return res.status(201).json({status: 201, newMusic})
    }

    async destroy(req, res) {
        const {id} = req.params

        if(!id || isNaN(id))
            return res.status(400).json({status: 400, message: 'Id param must exists and must be integer'})
        
        const music = await Music.findOne({where: {userId: id}})

        if(!music)
            return res.status(404).json({status: 404, message: `Wait! Music with id = ${id} does not exists`})

        await Music.destroy({where: {userId: id}})

        return res.status(200).json({status: 200, message: `Music with id = ${id} has been deleted`})
    }
}

export default MusicController