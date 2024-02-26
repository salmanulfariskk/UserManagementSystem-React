import { Router } from 'express';
import { checkAuth, registerUser, loginUser, logout } from '../controllers/authController.js';
import { fetchAllUsers, editUser, deleteUser } from '../controllers/adminController.js';
import { editProfile } from '../controllers/userController.js';
import tokenVerification from '../middlewares/tokenVerification.js';
import { uploadProfileImage } from '../middlewares/imageUpload.js';

const router = Router();

// check is logged in
router.post("/auth/checkauth", checkAuth);

// admin
router.post("/admin/login", loginUser);
router.get("/admin/fetch-users", tokenVerification, fetchAllUsers);
router.post("/admin/add-user", tokenVerification, registerUser);
router.post("/admin/edit-user", tokenVerification, editUser);
router.post("/admin/delete-user", tokenVerification, deleteUser);

// user
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/edit-full-profile", uploadProfileImage, editProfile);
router.post("/edit-profile", editProfile);

// logout 
router.post("/logout", logout);

export default router;