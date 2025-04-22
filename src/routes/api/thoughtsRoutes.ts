import { Router } from 'express'
import { getSingleThought, getThoughts, createThought } from '../../controllers/thoughtsController.js'

const router = Router()

router.route('/').get(getThoughts).post(createThought)

router.route('/:thoughtId').get(getSingleThought)

export default router;