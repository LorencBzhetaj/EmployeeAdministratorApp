import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function UserProfile() {
  const userId = useSelector((state) => state.auth.userId);
  const role = useSelector((state) => state.auth.userRole);

  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      const { data } = await axios.get(
        `https://localhost:44322/api/auth/get-user-profile/${userId}`
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
        formData
      );

      console.log(data);

      setUser(data.user ?? data);
      setPhoto(null);
    } catch (err) {
      console.error("AxiosError:", err);
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Profile Overview</h2>

          <div className="flex items-center gap-4 mb-4">
            <img
              src={
                preview ||
                (user.photoBase64
                  ? `data:image/jpeg;base64,${user.photoBase64}`
                  : "/avatar.png")
              }
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border"
            />
            <div>
              <div className="font-semibold">{user.fullName ?? "N/A"}</div>
              <div className="text-sm text-gray-500">{user.email}</div>
              <div className="text-xs text-gray-400">Role: {role}</div>
            </div>
          </div>

          <div className="space-y-1 text-sm">
            <div>
              <b>ID:</b> {user.id}
            </div>
            <div>
              <b>Username:</b> {user.userName}
            </div>
            <div>
              <b>Email Confirmed:</b> {user.emailConfirmed ? "Yes" : "No"}
            </div>
            <div>
              <b>Phone:</b> {user.phoneNumber ?? "N/A"}
            </div>
            <div>
              <b>2FA:</b> {user.twoFactorEnabled ? "Enabled" : "Disabled"}
            </div>
            <div>
              <b>Lockout:</b> {user.lockoutEnabled ? "Enabled" : "Disabled"}
            </div>
            <div>
              <b>Failed Count:</b> {user.accessFailedCount}
            </div>
          </div>
        </div>
        <div className="w-full bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
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
            <div className="mb-4">
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover border"
              />
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
