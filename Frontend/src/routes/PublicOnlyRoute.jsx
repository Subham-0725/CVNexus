import { SignedIn, SignedOut, RedirectToUserProfile } from "@clerk/clerk-react";

export default function PublicOnlyRoute({ children }) {
  return (
    <>
      <SignedOut>{children}</SignedOut>

      <SignedIn>
        <RedirectToUserProfile />
      </SignedIn>
    </>
  );
}
