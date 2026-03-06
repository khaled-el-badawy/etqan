import "./PageNotFound.css";
import { motion } from "framer-motion";

function PageNotFound() {
  return (
    <div className="page-not-found-container">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        404 - Page Not Found
      </motion.h1>
    </div>
  );
}

export default PageNotFound;
