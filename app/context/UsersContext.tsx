"use client";

import { createContext, useContext, useEffect, useState } from "react";

const UsersContext = createContext<any>(null);

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [todos, setTodos] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [userTodos, setUserTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

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

  const fetchUserPosts = async (userId: string) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
    );

    const data = await res.json();
    setUserPosts(data);
  };

  const fetchUserTodos = async (userId: string) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/todos?userId=${userId}`,
    );

    const data = await res.json();
    setUserTodos(data);
  };

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

        searchTerm,
        setSearchTerm,

        sortBy,
        setSortBy,

        limit,
        setLimit,

        currentPage,
        setCurrentPage,
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

export const useUsers = () => useContext(UsersContext);
