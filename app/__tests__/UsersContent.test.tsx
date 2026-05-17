import { render, screen } from "@testing-library/react";
import { UsersProvider } from "../context/UsersContext";
import { UsersContent } from "../components/users/UserContent";
import userEvent from "@testing-library/user-event";

const push = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
    replace: jest.fn(),
    refresh: jest.fn(),
  }),

  useSearchParams: () => ({
    get: (key: string) => {
      const params: Record<string, string> = {
        search: "",
        sort: "",
        limit: "5",
        page: "1",
      };

      return params[key];
    },

    toString: () => "",
  }),
}));

global.fetch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();

  (fetch as jest.Mock).mockImplementation((url) => {
    if (url.includes("users")) {
      return Promise.resolve({
        ok: true,
        json: async () => [
          {
            id: 1,
            name: "Leanne Graham",
            email: "leanne@test.com",
            website: "test.com",
          },
        ],
      });
    }

    if (url.includes("posts")) {
      return Promise.resolve({
        ok: true,
        json: async () => [],
      });
    }

    if (url.includes("todos")) {
      return Promise.resolve({
        ok: true,
        json: async () => [],
      });
    }
  });
});

describe("UsersContent", () => {
  it("renders search input", async () => {
    render(
      <UsersProvider>
        <UsersContent />
      </UsersProvider>,
    );

    expect(
      await screen.findByPlaceholderText(/search by name or email/i),
    ).toBeInTheDocument();
  });

  it("updates search params when typing", async () => {
    render(
      <UsersProvider>
        <UsersContent />
      </UsersProvider>,
    );

    const input = screen.getByPlaceholderText(/search by name/i);

    await userEvent.type(input, "Leanne");

    expect(push).toHaveBeenCalled();
  });

  it("updates sort params", async () => {
    render(
      <UsersProvider>
        <UsersContent />
      </UsersProvider>,
    );

    const button = screen.getByText(/most pending todos/i);

    await userEvent.click(button);

    expect(push).toHaveBeenCalledWith(
      expect.stringContaining("sort=most-pending"),
    );
  });

  it("shows empty state", async () => {
    (fetch as jest.Mock).mockImplementation((url) => {
      if (url.includes("users")) {
        return Promise.resolve({
          ok: true,
          json: async () => [],
        });
      }

      return Promise.resolve({
        ok: true,
        json: async () => [],
      });
    });

    render(
      <UsersProvider>
        <UsersContent />
      </UsersProvider>,
    );

    expect(await screen.findAllByText(/no users found/i)).toHaveLength(2);
  });

  it("shows loading state", () => {
    (fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));

    render(
      <UsersProvider>
        <UsersContent />
      </UsersProvider>,
    );

    expect(screen.getAllByTestId("user-table-skeleton").length).toBeGreaterThan(
      0,
    );
  });

  it("shows error state", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    (fetch as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    render(
      <UsersProvider>
        <UsersContent />
      </UsersProvider>,
    );

    expect(
      await screen.findByText(/failed to load users/i),
    ).toBeInTheDocument();
  });
});
