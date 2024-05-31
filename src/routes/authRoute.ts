
import { Router } from "express";
import AuthController from "../controller/authController";
import { validateAT } from "../middleware/validateToken";
import validateRole from "../middleware/rbac";
import { roleType } from "../helper/type/type";

const authController=new AuthController();

const router=Router();

router.post('/create/admin',(req, res) => authController.createAdmin(req, res))
router.post('/create',validateAT,validateRole(roleType.admin),(req, res) => authController.createAccount(req, res))
router.post('/login',(req, res) => authController.login(req, res));
router.post('/logout',(req, res) => authController.logout(req, res));
router.post('/otp',(req, res) => authController.generateOtp(req, res));
router.post('/password/reset',(req, res) => authController.resetPass(req, res));
router.patch('/update/email/:id',validateAT,(req, res) => authController.updateEmail(req, res));
router.delete('/delete/:id',validateAT,(req, res) => authController.deleteAuth(req, res));
router.get('/token/refresh',(req,res)=>authController.refresh(req,res));

export default router;