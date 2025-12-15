import React from "react";

export default function UserProfile() {
  const userData = {
    user: {
      id: "9a1f758d-06f6-485c-ad87-943a9933cfd4",
      userName: "admin@example.com",
      email: "admin@example.com",
      emailConfirmed: true,
      phoneNumber: null,
      twoFactorEnabled: false,
      lockoutEnabled: true,
      accessFailedCount: 0,
    },
    userRoles: ["Admin"],
  };

  const { user, userRoles } = userData;

  return (
    <div className="h-120 w-full flex justify-center items-center p-8">
      <div className="w-full h-full max-w-md bg-white border border-gray-300 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">User Profile</h2>
        <div className="mb-2">
          <span className="font-medium">ID: </span>
          <span>{user.id}</span>
        </div>
        <div className="mb-2">
          <span className="font-medium">Username: </span>
          <span>{user.userName}</span>
        </div>
        <div className="mb-2">
          <span className="font-medium">Email: </span>
          <span>{user.email}</span>
        </div>
        <div className="mb-2">
          <span className="font-medium">Email Confirmed: </span>
          <span>{user.emailConfirmed ? "Yes" : "No"}</span>
        </div>
        <div className="mb-2">
          <span className="font-medium">Phone Number: </span>
          <span>{user.phoneNumber || "N/A"}</span>
        </div>
        <div className="mb-2">
          <span className="font-medium">Two Factor Enabled: </span>
          <span>{user.twoFactorEnabled ? "Yes" : "No"}</span>
        </div>
        <div className="mb-2">
          <span className="font-medium">Lockout Enabled: </span>
          <span>{user.lockoutEnabled ? "Yes" : "No"}</span>
        </div>
        <div className="mb-2">
          <span className="font-medium">Access Failed Count: </span>
          <span>{user.accessFailedCount}</span>
        </div>
        <div className="mt-4">
          <span className="font-medium">Roles: </span>
          <span>{userRoles.join(", ")}</span>
        </div>
      </div>
    </div>
  );
}
