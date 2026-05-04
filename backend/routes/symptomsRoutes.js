import {Router} from 'express'
import { getSymptoms } from '../controllers/symptomsController.js'

const router=Router()

router.get('/',getSymptoms)

export default router