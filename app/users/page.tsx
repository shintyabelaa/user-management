"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { use, useEffect, useState, useTransition } from "react";
import { LimitSort } from "../components/limitSort";

export default function UsersPage() {
  type User = {
    id: number;
    name: string;
    email: string;
    website: string;
  };

  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "email" | "website" | "">("");
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [todos, setTodos] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://jsonplaceholder.typicode.com/users");

        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const data: User[] = await res.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTodos = async () => {
      try {
        const res = await fetch("http://jsonplaceholder.typicode.com/todos");

        if (!res.ok) {
          throw new Error("Failed to fetch todos");
        }

        const data = await res.json();

        console.log(data, "todos");
        setTodos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await fetch("http://jsonplaceholder.typicode.com/posts");

        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await res.json();
        console.log(data, "posts");
        setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAllData = async () => {
      setLoading(true);

      await Promise.all([fetchUsers(), fetchPosts(), fetchTodos()]);

      setLoading(false);
    };

    fetchAllData();

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
    sessionStorage.setItem("searchTerm", searchTerm);
    sessionStorage.setItem("sortBy", sortBy);
    sessionStorage.setItem("limit", String(limit));
  }, [searchTerm, sortBy, limit]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, limit]);
  const filteredUsers = users
    .filter((user) => {
      const search = searchTerm.toLowerCase();

      return (
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
      );
    })
    .sort((a, b) => {
      if (!sortBy) return 0;

      return a[sortBy].localeCompare(b[sortBy]);
    });
  const totalPages = Math.ceil(filteredUsers.length / limit);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * limit,
    currentPage * limit,
  );
  return (
    <div className="flex flex-col gap-6 p-16">
      <div className="">
        <h1 className="text-2xl font-bold">Users</h1>
        <div className="text-sm text-muted-foreground">
          Manage and view user information, activity signals, and operations
        </div>
      </div>
      <Input
        className="rounded-md"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setSortBy("name")}
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
            onClick={() => setSortBy("email")}
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
            onClick={() => setSortBy("website")}
            className={
              sortBy === "website"
                ? "bg-primary rounded-md  text-white"
                : "rounded-md "
            }
          >
            Sort by Website
          </Button>
        </div>
        <div>
          <LimitSort limit={limit} setLimit={setLimit} />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="bg-gray-100 font-bold">Name</TableHead>
            <TableHead className="bg-gray-100 font-bold">Email</TableHead>
            <TableHead className="bg-gray-100 font-bold">Website</TableHead>
            <TableHead className="bg-gray-100 text-center font-bold">
              Total Posts
            </TableHead>

            <TableHead className="bg-gray-100 text-center font-bold">
              Pending Todos
            </TableHead>
            <TableHead className="bg-gray-100 text-center font-bold">
              Completed Todos
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            [...Array(3)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>

                <TableCell>
                  <Skeleton className="h-4 w-48" />
                </TableCell>

                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>

                <TableCell className="text-center">
                  <Skeleton className="h-10 w-10 rounded-xs mx-auto" />
                </TableCell>

                <TableCell className="text-center">
                  <Skeleton className="h-10 w-10 rounded-xs mx-auto" />
                </TableCell>

                <TableCell className="text-center">
                  <Skeleton className="h-10 w-10 rounded-xs mx-auto" />
                </TableCell>
              </TableRow>
            ))
          ) : filteredUsers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            paginatedUsers.map((user: User) => (
              <TableRow
                key={user.id}
                className="cursor-pointer"
                onClick={() => router.push(`/users/${user.id}`)}
              >
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.website}</TableCell>
                <TableCell className="text-center">
                  <div className="bg-secondary/20 text-mist-500 font-semibold w-10 h-10 flex items-center justify-center rounded-xs mx-auto">
                    {posts.filter((post) => post.userId === user.id).length}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="bg-primary/20 text-primary font-semibold w-10 h-10 flex items-center justify-center rounded-xs mx-auto">
                    {
                      todos.filter(
                        (todo) => todo.userId === user.id && !todo.completed,
                      ).length
                    }
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="bg-accent/20 text-accent font-semibold w-10 h-10 flex items-center justify-center rounded-xs mx-auto">
                    {
                      todos.filter(
                        (todo) => todo.userId === user.id && todo.completed,
                      ).length
                    }
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <div className="flex justify-between">
        <div>
          Showing {1 + (currentPage - 1) * limit} to{" "}
          {Math.min(currentPage * limit, filteredUsers.length)} of{" "}
          {filteredUsers.length}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </Button>

          <div className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </div>

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
