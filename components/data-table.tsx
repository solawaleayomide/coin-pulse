import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

/**
 * Render a generic, stylable table driven by column definitions and row data.
 *
 * Columns define header content and a cell renderer that receives (row, rowIndex);
 * each column may also provide `headClassName` and `cellClassName` for per-column styling.
 *
 * @param columns - Array of column definitions. Each column must provide `header` (node) and `cell` (function that returns cell content for a given row and index); optional `headClassName` and `cellClassName` apply per-column classes.
 * @param data - Array of row objects to render.
 * @param rowKey - Function to produce a stable key for a row: (row, rowIndex) => string | number.
 * @param tableClassName - Optional class name applied to the outer Table element.
 * @param headerRowClassName - Optional class name applied to the header row.
 * @param headerCellClassName - Optional class name applied to all header cells.
 * @param bodyRowClassName - Optional class name applied to each body row.
 * @param bodyCellClassName - Optional class name applied to all body cells.
 * @param headerClassName - Optional class name applied to the TableHeader wrapper.
 * @returns A Table element with header and body rows generated from the provided columns and data.
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
    <Table className={cn("custom-scrollbar", tableClassName)}>
      <TableHeader className={headerClassName}>
        <TableRow className={cn("hover:bg-transparent!", headerRowClassName)}>
          {columns.map((column, colIndex) => (
            <TableHead
              key={colIndex}
              className={cn(
                "bg-dark-400 text-purple-100 py-4 first:pl-8 last:pr-8",
                headerCellClassName,
                column.headClassName
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
              "overflow-hidden rounded-lg border-b border-purple-100/5 hover:bg-dark-400/30! relative",
              bodyRowClassName
            )}
          >
            {columns.map((column, colIndex) => (
              <TableCell
                key={colIndex}
                className={cn(
                  "py-4 first:pl-8 last:pr-8",
                  bodyCellClassName,
                  column.cellClassName
                )}
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