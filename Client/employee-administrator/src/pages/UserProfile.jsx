import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function UserProfile() {
  const userId = useSelector((state) => state.auth.userId);
  const role = useSelector((state) => state.auth.userRole);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://localhost:44322/api/auth/get-user-profile/${userId}`
        );

        console.log(response.data);
        setUser(response.data.user);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="h-120 w-full flex justify-center items-center p-8">
      <div className="w-full h-full max-w-md bg-white border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">User Profile</h2>

        <div>
          <b>ID:</b> {user.id}
        </div>
        <div>
          <b>Username:</b> {user.userName}
        </div>
        <div>
          <b>Email:</b> {user.email}
        </div>
        <div>
          <b>Email Confirmed:</b> {user.emailConfirmed ? "Yes" : "No"}
        </div>
        <div>
          <b>Phone:</b> {user.phoneNumber ?? "N/A"}
        </div>
        <div>
          <b>2FA:</b> {user.twoFactorEnabled ? "Yes" : "No"}
        </div>
        <div>
          <b>Lockout:</b> {user.lockoutEnabled ? "Yes" : "No"}
        </div>
        <div>
          <b>Failed Count:</b> {user.accessFailedCount}
        </div>
        <div>
          <b>Roles:</b> {role}
        </div>
      </div>
    </div>
  );
}
