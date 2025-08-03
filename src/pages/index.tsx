import { useEffect, useState } from "react";
import UserCard from "@/components/UserCard";
import { User } from "@/types";
import Breadcrumbs from "@/components/Breadcrumbs";
import Header from "@/components/Header";
import { motion } from "framer-motion";

export default function Home() {
  // State to store users fetched from the API
  const [users, setUsers] = useState<User[]>([]);

  // Fetch users from randomuser API and append them to existing list
  const fetchUsers = async () => {
    try {
      const res = await fetch("https://randomuser.me/api/?results=6");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers((prev) => [...prev, ...data.results]);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch initial users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Header />
      <main className="p-6 max-w-7xl mx-auto">
        <Breadcrumbs />

        <h1 className="text-3xl font-extrabold mb-6">Users</h1>

        {/* Grid of user cards with framer-motion layout animation */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {users.map((user, idx) => (
            <UserCard key={user.email || idx} user={user} />
          ))}
        </motion.div>

        {/* Load more button with animation */}
        <motion.button
          layout
          onClick={fetchUsers}
          className="mt-8 px-6 py-3 bg-amber-600 text-white rounded-lg shadow-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Load more users"
        >
          Load More
        </motion.button>
      </main>
    </>
  );
}
