'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Renders a responsive table inside a horizontally scrollable container with consistent styling and slot attributes.
 *
 * Additional props are spread onto the underlying `<table>` element and `className` is merged with the component's default classes.
 *
 * @returns The rendered table wrapped in a container `div` that includes `data-slot` attributes and combined class names.
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
 * Renders a table header (`thead`) element with default row-border styling and a `data-slot` of `table-header`.
 *
 * @returns The rendered `thead` element.
 */
function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return <thead data-slot="table-header" className={cn('[&_tr]:border-b', className)} {...props} />;
}

/**
 * Renders a table body element with consistent styling and a data-slot attribute for composition.
 *
 * @returns A `tbody` element styled with row-border suppression on the last row and the provided `className` merged with defaults.
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
 * Renders a table footer element with preset styling and a data-slot attribute for composition.
 *
 * @returns A `tfoot` element with the component's default classes applied; any provided props (including `className`) are forwarded to the element.
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
 * Renders a table row element with consistent hover, selection, and border styles.
 *
 * The returned <tr> includes a `data-slot="table-row"` attribute, merges the component's
 * predefined class names with any `className` provided, and forwards all other props.
 *
 * @returns A `<tr>` element styled for table rows with merged classes and forwarded props.
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
 * Renders a table header cell (th) with preset styles, a `data-slot="table-head"` attribute, and checkbox-aware spacing.
 *
 * @param className - Additional CSS classes that are merged with the component's default styles
 * @returns A `th` React element with the combined styling and attributes
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
 * Renders a table cell element with default padding, middle alignment, and layout adjustments when it contains a checkbox.
 *
 * @returns A `td` element with predefined class names merged with the provided `className` and all other props spread onto it.
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
 * Renders a table caption element styled for the design system and marked with a slot attribute.
 *
 * @returns The caption element with theme-aware classes and `data-slot="table-caption"`.
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