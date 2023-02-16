const Router = require("express");
const router = Router();
router.use(require("./routers/authRouter"));
router.use(require("./routers/postRouter"));
router.use(require("./routers/uploadsRouter"));

module.exports = router;     
                                             