"use client";

import { useUsers } from "../../context/UsersContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { LimitSort } from "../../components/limitSort";
import { UserTable } from "./UserTable";
import { UserCard } from "./UserCard";
export function UsersContent() {
  const {
    users,
    searchTerm,
    setSearchTerm,
    setSortBy,
    sortBy,
    limit,
    currentPage,
    setCurrentPage,
    setLimit,
    loading,
    posts,
    todos,
    error,
  } = useUsers();

  const getPendingTodosCount = (userId: number) => {
    return todos.filter(
      (todo: any) => todo.userId === userId && !todo.completed,
    ).length;
  };

  const filteredUsers = users
    .filter((user: any) => {
      const search = searchTerm.toLowerCase();
      return (
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
      );
    })
    .sort((a: any, b: any) => {
      if (!sortBy) return 0;

      if (sortBy === "most-pending") {
        return getPendingTodosCount(b.id) - getPendingTodosCount(a.id);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    });

  useEffect(() => {
    const savedSearch = sessionStorage.getItem("searchTerm");
    const savedSort = sessionStorage.getItem("sortBy");
    const savedLimit = sessionStorage.getItem("limit");

    if (savedSearch) {
      setSearchTerm(savedSearch);
    }

    if (savedSort) {
      setSortBy(savedSort as "" | "name" | "email" | "website");
    }

    if (savedLimit) {
      setLimit(Number(savedLimit));
    }
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, limit]);

  useEffect(() => {
    sessionStorage.setItem("searchTerm", searchTerm);
    sessionStorage.setItem("sortBy", sortBy);
    sessionStorage.setItem("limit", String(limit));
  }, [searchTerm, sortBy, limit]);

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
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex justify-between">
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setSortBy(sortBy === "name" ? "" : "name")}
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
            onClick={() => setSortBy(sortBy === "email" ? "" : "email")}
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
            onClick={() => setSortBy(sortBy === "website" ? "" : "website")}
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
              setSortBy(sortBy === "most-pending" ? "" : "most-pending")
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
          <LimitSort limit={limit} setLimit={setLimit} />
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
            onClick={() => setCurrentPage((prev: number) => prev - 1)}
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
            onClick={() => setCurrentPage((prev: number) => prev + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
