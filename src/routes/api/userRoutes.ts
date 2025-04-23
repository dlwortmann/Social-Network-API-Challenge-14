import { Router } from 'express'
import { getUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, deleteFriend } from '../../controllers/userController.js'

const router = Router()

router.route('/').get(getUsers).post(createUser)

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser)

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)

export default router;
