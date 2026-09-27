"use client";

import Link from "next/link";

import { INavigateOptions, usePageTransition } from "./TransitionProvider";

interface IProps extends Omit<React.ComponentProps<typeof Link>, "href"> {
  href: string;
  label: string;
  transition?: INavigateOptions;
}

function isModifiedClick(event: React.MouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
}

export default function TransitionLink({ href, label, transition, onClick, ...props }: IProps) {
  const { navigate } = usePageTransition();

  return (
    <Link
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || isModifiedClick(event)) return;
        event.preventDefault();
        navigate(href, label, transition);
      }}
      {...props}
    />
  );
}
