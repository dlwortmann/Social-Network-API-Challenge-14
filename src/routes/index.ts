import { Router } from 'express'
import apiRoutes from './api/index.js'

const router = Router()

router.use('/api', apiRoutes);

router.use((_req, res) => {
      return res.status(404).json({ message: "Not a valid route" })
    })

export default router;

