'use client';

import { SignOutButton } from "@clerk/nextjs";
import MenuLink from "./navbar/MenuLink";

const LogoutButton: React.FC = () => {
  return (
    <SignOutButton signOutCallback={() => window.location.href = '/'}>
      {/* Clerk will trigger this when clicked */}
      <MenuLink
        label="Log-Out"
        onClick={() => {}}
      />
    </SignOutButton>
  );
};

export default LogoutButton;




