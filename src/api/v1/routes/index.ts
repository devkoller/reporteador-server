import { Router } from "express"

import PanelsRouter from "@/modules/statistics/panels/panels.routes"
import User from "@/modules/users/users.routes"
import Data from "@/modules/data/data.routes"

const router = Router()

router.use("/user", User)
router.use("/panels", PanelsRouter)
router.use("/data", Data)

export default router
