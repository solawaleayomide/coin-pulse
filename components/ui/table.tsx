'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Render a responsive, styled HTML table wrapped in a container with slot attributes.
 *
 * @param className - Additional CSS classes to apply to the table element
 * @param props - Additional attributes and event handlers forwarded to the underlying `table` element
 * @returns The table JSX element wrapped in a responsive container with `data-slot="table-container"` and `data-slot="table"`
 */
function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table
        data-slot="table"
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  );
}

/**
 * Renders a styled table header (<thead>) with a data-slot attribute.
 *
 * Applies a default row-bottom-border style, merges any provided `className`, and forwards remaining props to the underlying `<thead>`.
 *
 * @param className - Additional CSS classes to merge with the component's default classes
 * @returns The rendered `<thead>` element with applied attributes and forwarded props
 */
function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return <thead data-slot="table-header" className={cn('[&_tr]:border-b', className)} {...props} />;
}

/**
 * Renders the table body element for the styled table.
 *
 * @returns A `tbody` element with `data-slot="table-body"`, a merged `className` that removes the bottom border from the last row, and all provided props forwarded to it.
 */
function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  );
}

/**
 * Renders a styled table footer element.
 *
 * The rendered element is a <tfoot> with data-slot="table-footer" and footer-specific styling classes
 * (translucent background, top border, medium font weight, and removal of the bottom border on the last row).
 *
 * @returns The rendered `<tfoot>` element used as the table footer
 */
function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn('bg-muted/50 border-t font-medium [&>tr]:last:border-b-0', className)}
      {...props}
    />
  );
}

/**
 * Renders a table row element (<tr>) with standard row styling and a `data-slot="table-row"` attribute.
 *
 * @param className - Additional CSS classes to merge with the component's default row classes.
 * @returns A React `<tr>` element with merged classes, hover and selected-state styles, a bottom border, and `data-slot="table-row"`.
 */
function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders a styled table header cell with a data-slot attribute for consistent composition.
 *
 * @param className - Additional CSS classes to append to the component's default styles
 * @returns The rendered table header cell element
 */
function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        'text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders a table cell (<td>) with consistent padding, alignment, whitespace handling, checkbox-aware selectors, and a data-slot attribute.
 *
 * Forwards any additional props to the rendered <td>.
 *
 * @returns The rendered `<td>` element with merged `className` and `data-slot="table-cell"`.
 */
function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders a table caption element with muted styling and a data-slot attribute.
 *
 * @param className - Additional CSS class names merged with the default caption styles
 * @param props - Additional native caption attributes forwarded to the caption element
 * @returns The rendered caption element for use inside a table
 */
function TableCaption({ className, ...props }: React.ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn('text-muted-foreground mt-4 text-sm', className)}
      {...props}
    />
  );
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };