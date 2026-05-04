import {Router} from 'express'
import getFacilities from '../controllers/facilitiesController.js'

const router=Router()

router.get('/',getFacilities)

export default router