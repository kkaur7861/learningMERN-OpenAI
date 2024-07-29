import { Router } from "express";
import userRoutes from "./user-router.js";
import chatRoutes from "./chat-router.js";
const appRouter = Router();
appRouter.use("/user", userRoutes);
appRouter.use("/chats", chatRoutes);
export default appRouter;
//# sourceMappingURL=index.js.map