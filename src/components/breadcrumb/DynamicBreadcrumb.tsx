"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

export default function DynamicBreadcrumb() {
  const pathname = usePathname(); // e.g., "/appointments"
  const segments = pathname.split("/").filter(Boolean); // ["appointments"]

  return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Overview</BreadcrumbLink>
                </BreadcrumbItem>

                {segments.map((segment, index) => {
                    const href = "/" + segments.slice(0, index + 1).join("/");
                    const isLast = index === segments.length - 1;

                    return (
                        <React.Fragment key={href}>
                            <BreadcrumbSeparator /> {/* add separator before each segment */}
                            <BreadcrumbItem>
                            {isLast ? (
                                <BreadcrumbPage>{capitalize(segment)}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink href={href}>{capitalize(segment)}</BreadcrumbLink>
                            )}
                            </BreadcrumbItem>
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );

}

// Simple helper to capitalize first letter
function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
