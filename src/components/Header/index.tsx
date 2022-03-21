import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ActiveLink } from "../ActiveLink";
import SignInButton from "../SignInButton";

import styles from "./styles.module.scss";

export function Header() {
  const { asPath } = useRouter();

  return (
    <div>
      <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <Image
            src="/images/logo.svg"
            alt="Ig News"
            width={100}
            height={100}
          />
          <nav>
            <ActiveLink href="/" activeClass={styles.active}>
              <a>Home</a>
            </ActiveLink>
            <ActiveLink href="/posts" activeClass={styles.active} prefetch>
              <a> Posts </a>
            </ActiveLink>
          </nav>

          <SignInButton />
        </div>
      </header>
    </div>
  );
}
