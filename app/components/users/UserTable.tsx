"use client";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Post, Todo, User } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  paginatedUsers: User[];
  filteredUsers: User[];
  loading: boolean;
  posts: Post[];
  todos: Todo[];
}

export function UserTable({
  loading,
  paginatedUsers,
  filteredUsers,
  posts,
  todos,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
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
            Completed Todos
          </TableHead>
          <TableHead className="bg-gray-100 text-center font-bold">
            Pending Todos
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          [...Array(3)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton
                  data-testid="user-table-skeleton"
                  className="h-4 w-32"
                />
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
              onClick={() =>
                router.push(`/users/${user.id}?${searchParams.toString()}`)
              }
            >
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.website}</TableCell>
              <TableCell className="text-center">
                <div className="bg-secondary/20 text-mist-500 font-semibold w-10 h-10 flex items-center justify-center rounded-xs mx-auto">
                  {posts.filter((post: Post) => post.userId === user.id).length}
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="bg-primary/20 text-primary font-semibold w-10 h-10 flex items-center justify-center rounded-xs mx-auto">
                  {
                    todos.filter(
                      (todo: Todo) => todo.userId === user.id && todo.completed,
                    ).length
                  }
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="bg-accent/20 text-accent font-semibold w-10 h-10 flex items-center justify-center rounded-xs mx-auto">
                  {
                    todos.filter(
                      (todo: Todo) =>
                        todo.userId === user.id && !todo.completed,
                    ).length
                  }
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
