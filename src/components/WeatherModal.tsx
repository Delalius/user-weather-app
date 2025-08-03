import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaTemperatureHigh,
  FaTemperatureLow,
  FaSun,
  FaCloudSun,
  FaCloudRain,
  FaBolt,
} from "react-icons/fa";

interface WeatherModalProps {
  isOpen: boolean;
  onClose: () => void;
  weather: {
    temperature: number;
    icon: string;
    max: number;
    min: number;
  } | null;
}

// Map weather codes to corresponding icon components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "0": FaSun,
  "1": FaCloudSun,
  "2": FaCloudRain,
  "3": FaBolt,
};

// Map weather codes to their icon colors
const colorMap: Record<string, string> = {
  "0": "text-yellow-400",
  "1": "text-gray-400",
  "2": "text-blue-500",
  "3": "text-purple-500",
};

const WeatherModal: React.FC<WeatherModalProps> = ({
  isOpen,
  onClose,
  weather,
}) => {
  if (!weather) return null; // Early return if no weather data

  // Select appropriate icon and color based on weather code, fallback to clear sky icon/color
  const IconComponent = iconMap[weather.icon] || FaSun;
  const iconColor = colorMap[weather.icon] || "text-yellow-400";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gradient-to-br from-blue-100 to-white dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl w-full max-w-sm shadow-xl relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition"
              aria-label="Close modal"
            >
              <FaTimes />
            </button>

            <div className="flex flex-col items-center text-center gap-4">
              <h2 className="text-2xl font-bold flex items-center gap-2 text-yellow-500 dark:text-yellow-300">
                <FaSun /> Weather Details
              </h2>

              {/* Weather icon with dynamic color */}
              <IconComponent className={`w-20 h-20 ${iconColor}`} />

              {/* Current temperature */}
              <p className="text-xl font-semibold">🌡 {weather.temperature}°C</p>

              {/* Max and Min temperature with icons */}
              <div className="flex justify-between w-full px-6 text-sm">
                <p className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <FaTemperatureHigh /> Max:{" "}
                  <span className="font-bold">{weather.max}°C</span>
                </p>
                <p className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <FaTemperatureLow /> Min:{" "}
                  <span className="font-bold">{weather.min}°C</span>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WeatherModal;
