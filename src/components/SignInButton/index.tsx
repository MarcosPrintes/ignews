import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { signIn, useSession, signOut } from "next-auth/react";

import styles from "./styles.module.scss";

export default function SignInButton() {
  const { data: session, status } = useSession();

  return session ? (
    <button
      onClick={() => signOut()}
      type="button"
      className={styles.signInButton}
    >
      <FaGithub color="#04d361" />
      {session.user.name}
      <FiX color="#737380" />
    </button>
  ) : (
    <button
      onClick={() => signIn("github")}
      type="button"
      className={styles.signInButton}
    >
      <FaGithub color="#eba417" />
      sign in
    </button>
  );
}
