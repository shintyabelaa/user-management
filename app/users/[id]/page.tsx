"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { useEffect, useState } from "react";

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [todos, setTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const id = (await params).id;
      console.log("Fetching user with ID:", id);
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await res.json();
        console.log(data);
        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchPosts = async () => {
      const id = (await params).id;
      console.log("Fetching user with ID:", id);
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${id}`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await res.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTodos = async () => {
      const id = (await params).id;
      console.log("Fetching user with ID:", id);
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/todos?userId=${id}`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch todos");
        }

        const data = await res.json();
        console.log(data);
        setTodos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
    fetchPosts();
    fetchTodos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6 flex flex-col items-center justify-center">
        <div className="flex flex-col gap-1">
          <Link href="/users" className="mb-6 inline-block">
            <Button variant="outline" size="sm">
              <HugeiconsIcon icon={ArrowLeft02Icon} />
              Back to Users
            </Button>
          </Link>

          {/* User header */}
          <Card className="p-6 md:p-8 mb-6">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-2/3" />
            {/* Contact info grid */}
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

            {/* Address */}
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
  if (!user) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <Card className="max-w-md w-full p-6 border border-border">
          <p className="text-muted-foreground text-center">User not found</p>
          <Link href="/users" className="mt-4 block">
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
      <div className="flex w-3xl flex-col gap-1">
        <Link href="/users" className="mb-6 inline-block">
          <Button variant="outline" size="sm">
            <HugeiconsIcon icon={ArrowLeft02Icon} />
            Back to Users
          </Button>
        </Link>

        {/* User header */}
        <Card className="p-6 md:p-8 mb-6">
          <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
          <p className="text-muted-foreground mb-6">@{user.username}</p>

          {/* Contact info grid */}
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

          {/* Address */}
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
                className=" group gap-2 text-muted-foreground hover:text-primary data-[state=active]:text-primary"
              >
                <HugeiconsIcon
                  icon={File02Icon}
                  className="w-5 h-5 text-current group-data-active:text-primary"
                />

                <span className="text-current group-data-active:text-primary">
                  Posts
                </span>

                <div className="w-5 h-5 rounded-full  flex items-center justify-center  text-[8px] font-medium  transition-colors  bg-gray-300  text-muted-foreground  group-hover:bg-primary  group-hover:text-white  group-data-active:bg-primary! group-data-active:text-white!">
                  {posts.filter((post) => post.userId === user.id).length}
                </div>
              </TabsTrigger>

              <TabsTrigger
                value="todos"
                className=" group gap-2 text-muted-foreground hover:text-primary data-[state=active]:text-primary"
              >
                <HugeiconsIcon
                  icon={CheckListIcon}
                  className="w-5 h-5 text-current group-data-active:text-primary"
                />
                <span className="text-current group-data-active:text-primary">
                  Todos
                </span>

                <div className="w-5 h-5 rounded-full  flex items-center justify-center  text-[8px] font-medium  transition-colors  bg-gray-300  text-muted-foreground  group-hover:bg-primary  group-hover:text-white  group-data-active:bg-primary! group-data-active:text-white!">
                  {todos.filter((todo) => todo.userId === user.id).length}
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="flex flex-col gap-4 ">
              {posts.length === 0 ? (
                <p className="text-muted-foreground text-center">
                  No posts found for this user.
                </p>
              ) : (
                posts.map((post) => (
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
            </TabsContent>

            <TabsContent value="todos" className="flex flex-col gap-4 ">
              {todos.length === 0 ? (
                <p className="text-muted-foreground text-center">
                  No todos found for this user.
                </p>
              ) : (
                todos.map((todo) => (
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
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
}
