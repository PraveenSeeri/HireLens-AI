import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaRobot,
  FaMoon,
  FaSun,
  FaSignOutAlt,
  FaUserCircle,
  FaCloudUploadAlt,
  FaHistory,
  FaBalanceScale,
  FaBullseye,
  FaTachometerAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { darkMode, toggleTheme } = useTheme();
  const { isAuthenticated, logout, user } = useAuth();

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  function handleLogout() {
    setShowMenu(false);
    logout();
    navigate("/login");
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") setShowMenu(false);
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const navLink = (path) =>
    location.pathname === path
      ? "text-blue-600 font-bold"
      : "text-slate-600 dark:text-slate-300 hover:text-blue-600 transition";

  const menuLink = (path) =>
    location.pathname === path
      ? "flex items-center gap-3 px-5 py-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 font-semibold"
      : "flex items-center gap-3 px-5 py-4 hover:bg-slate-100 dark:hover:bg-slate-800 transition";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-gray-200 dark:border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
            <FaRobot className="text-white text-2xl" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white">
              HireLens <span className="text-blue-600">AI</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">AI Resume Intelligence</p>
          </div>
        </Link>

        {isAuthenticated && (
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/dashboard" className={navLink("/dashboard")}>Dashboard</Link>
            <Link to="/upload" className={navLink("/upload")}>Upload</Link>
            <Link to="/history" className={navLink("/history")}>History</Link>
            <Link to="/compare" className={navLink("/compare")}>Compare</Link>
            <Link to="/job-match" className={navLink("/job-match")}>Job Match</Link>
          </nav>
        )}

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="w-11 h-11 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center"
          >
            {darkMode ? <FaSun className="text-yellow-400"/> : <FaMoon />}
          </button>

          {!isAuthenticated ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-xl">Register</Link>
            </>
          ) : (
            <>
              <Link
                to="/upload"
                className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
              >
                <FaCloudUploadAlt />
                Upload Resume
              </Link>

              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center"
                >
                  <FaUserCircle className="text-white text-xl"/>
                </button>

                <AnimatePresence>
                  {showMenu && (
                    <motion.div
                      initial={{opacity:0,y:-10,scale:0.95}}
                      animate={{opacity:1,y:0,scale:1}}
                      exit={{opacity:0,y:-10,scale:0.95}}
                      transition={{duration:0.2}}
                      className="absolute right-0 mt-3 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border dark:border-slate-700 overflow-hidden z-50"
                    >
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white text-center">
                        <div className="w-20 h-20 rounded-full bg-white text-blue-600 mx-auto flex items-center justify-center text-4xl font-bold">
                          {user?.username?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <h3 className="font-bold text-xl mt-3">{user?.username || "Welcome"}</h3>
                        <p className="text-blue-100 text-sm">{user?.email || "HireLens AI User"}</p>
                        <span className="inline-block mt-3 bg-white/20 px-4 py-1 rounded-full text-xs font-semibold">
                          AI Resume Intelligence
                        </span>
                      </div>

                      <Link to="/dashboard" onClick={()=>setShowMenu(false)} className={menuLink("/dashboard")}><FaTachometerAlt/>Dashboard</Link>
                      <Link to="/history" onClick={()=>setShowMenu(false)} className={menuLink("/history")}><FaHistory/>Resume History</Link>
                      <Link to="/compare" onClick={()=>setShowMenu(false)} className={menuLink("/compare")}><FaBalanceScale/>Resume Comparison</Link>
                      <Link to="/job-match" onClick={()=>setShowMenu(false)} className={menuLink("/job-match")}><FaBullseye/>AI Job Match</Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-5 py-4 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <FaSignOutAlt/>
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;