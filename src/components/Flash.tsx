// Flash.tsx
import useGeneralStore from "@/stores/generalStore";
import { AnimatePresence, motion } from "framer-motion";

export const Flash = () => {
  const { copied } = useGeneralStore();

  return (
    <AnimatePresence>
      {copied && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-green-400 text-sm"
        >
          Texto copiado
        </motion.div>
      )}
    </AnimatePresence>
  );
};
