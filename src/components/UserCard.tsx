import React, { useState } from "react";
import WeatherModal from "./WeatherModal";
import { User } from "@/types/index";
import { motion } from "framer-motion";
import { FaSave, FaCloudSun } from "react-icons/fa";
import Image from "next/image";

interface UserCardProps {
  user: User;
  showSave?: boolean; // Optionally show or hide the save button
}

interface WeatherData {
  temperature: number;
  icon: string;
  max: number;
  min: number;
}

/**
 * UserCard component displays user info, fetches and shows weather modal,
 * and allows saving the user to backend.
 */
const UserCard: React.FC<UserCardProps> = ({ user, showSave = true }) => {
  // State to control modal visibility
  const [showWeather, setShowWeather] = useState(false);

  // Store fetched weather data
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  // Loading indicator for weather fetching
  const [loadingWeather, setLoadingWeather] = useState(false);

  // Fetch weather data based on user's coordinates
  const fetchWeather = async () => {
    setLoadingWeather(true);
    const { latitude, longitude } = user.location.coordinates;

    try {
      const response = await fetch(
        `/api/weather?lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();

      const current = data.current_weather;
      const daily = data.daily;

      setWeatherData({
        temperature: current.temperature,
        icon: current.weathercode.toString(),
        max: daily.temperature_2m_max[0],
        min: daily.temperature_2m_min[0],
      });
      setShowWeather(true);
    } catch (error) {
      console.error("Weather fetch error:", error);
      alert("Failed to fetch weather data");
    } finally {
      setLoadingWeather(false);
    }
  };

  // Save user to backend API
  const saveUser = async () => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (res.status === 201) {
        alert("User saved!");
      } else if (res.status === 409) {
        alert("User already saved!");
      } else {
        alert("Failed to save user");
      }
    } catch {
      alert("Failed to save user");
    }
  };

  return (
    <>
      <motion.div
        // Animation for fade and slide up on mount
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-gray-700 rounded-2xl p-6 flex flex-col items-center shadow-xl transition-all duration-300 hover:shadow-2xl"
      >
        {/* User avatar with optimized Next.js Image component */}
        <Image
          src={user.picture.large}
          alt={`${user.name.first} ${user.name.last}`}
          width={112}
          height={112}
          className="rounded-full object-cover border-4 border-gray-700"
        />

        <h3 className="mt-4 text-xl font-semibold text-center text-white tracking-wide">
          {user.name.first} {user.name.last}
        </h3>

        <p className="text-center text-gray-400">{user.gender}</p>

        <p className="text-center text-gray-500">
          {user.location.city}, {user.location.country}
        </p>

        <p className="text-center text-sm text-gray-600 truncate max-w-full">
          {user.email}
        </p>

        {/* Action buttons: Save and Show Weather */}
        <div className="flex gap-4 mt-6">
          {showSave && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={saveUser}
              className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg shadow-md transition"
              title="Save user"
            >
              <FaSave />
              Save
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchWeather}
            disabled={loadingWeather}
            className={`flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg shadow-md transition ${
              loadingWeather ? "opacity-50 cursor-not-allowed" : ""
            }`}
            title="Show weather"
          >
            <FaCloudSun />
            {loadingWeather ? "Loading..." : "Weather"}
          </motion.button>
        </div>
      </motion.div>

      {/* Weather details modal */}
      <WeatherModal
        isOpen={showWeather}
        onClose={() => setShowWeather(false)}
        weather={weatherData}
      />
    </>
  );
};

export default UserCard;
