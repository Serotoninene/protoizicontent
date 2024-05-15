import { db } from "@/server/db";
import { insertUser } from "@/server/lib/user";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import PrimaryButton from "../atoms/PrimaryButton";

const AuthButtons = async () => {
  const user = await currentUser();

  if (user) {
    const dbUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, user.id),
    });

    if (!dbUser) {
      const newUser = {
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        role: "basic",
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phoneNumbers[0]?.phoneNumber,
        image: user.imageUrl,
      };

      await insertUser(newUser);
    }

    return <UserButton />;
  }

  return (
    <>
      <SignInButton mode="modal">
        <button className="text-primary-600 hover:text-primary-800">
          Sign in
        </button>
      </SignInButton>
      <PrimaryButton>Get Started</PrimaryButton>
    </>
  );
};

export default function Navbar() {
  return (
    <nav
      className="flex items-center justify-between p-6 lg:px-8 z-50"
      aria-label="Global"
    >
      <div className="flex items-start">
        <Link href="/" className="-m-1.5 p-1.5 font-bold text-xl">
          Izy Content
        </Link>
      </div>
      <div className="flex  gap-10">
        <AuthButtons />
      </div>
    </nav>
  );
}
