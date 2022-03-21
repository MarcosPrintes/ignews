import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactElement, cloneElement } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  activeClass: string;
}

export const ActiveLink = ({
  children,
  activeClass,
  ...rest
}: ActiveLinkProps) => {
  const { asPath } = useRouter();

  const className = asPath === rest.href ? activeClass : "";

  return (
    <Link {...rest}>
      {cloneElement(children, {
        className,
      })}
    </Link>
  );
};
