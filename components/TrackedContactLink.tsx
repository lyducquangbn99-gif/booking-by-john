"use client";

import type { MouseEvent, ReactNode } from "react";
import { trackBookingEvent } from "@/lib/analytics";

type Props = {
  href: string;
  channel: "whatsapp" | "email" | "phone";
  placement: string;
  className?: string;
  target?: string;
  rel?: string;
  children: ReactNode;
};

export default function TrackedContactLink({
  href,
  channel,
  placement,
  className,
  target,
  rel,
  children,
}: Props) {
  function handleClick(_event: MouseEvent<HTMLAnchorElement>) {
    trackBookingEvent("contact_click", {
      contact_channel: channel,
      contact_placement: placement,
    });
  }

  return (
    <a
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
