import SignInButton from '../SignInButton'

import styles from "./styles.module.scss";

export function Header() {
  return (
    <div>
      <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <img src="images/logo.svg" alt="Ignews" />
          <nav>
            <a className={styles.active} href="#">
              Home
            </a>
            <a href="#">Dashboard</a>
          </nav>

          <SignInButton />
        </div>
      </header>
    </div>
  );
}
