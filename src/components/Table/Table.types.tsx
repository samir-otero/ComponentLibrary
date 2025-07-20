export interface TableColumn {
  key: string;
  title: string;
  width?: string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
}

export interface TableRow {
  id: string | number;
  [key: string]: any;
}

export interface TableProps {
  columns: TableColumn[];
  data: TableRow[];
  disabled?: boolean;
  striped?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
  size?: "small" | "medium" | "large";
  caption?: string;
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: TableRow) => void;
  onSort?: (columnKey: string, direction: "asc" | "desc") => void;
  className?: string;
  maxHeight?: string;
  backgroundColor?: string;
  headerBackgroundColor?: string;
  footerBackgroundColor?: string;
  textColor?: string;
  borderColor?: string;
}

export interface TableHeaderProps {
  columns: TableColumn[];
  disabled?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  onSort?: (columnKey: string, direction: "asc" | "desc") => void;
  sortColumn?: string;
  sortDirection?: "asc" | "desc";
}

export interface TableRowProps {
  row: TableRow;
  columns: TableColumn[];
  disabled?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  onClick?: (row: TableRow) => void;
  index: number;
}

export interface TableCellProps {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  width?: string;
  disabled?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
}

export interface TableFooterProps {
  children?: React.ReactNode;
  disabled?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  columnsCount: number;
}
