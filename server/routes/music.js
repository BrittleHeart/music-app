import {app} from '../server'
import MusicController from '../app/controllers/MusicController'
import { verifyJWTToken } from '../app/middlewares/verifyJWTToken'
import {upload} from '../server'

const music = new MusicController()

app.get('/api/v1/music', [verifyJWTToken, upload.single('music')], async (req, res) => await music.index(req, res))
app.get('/api/v1/music/:id', verifyJWTToken, async (req, res) => await music.show(req, res))
app.post('/api/v1/music/', verifyJWTToken, async (req, res) => await music.store(req, res))
app.delete('/api/v1/music/:id', verifyJWTToken, async(req, res) => await music.destroy(req, res))