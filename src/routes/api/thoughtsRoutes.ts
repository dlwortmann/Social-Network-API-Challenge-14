import { Router } from 'express'
import { getSingleThought, getThoughts, createThought, updateThought, deleteThought, addReaction, deleteReaction } from '../../controllers/thoughtsController.js'

const router = Router()

router.route('/').get(getThoughts).post(createThought)

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought)

router.route('/:thoughtId/reactions').post(addReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)

export default router;