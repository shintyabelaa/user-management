"use client";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/types";
import { useRouter } from "next/navigation";

interface Props {
  paginatedUsers: any[];
  filteredUsers: any[];
  loading: boolean;
  posts: any[];
  todos: any[];
}

export function UserCard({
  loading,
  paginatedUsers,
  filteredUsers,
  posts,
  todos,
}: Props) {
  const router = useRouter();

  if (loading) {
    return (
      <Card className="p-6 md:p-8 mb-6">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-2/3" />
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="flex flex-col items-start gap-3">
            <Skeleton className="h-4 w-37.5" />
            <Skeleton className="h-4 w-25" />
          </div>

          <div className="flex flex-col items-start gap-3">
            <Skeleton className="h-4 w-37.5" />
            <Skeleton className="h-4 w-25" />
          </div>

          <div className="flex flex-col items-start gap-3">
            <Skeleton className="h-4 w-37.5" />
            <Skeleton className="h-4 w-25" />
          </div>

          <div className="flex flex-col items-start gap-3">
            <Skeleton className="h-4 w-37.5" />
            <Skeleton className="h-4 w-25" />
          </div>
        </div>

        <div className="flex items-start gap-3 pt-6 border-t border-border">
          <div className="flex flex-col items-start gap-3">
            <Skeleton className="h-4 w-37.5" />

            <Skeleton className="h-4 w-25" />
            <Skeleton className="h-4 w-25" />
          </div>
        </div>
      </Card>
    );
  }
  if (filteredUsers.length === 0) {
    return (
      <Card>
        <div>No users found.</div>
      </Card>
    );
  }
  return paginatedUsers.map((user: User) => (
    <Card
      key={user.id}
      className="cursor-pointer p-6 "
      onClick={() => router.push(`/users/${user.id}`)}
    >
      <div className="flex flex-col gap-3">
        <div className="text-primary font-bold capitalize text-lg">
          {user.name}
        </div>
        <div className="mt-4">{user.email}</div>
        <div>{user.website}</div>
        <hr className="h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
        <div className="flex justify-between px-8">
          <div className="flex flex-col items-center">
            <div className="">Posts</div>
            <div className="font-bold text-mist-500">
              {posts.filter((post: any) => post.userId === user.id).length}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="">Done</div>
            <div className="font-bold text-primary">
              {
                todos.filter(
                  (todo: any) => todo.userId === user.id && todo.completed,
                ).length
              }{" "}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="">Pending</div>
            <div className="font-bold text-accent">
              {
                todos.filter(
                  (todo: any) => todo.userId === user.id && !todo.completed,
                ).length
              }{" "}
            </div>
          </div>
        </div>
      </div>
    </Card>
  ));
}
