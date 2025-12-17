import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function UserProfile() {
  const userId = useSelector((state) => state.auth.userId);
  const role = useSelector((state) => state.auth.userRole);
  const token = useSelector((state) => state.auth.token);

  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      const { data } = await axios.get(
        `https://localhost:44322/api/auth/get-user-profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const u = data.user ?? data;
      setUser(u);
      setFullName(u.fullName ?? "");
    };

    fetchUser();
  }, [userId]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    setSaving(true);
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("fullName", fullName);
    if (photo) formData.append("photo", photo);

    try {
      const { data } = await axios.post(
        `https://localhost:44322/api/auth/edit-user`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(data.user ?? data);
      setPhoto(null);
      setPreview(null);
    } catch (err) {
      console.error("Error saving profile:", err);
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="p-8 text-center text-gray-500">Loading profile...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center md:items-start">
          <div className="flex flex-col items-center md:items-start gap-4">
            <img
              src={
                preview ||
                (user.photoBase64
                  ? `data:image/jpeg;base64,${user.photoBase64}`
                  : "/avatar.png")
              }
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
            />
            <div className="text-center md:text-left">
              <h2 className="text-xl font-semibold text-gray-800">
                {user.fullName ?? "N/A"}
              </h2>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-sm text-gray-400 mt-1">Role: {role}</p>
            </div>
          </div>

          <div className="mt-6 w-full text-gray-700 space-y-2 text-sm">
            <div>
              <span className="font-medium">ID:</span> {user.id}
            </div>
            <div>
              <span className="font-medium">Username:</span> {user.userName}
            </div>
            <div>
              <span className="font-medium">Email Confirmed:</span>{" "}
              {user.emailConfirmed ? "Yes" : "No"}
            </div>
            <div>
              <span className="font-medium">Phone:</span>{" "}
              {user.phoneNumber ?? "N/A"}
            </div>
            <div>
              <span className="font-medium">2FA:</span>{" "}
              {user.twoFactorEnabled ? "Enabled" : "Disabled"}
            </div>
            <div>
              <span className="font-medium">Lockout:</span>{" "}
              {user.lockoutEnabled ? "Enabled" : "Disabled"}
            </div>
            <div>
              <span className="font-medium">Failed Count:</span>{" "}
              {user.accessFailedCount}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Edit Profile
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full"
            />
          </div>

          {preview && (
            <div className="flex justify-center mb-2">
              <img
                src={preview}
                alt="Preview"
                className="w-28 h-28 rounded-full border-2 border-gray-300 object-cover"
              />
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
