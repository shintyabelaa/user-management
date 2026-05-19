"use client";

import { useUsers } from "../../context/UsersContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Post, Todo, User } from "@/types";
import {
  ArrowLeft02Icon,
  Building,
  CheckListIcon,
  File02Icon,
  Globe,
  Mail,
  MapPin,
  Phone,
  Time02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function UserDetailPageContent() {
  const {
    loading,
    setLoading,
    userPosts,
    userTodos,
    fetchUserTodos,
    fetchUserPosts,
  } = useUsers();
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const [user, setUser] = useState<User>();
  const [visiblePosts, setVisiblePosts] = useState(5);
  const [visibleTodos, setVisibleTodos] = useState(5);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);

        setVisiblePosts(5);
        setVisibleTodos(5);

        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`,
        );

        if (!res.ok) {
          setUser(undefined);
          return;
        }

        const data: User = await res.json();

        setUser(data);

        await Promise.all([fetchUserPosts(id), fetchUserTodos(id)]);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id, fetchUserPosts, fetchUserTodos, setLoading]);

  if (error) {
    throw error;
  }

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-background p-6 flex flex-col items-center justify-center">
        <div className="flex w-full flex-col gap-1">
          <Link
            href={`/users?${searchParams.toString()}`}
            className="mb-6 inline-block"
          >
            <Button variant="outline" size="sm">
              <HugeiconsIcon icon={ArrowLeft02Icon} />
              Back to Users
            </Button>
          </Link>

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
        </div>
      </div>
    );
  }

  if (!user || error) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <Card className="max-w-md w-full p-6 border border-border">
          <p className="text-muted-foreground text-center">User not found</p>
          <Link
            href={`/users?${searchParams.toString()}`}
            className="mt-4 block"
          >
            <Button variant="outline" size="sm" className="w-full">
              <HugeiconsIcon icon={ArrowLeft02Icon} />
              Back to Users
            </Button>
          </Link>
        </Card>
      </div>
    );
  }
  return (
    <div className="min-h-screen w-full bg-background p-6 flex flex-col items-center justify-center">
      <div className="flex w-full md:max-w-3xl flex-col gap-1">
        <Link
          href={`/users?${searchParams.toString()}`}
          className="mb-6 inline-block"
        >
          <Button variant="outline" size="sm">
            <HugeiconsIcon icon={ArrowLeft02Icon} />
            Back to Users
          </Button>
        </Link>

        <Card className="p-6 md:p-8 mb-6">
          <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
          <p className="text-muted-foreground mb-6">@{user.username}</p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start gap-3">
              <HugeiconsIcon icon={Mail} className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Email
                </p>
                <a
                  href={`mailto:${user.email}`}
                  className="text-primary hover:underline break-all"
                >
                  {user.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <HugeiconsIcon icon={Phone} className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Phone
                </p>
                <a
                  href={`tel:${user.phone}`}
                  className="text-primary hover:underline"
                >
                  {user.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <HugeiconsIcon icon={Globe} className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Website
                </p>
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {user.website}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <HugeiconsIcon icon={Building} className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Company
                </p>
                <p className="font-medium text-foreground">
                  {user.company.name}
                </p>
                <p className="text-sm text-muted-foreground italic">
                  {user.company.catchPhrase}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-6 border-t border-border">
            <HugeiconsIcon icon={MapPin} className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                Address
              </p>
              <p className="font-medium text-foreground">
                {user.address.street}, {user.address.suite}
              </p>
              <p className="text-sm text-muted-foreground">
                {user.address.city}, {user.address.zipcode}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 md:p-8 mb-6 w-full max-w-3xl">
        <div>
          <Tabs defaultValue="posts">
            <TabsList className="flex w-full justify-start mb-6">
              <TabsTrigger
                value="posts"
                className="cursor-pointer group gap-2 text-muted-foreground hover:text-primary data-[state=active]:text-primary"
              >
                <HugeiconsIcon
                  icon={File02Icon}
                  className="w-5 h-5 text-current group-data-active:text-primary"
                />

                <span className="text-current group-data-active:text-primary">
                  Posts
                </span>

                <div className="w-5 h-5 rounded-full  flex items-center justify-center  text-[8px] font-medium  transition-colors  bg-gray-300  text-muted-foreground  group-hover:bg-primary  group-hover:text-white  group-data-active:bg-primary! group-data-active:text-white!">
                  {
                    userPosts.filter((post: Post) => post.userId === user.id)
                      .length
                  }
                </div>
              </TabsTrigger>

              <TabsTrigger
                value="todos"
                className="cursor-pointer group gap-2 text-muted-foreground hover:text-primary data-[state=active]:text-primary"
              >
                <HugeiconsIcon
                  icon={CheckListIcon}
                  className="w-5 h-5 text-current group-data-active:text-primary"
                />
                <span className="text-current group-data-active:text-primary">
                  Todos
                </span>

                <div className="w-5 h-5 rounded-full  flex items-center justify-center  text-[8px] font-medium  transition-colors  bg-gray-300  text-muted-foreground  group-hover:bg-primary  group-hover:text-white  group-data-active:bg-primary! group-data-active:text-white!">
                  {
                    userTodos.filter((todo: Todo) => todo.userId === user.id)
                      .length
                  }
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="flex flex-col gap-4 ">
              {userPosts.length === 0 ? (
                <p className="text-muted-foreground text-center">
                  No posts found for this user.
                </p>
              ) : (
                userPosts.slice(0, visiblePosts).map((post: Post) => (
                  <Card
                    key={post.id}
                    className=" w-full p-6 border border-border"
                  >
                    <div className="flex flex-col gap-2">
                      <h3 className="font-semibold capitalize text-foreground">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {post.body}
                      </p>
                    </div>
                  </Card>
                ))
              )}
              {visiblePosts < userPosts.length && (
                <Button
                  variant="outline"
                  onClick={() => setVisiblePosts((prev) => prev + 5)}
                >
                  Show More Posts
                </Button>
              )}
            </TabsContent>

            <TabsContent value="todos" className="flex flex-col gap-4 ">
              {userTodos.length === 0 ? (
                <p className="text-muted-foreground text-center">
                  No todos found for this user.
                </p>
              ) : (
                userTodos.slice(0, visibleTodos).map((todo: Todo) => (
                  <Card
                    key={todo.id}
                    className=" w-full p-6 border border-border"
                  >
                    <div className="flex gap-4">
                      {todo.completed ? (
                        <HugeiconsIcon
                          icon={CheckListIcon}
                          size={20}
                          className="text-green-700"
                        />
                      ) : (
                        <HugeiconsIcon
                          icon={Time02Icon}
                          size={20}
                          className="text-yellow-700"
                        />
                      )}

                      {todo.completed ? (
                        <p className="text-sm line-through text-muted-foreground font-semibold">
                          {todo.title}
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground font-semibold">
                          {todo.title}
                        </p>
                      )}
                    </div>
                  </Card>
                ))
              )}
              {visibleTodos < userTodos.length && (
                <Button
                  variant="outline"
                  onClick={() => setVisibleTodos((prev) => prev + 5)}
                >
                  Show More Todos
                </Button>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
}

export default function UserDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full bg-background p-6 flex items-center justify-center">
          <div className="text-muted-foreground animate-pulse">
            Loading user profile...
          </div>
        </div>
      }
    >
      <UserDetailPageContent />
    </Suspense>
  );
}
