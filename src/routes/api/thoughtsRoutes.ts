import { Router } from 'express'
import { getSingleThought, getThoughts, createThought, updateThought, deleteThought } from '../../controllers/thoughtsController.js'

const router = Router()

router.route('/').get(getThoughts).post(createThought)

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought)

export default router;