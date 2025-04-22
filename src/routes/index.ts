import { Router } from 'express'
import apiRoutes from './api/index.js'

const router = Router()

router.use('/api', apiRoutes);

router.use((_req, res) => {
      return res.send("Not a valid route")
    })

export default router;

