"use client";

import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <div>
      <RegisterLink>Sign Up</RegisterLink>
      <LoginLink>Sign in</LoginLink>
      <LogoutLink>Log out</LogoutLink>
    </div>
  );
}
