import { UsersProvider } from "@/app/context/UsersContext";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const id = (await params).id;
    const user: any = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    );
    const data = await user.json();
    return {
      title: `${data.name} - User Management System`,
      description: `View details for ${data.name}. Email: ${data.email}, Phone: ${data.phone}, Website: ${data.website}`,
      openGraph: {
        title: `${data.name} - User Management System`,
        description: `User profile for ${data.name}`,
        type: "profile",
      },
    };
  } catch {
    return {
      title: "User Not Found - User Management System",
      description: "The requested user could not be found",
    };
  }
}

export default function UserDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UsersProvider>{children}</UsersProvider>;
}
