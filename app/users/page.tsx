"use client";

import { UsersProvider } from "../context/UsersContext";
import { UsersContent } from "../components/users/UserContent";

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-6 p-16">
      <div className="">
        <h1 className="text-2xl font-bold">Users</h1>
        <div className="text-sm text-muted-foreground">
          Manage and view user information and activity
        </div>
      </div>

      <UsersProvider>
        <UsersContent />
      </UsersProvider>
    </div>
  );
}
