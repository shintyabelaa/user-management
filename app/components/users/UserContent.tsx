"use client";

import { useUsers } from "../../context/UsersContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LimitSort } from "../../components/limitSort";
import { UserTable } from "./UserTable";
import { UserCard } from "./UserCard";
import { useRouter, useSearchParams } from "next/navigation";
import { Todo, User } from "@/types";
export function UsersContent() {
  const { users, loading, posts, todos, error } = useUsers();

  const router = useRouter();
  const searchParams = useSearchParams();

  const searchTerm = searchParams.get("search") || "";
  const sortBy = searchParams.get("sort") || "";
  const limit = Number(searchParams.get("limit")) || 5;
  const currentPage = Number(searchParams.get("page")) || 1;

  const updateParams = (updates: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    router.push(`/users?${params.toString()}`);
  };

  const getPendingTodosCount = (userId: number) => {
    return todos.filter(
      (todo: Todo) => todo.userId === userId && !todo.completed,
    ).length;
  };

  const filteredUsers = users
    .filter((user: User) => {
      const search = searchTerm.toLowerCase();
      return (
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
      );
    })
    .sort((a: User, b: User) => {
      if (!sortBy) return 0;

      if (sortBy === "most-pending") {
        return getPendingTodosCount(b.id) - getPendingTodosCount(a.id);
      }

      return a[sortBy as keyof User]
        .toString()
        .localeCompare(b[sortBy as keyof User].toString());
    });

  const totalPages = Math.ceil(filteredUsers.length / limit);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * limit,
    currentPage * limit,
  );

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <Input
        className="rounded-md"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={(e) =>
          updateParams({
            search: e.target.value,
            page: 1,
          })
        }
      />
      <div className="flex justify-between">
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              updateParams({
                sort: sortBy === "name" ? "" : "name",
                page: 1,
              })
            }
            className={
              sortBy === "name"
                ? "bg-primary rounded-md  text-white"
                : "rounded-md "
            }
          >
            Sort by Name
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              updateParams({
                sort: sortBy === "email" ? "" : "email",
                page: 1,
              })
            }
            className={
              sortBy === "email"
                ? "bg-primary rounded-md  text-white"
                : "rounded-md "
            }
          >
            Sort by Email
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              updateParams({
                sort: sortBy === "website" ? "" : "website",
                page: 1,
              })
            }
            className={
              sortBy === "website"
                ? "bg-primary rounded-md  text-white"
                : "rounded-md "
            }
          >
            Sort by Website
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              updateParams({
                sort: sortBy === "most-pending" ? "" : "most-pending",
                page: 1,
              })
            }
            className={
              sortBy === "most-pending"
                ? "bg-primary rounded-md  text-white"
                : "rounded-md "
            }
          >
            Most Pending Todos
          </Button>
        </div>
        <div>
          <LimitSort
            limit={limit}
            onLimitChange={(value) =>
              updateParams({
                limit: value,
                page: 1,
              })
            }
          />
        </div>
      </div>
      <div className="md:hidden flex flex-col gap-3">
        <UserCard
          paginatedUsers={paginatedUsers}
          filteredUsers={filteredUsers}
          loading={loading}
          posts={posts}
          todos={todos}
        />
      </div>

      <div className="hidden md:block">
        <UserTable
          paginatedUsers={paginatedUsers}
          filteredUsers={filteredUsers}
          loading={loading}
          posts={posts}
          todos={todos}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="text-[10px] md:text-xs lg:text-sm">
          Showing {1 + (currentPage - 1) * limit} to{" "}
          {Math.min(currentPage * limit, filteredUsers.length)} of{" "}
          {filteredUsers.length}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="xs"
            disabled={currentPage === 1}
            onClick={() =>
              updateParams({
                page: currentPage - 1,
              })
            }
          >
            Previous
          </Button>

          <div className="text-xs md:text-sm font-medium">
            Page {currentPage} of {totalPages}
          </div>

          <Button
            variant="outline"
            size="xs"
            disabled={currentPage === totalPages}
            onClick={() =>
              updateParams({
                page: currentPage + 1,
              })
            }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
