const router = require("express").Router();
// Bring in the User Registration function
const { CreateLoan } = require("../models/CreateLoan");
const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
  serializeUser,
} = require("../utils/Auth");

// Users Registeration Route
router.post("/register-user", async (req, res) => {
  await userRegister(req.body, "user", res);
});

// Admin Registration Route
router.post("/register-admin", async (req, res) => {
  await userRegister(req.body, "admin", res);
});

// Agent Registration Route
router.post("/register-agent", async (req, res) => {
  await userRegister(req.body, "agent", res);
});

// Users Login Route
router.post("/login-user", async (req, res) => {
  await userLogin(req.body, "user", res);
});

// Admin Login Route
router.post("/login-admin", async (req, res) => {
  await userLogin(req.body, "admin", res);
});

// Agent Login Route
router.post("/login-agent", async (req, res) => {
  await userLogin(req.body, "agent", res);
});

// Profile Route
router.get("/profile", userAuth, async (req, res) => {
  return res.json(serializeUser(req.user));
});

// Users Protected Route
router.get(
  "/user-protectd",
  userAuth,
  checkRole(["user"]),
  async (req, res) => {
    return res.json("Hello User");
  }
);

// Admin Protected Route
router.get(
  "/admin-protectd",
  userAuth,
  checkRole(["admin"]),
  async (req, res) => {
    return res.json("Hello Admin");
  }
);

// Agent Protected Route
router.get(
  "agent-protectd",
  userAuth,
  checkRole(["agent"]),
  async (req, res) => {
    return res.json("Hello admin");
  }
);

// Admin Protected Route
router.get(
  "admin-and-agent-protectd",
  userAuth,
  checkRole(["admin", "agent"]),
  async (req, res) => {
    return res.json("agent and admin");
  }
);

module.exports = router;
