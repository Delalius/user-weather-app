import React, { useEffect, useState } from "react";
import UserCard from "@/components/UserCard";
import { User } from "@/types/index";
import Breadcrumbs from "@/components/Breadcrumbs";
import Header from "@/components/Header";

export default function SavedUsersPage() {
  // State for saved users data
  const [savedUsers, setSavedUsers] = useState<User[]>([]);
  // Loading state for async operations
  const [loading, setLoading] = useState(true);

  // Fetch saved users from the backend API
  const fetchSavedUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Failed to fetch saved users");
      const data = await res.json();

      const transformedUsers: User[] = data.map((u: any) => ({
        gender: u.gender,
        email: u.email,
        name: {
          first: u.first_name,
          last: u.last_name,
        },
        picture: {
          large: u.picture_url,
        },
        location: {
          city: u.city,
          country: u.country,
          coordinates: {
            latitude: u.latitude,
            longitude: u.longitude,
          },
        },
      }));

      setSavedUsers(transformedUsers);
    } catch (error) {
      alert("Failed to load saved users");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch saved users once on component mount
  useEffect(() => {
    fetchSavedUsers();
  }, []);

  // Delete user by email after confirmation
  const deleteUser = async (email: string) => {
    if (!confirm("Delete this user?")) return;

    try {
      const res = await fetch("/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        alert("User deleted");
        // Refresh saved users list after deletion
        fetchSavedUsers();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to delete user");
      }
    } catch (error) {
      alert("Failed to delete user");
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <main className="p-6 max-w-7xl mx-auto">
        <Breadcrumbs />
        <h1 className="text-2xl font-bold mb-6">Saved Users</h1>

        {loading ? (
          <p>Loading...</p>
        ) : savedUsers.length === 0 ? (
          <p>No saved users found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedUsers.map((user) => (
              <div key={user.email} className="relative">
                <UserCard user={user} showSave={false} />
                <button
                  onClick={() => deleteUser(user.email)}
                  className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition"
                  title="Delete user"
                  aria-label={`Delete user ${user.name.first} ${user.name.last}`}
                >
                  &#10006;
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
