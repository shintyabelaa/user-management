import { render, screen, waitFor } from "@testing-library/react";
import { useUsers } from "../context/UsersContext";
import UserDetailPage from "../users/[id]/page";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

jest.mock("next/navigation", () => ({
  useParams: () => ({
    id: "1",
  }),
  useSearchParams: () => ({
    toString: () => "search=leanne&sort=pending",
  }),
}));

jest.mock("../context/UsersContext", () => ({
  useUsers: jest.fn(),
}));

global.fetch = jest.fn();

describe("UserDetailPage", () => {
  beforeEach(() => {
    (useUsers as jest.Mock).mockReturnValue({
      loading: false,
      setLoading: jest.fn(),
      userPosts: [
        {
          id: 1,
          userId: 1,
          title: "Test Post",
          body: "Post body",
        },
      ],
      userTodos: [
        {
          id: 1,
          userId: 1,
          title: "Test Todo",
          completed: false,
        },
      ],
      fetchUserPosts: jest.fn(),
      fetchUserTodos: jest.fn(),
    });

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "leanne@test.com",
        phone: "123",
        website: "test.com",
        company: {
          name: "Test Company",
          catchPhrase: "Testing",
        },
        address: {
          street: "Test St",
          suite: "Apt 1",
          city: "Test City",
          zipcode: "12345",
        },
      }),
    });
  });

  it("renders user detail", async () => {
    const user = userEvent.setup();

    render(<UserDetailPage />);

    await waitFor(() => {
      expect(screen.getByText(/leanne graham/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/test post/i)).toBeInTheDocument();

    await user.click(
      screen.getByRole("tab", {
        name: /todos/i,
      }),
    );

    expect(screen.getByText(/test todo/i)).toBeInTheDocument();
  });

  it("shows loading state", () => {
    (useUsers as jest.Mock).mockReturnValue({
      loading: true,
      setLoading: jest.fn(),
      userPosts: [],
      userTodos: [],
      fetchUserPosts: jest.fn(),
      fetchUserTodos: jest.fn(),
    });

    render(<UserDetailPage />);

    expect(screen.getByText(/back to users/i)).toBeInTheDocument();
  });

  it("shows empty posts", async () => {
    (useUsers as jest.Mock).mockReturnValue({
      loading: false,
      setLoading: jest.fn(),
      userPosts: [],
      userTodos: [],
      fetchUserPosts: jest.fn(),
      fetchUserTodos: jest.fn(),
    });

    render(<UserDetailPage />);

    expect(await screen.findByText(/no posts found/i)).toBeInTheDocument();
  });

  it("shows user not found", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    render(<UserDetailPage />);

    expect(await screen.findByText(/user not found/i)).toBeInTheDocument();
  });
});
