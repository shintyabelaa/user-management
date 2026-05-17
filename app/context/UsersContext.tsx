"use client";

import { Post, Todo, User } from "@/types";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type UsersContextType = {
  users: User[];
  posts: Post[];
  todos: Todo[];

  loading: boolean;
  error: string;

  setLoading: Dispatch<SetStateAction<boolean>>;

  fetchPosts: () => Promise<void>;
  fetchTodos: () => Promise<void>;

  userPosts: Post[];
  userTodos: Todo[];

  fetchUserPosts: (userId: string) => Promise<void>;
  fetchUserTodos: (userId: string) => Promise<void>;
};

const UsersContext = createContext<UsersContextType | null>(null);

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [userTodos, setUserTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchUsers = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await res.json();
    setUsers(data);
  };

  const fetchPosts = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data = await res.json();
    setPosts(data);
  };

  const fetchTodos = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);

    if (!res.ok) {
      throw new Error("Failed to fetch todos");
    }

    const data = await res.json();
    setTodos(data);
  };

  const fetchUserPosts = useCallback(async (userId: string) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
    );

    const data = await res.json();
    setUserPosts(data);
  }, []);

  const fetchUserTodos = useCallback(async (userId: string) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/todos?userId=${userId}`,
    );

    const data = await res.json();
    setUserTodos(data);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        await Promise.all([fetchUsers(), fetchPosts(), fetchTodos()]);
      } catch (error) {
        console.error(error);
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <UsersContext.Provider
      value={{
        users,
        posts,
        todos,
        loading,
        error,

        setLoading,
        fetchPosts,
        fetchTodos,
        userPosts,
        userTodos,
        fetchUserPosts,
        fetchUserTodos,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export const useUsers = () => {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error("useUsers must be used within UsersProvider");
  }

  return context;
};
