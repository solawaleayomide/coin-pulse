import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants, type Button } from "@/components/ui/button"

/**
 * Renders a centered nav element intended to contain pagination controls.
 *
 * @returns The rendered `nav` element configured for pagination (`role="navigation"`, `aria-label="pagination"`, `data-slot="pagination"`) with merged class names and any forwarded props.
 */
function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

/**
 * Container list for pagination items that applies spacing and exposes a data slot.
 *
 * @param className - Additional CSS classes to apply to the list
 * @returns The rendered unordered list element that holds pagination items
 */
function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  )
}

/**
 * Renders a list item used as a pagination slot.
 *
 * @returns An `<li>` element with `data-slot="pagination-item"` and any passed props spread onto it.
 */
function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

/**
 * Renders a styled pagination link anchor element that reflects its active state.
 *
 * @param isActive - When `true`, marks the link as the current page (`aria-current="page"`) and applies active styling.
 * @param size - Controls the button size variant passed to the underlying styling system; defaults to `"icon"`.
 * @returns An anchor element representing a pagination link; `aria-current` and `data-active` reflect the active state.
 */
function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a "Previous" pagination link with a left chevron and accessible label.
 *
 * @param className - Additional class names to append to the link
 * @param props - Additional props forwarded to PaginationLink (anchor attributes and PaginationLink options)
 * @returns The pagination link element labeled "Previous" containing a left chevron icon and hidden text shown on larger screens
 */
function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  )
}

/**
 * Render a "Next" pagination control with a right-facing chevron and responsive label.
 *
 * @param props - Props forwarded to the underlying PaginationLink; the `className` passed will be merged with the component's default classes.
 * @returns A PaginationLink element configured as the "next page" control with `aria-label="Go to next page"`, `size="default"`, and the combined class names.
 */
function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}

/**
 * Renders a pagination ellipsis indicator with an accessible label.
 *
 * @returns A span element containing an ellipsis icon and a screen-reader-only "More pages" label
 */
function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}