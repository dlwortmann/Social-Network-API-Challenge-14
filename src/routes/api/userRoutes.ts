import { Router } from 'express'
import { getUsers, getSingleUser, createUser } from '../../controllers/userController.js'

const router = Router()

router.route('/').get(getUsers).post(createUser)

router.route('/:userId').get(getSingleUser)

export default router;
