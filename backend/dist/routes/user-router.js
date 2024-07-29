import { Router } from "express";
import { getAllUsers, userLogin, userSignUp } from "../controllers/user-controller.js";
import { loginValidator, signUpValidator, validate } from "../utils/validators.js";
const userRoutes = Router();
userRoutes.get("/", getAllUsers);
userRoutes.post("/signUp", validate(signUpValidator), userSignUp);
userRoutes.post("/login", validate(loginValidator), userLogin);
export default userRoutes;
//# sourceMappingURL=user-router.js.map