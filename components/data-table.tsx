import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

/**
 * Render a configurable table for arbitrary row data using the provided column definitions.
 *
 * @param columns - Column definitions; each item must provide a `header` node and a `cell` renderer `(row, rowIndex) => ReactNode`
 * @param data - Array of row items to render
 * @param rowKey - Function that returns a unique key for a row given `(row, rowIndex)`
 * @param tableClassName - Additional class names applied to the root Table element
 * @param headerRowClassName - Additional class names applied to the header row
 * @param headerCellClassName - Additional class names applied to each header cell
 * @param bodyRowClassName - Additional class names applied to each body row
 * @param bodyCellClassName - Additional class names applied to each body cell
 * @param headerClassName - Additional class names applied to the TableHeader element
 * @returns The rendered Table element populated with the provided columns and data
 */
export function DataTable<T>({
  columns,
  data,
  rowKey,
  tableClassName,
  headerRowClassName,
  headerCellClassName,
  bodyRowClassName,
  bodyCellClassName,
  headerClassName,
}: DataTableProps<T>) {
  return (
    <Table className={cn('custom-scrollbar', tableClassName)}>
      <TableHeader className={headerClassName}>
        <TableRow className={cn('hover:bg-transparent!', headerRowClassName)}>
          {columns.map((column, colIndex) => (
            <TableHead
              key={colIndex}
              className={cn(
                'bg-dark-400 text-purple-100 py-4 first:pl-5 last:pr-5',
                headerCellClassName,
              )}
            >
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow
            key={rowKey(row, rowIndex)}
            className={cn(
              'overflow-hidden rounded-lg border-b border-purple-100/5 hover:bg-dark-400/30! relative',
              bodyRowClassName,
            )}
          >
            {columns.map((column, colIndex) => (
              <TableCell
                key={colIndex}
                className={cn('py-4 first:pl-5 last:pr-5', bodyCellClassName)}
              >
                {column.cell(row, rowIndex)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}