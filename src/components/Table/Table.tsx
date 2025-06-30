import React, { useState } from 'react';
import styled from 'styled-components';
import {
  TableProps,
  TableHeaderProps,
  TableRowProps,
  TableCellProps,
  TableFooterProps,
  TableColumn,
  TableRow
} from './Table.types';

const StyledTable = styled.table<{
  disabled?: boolean;
  size?: string;
  bordered?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  maxHeight?: string;
}>`
  width: 100%;
  border-collapse: collapse;
  font-family: inherit;
  background-color: ${({ backgroundColor }) => backgroundColor || 'transparent'};
  border: ${({ bordered, borderColor }) =>
    bordered ? `1px solid ${borderColor || '#dee2e6'}` : 'none'};
  opacity: ${({ disabled }) => disabled ? 0.65 : 1};
  pointer-events: ${({ disabled }) => disabled ? 'none' : 'auto'};

  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          font-size: 12px;
          th, td {
            padding: 4px 8px;
          }
        `;
      case 'large':
        return `
          font-size: 18px;
          th, td {
            padding: 16px 20px;
          }
        `;
      default:
        return `
          font-size: 14px;
          th, td {
            padding: 12px 16px;
          }
        `;
    }
  }}

  ${({ maxHeight }) => maxHeight && `
    display: block;
    overflow-y: auto;
    max-height: ${maxHeight};

    thead, tbody, tr {
      display: table;
      width: 100%;
      table-layout: fixed;
    }
  `}

  @media (max-width: 768px) {
    font-size: 12px;

    th, td {
      padding: 8px 12px;
    }

    ${({ size }) => size === 'small' && `
      th, td {
        padding: 4px 6px;
      }
    `}
  }

  @media (max-width: 480px) {
    font-size: 11px;

    th, td {
      padding: 6px 8px;
    }
  }
`;

const StyledTableHeader = styled.thead<{
  disabled?: boolean;
  backgroundColor?: string;
  borderColor?: string;
}>`
  background-color: ${({ backgroundColor }) => backgroundColor || '#f8f9fa'};

  tr {
    border-bottom: 2px solid ${({ borderColor }) => borderColor || '#dee2e6'};
  }
`;

const StyledTableHeaderCell = styled.th<{
  align?: string;
  width?: string;
  sortable?: boolean;
  disabled?: boolean;
  textColor?: string;
}>`
  text-align: ${({ align }) => align || 'left'};
  width: ${({ width }) => width || 'auto'};
  font-weight: 600;
  color: ${({ textColor }) => textColor || '#212529'};
  cursor: ${({ sortable, disabled }) =>
    !disabled && sortable ? 'pointer' : 'default'};
  user-select: none;
  position: relative;

  &:hover {
    ${({ sortable, disabled }) =>
      !disabled && sortable && `
        background-color: rgba(0, 0, 0, 0.05);
      `}
  }
`;

const SortIcon = styled.span<{ direction?: 'asc' | 'desc' }>`
  margin-left: 8px;
  font-size: 12px;
  color: #6c757d;

  &::after {
    content: '${({ direction }) =>
      direction === 'asc' ? '↑' : direction === 'desc' ? '↓' : '↕'}';
  }
`;

const StyledTableBody = styled.tbody``;

const StyledTableRow = styled.tr<{
  disabled?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  index: number;
  clickable?: boolean;
}>`
  background-color: ${({ backgroundColor, striped, index }) => {
    if (backgroundColor) return backgroundColor;
    if (striped && index % 2 === 1) return '#f8f9fa';
    return 'transparent';
  }};
  border-bottom: 1px solid ${({ borderColor }) => borderColor || '#dee2e6'};
  cursor: ${({ clickable, disabled }) =>
    !disabled && clickable ? 'pointer' : 'default'};

  &:hover {
    ${({ hoverable, disabled }) =>
      !disabled && hoverable && `
        background-color: rgba(0, 123, 255, 0.1);
      `}
  }

  &:last-child {
    border-bottom: none;
  }
`;

const StyledTableCell = styled.td<{
  align?: string;
  width?: string;
  disabled?: boolean;
  textColor?: string;
  backgroundColor?: string;
}>`
  text-align: ${({ align }) => align || 'left'};
  width: ${({ width }) => width || 'auto'};
  color: ${({ textColor }) => textColor || '#212529'};
  vertical-align: top;
  background-color: ${({ backgroundColor }) => backgroundColor || 'transparent'};
`;

const StyledTableFooter = styled.tfoot<{
  disabled?: boolean;
  backgroundColor?: string;
  borderColor?: string;
}>`
  background-color: ${({ backgroundColor }) => backgroundColor || '#f8f9fa'};

  tr {
    border-top: 2px solid ${({ borderColor }) => borderColor || '#dee2e6'};
  }
`;

const StyledCaption = styled.caption`
  padding: 12px;
  text-align: left;
  font-weight: 600;
  color: #6c757d;
  caption-side: top;
`;

const LoadingOverlay = styled.div`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #6c757d;
  font-style: italic;
`;

// Table Header Component
export const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  disabled = false,
  backgroundColor,
  textColor,
  borderColor,
  onSort,
  sortColumn,
  sortDirection,
}) => {
  const handleSort = (column: TableColumn) => {
    if (!disabled && column.sortable && onSort) {
      const newDirection =
        sortColumn === column.key && sortDirection === 'asc' ? 'desc' : 'asc';
      onSort(column.key, newDirection);
    }
  };

  return (
    <StyledTableHeader
      disabled={disabled}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
    >
      <tr>
        {columns.map((column) => (
          <StyledTableHeaderCell
            key={column.key}
            align={column.align}
            width={column.width}
            sortable={column.sortable}
            disabled={disabled}
            textColor={textColor}
            onClick={() => handleSort(column)}
          >
            {column.title}
            {column.sortable && (
              <SortIcon
                direction={
                  sortColumn === column.key ? sortDirection : undefined
                }
              />
            )}
          </StyledTableHeaderCell>
        ))}
      </tr>
    </StyledTableHeader>
  );
};

// Table Row Component
export const TableRowComponent: React.FC<TableRowProps> = ({
  row,
  columns,
  disabled = false,
  striped = false,
  hoverable = false,
  backgroundColor,
  textColor,
  borderColor,
  onClick,
  index,
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick(row);
    }
  };

  return (
    <StyledTableRow
      disabled={disabled}
      striped={striped}
      hoverable={hoverable}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      index={index}
      clickable={!!onClick}
      onClick={handleClick}
    >
      {columns.map((column) => (
        <TableCell
          key={column.key}
          align={column.align}
          width={column.width}
          disabled={disabled}
          textColor={textColor}
        >
          {row[column.key] || ''}
        </TableCell>
      ))}
    </StyledTableRow>
  );
};

// Table Cell Component
export const TableCell: React.FC<TableCellProps> = ({
  children,
  align = 'left',
  width,
  disabled = false,
  backgroundColor,
  textColor,
  borderColor,
}) => {
  return (
    <StyledTableCell
      align={align}
      width={width}
      disabled={disabled}
      backgroundColor={backgroundColor}
      textColor={textColor}
    >
      {children}
    </StyledTableCell>
  );
};

// Table Footer Component
export const TableFooter: React.FC<TableFooterProps> = ({
  children,
  disabled = false,
  backgroundColor,
  textColor,
  borderColor,
  columnsCount,
}) => {
  return (
    <StyledTableFooter
      disabled={disabled}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
    >
      <tr>
        <td colSpan={columnsCount} style={{ color: textColor }}>
          {children}
        </td>
      </tr>
    </StyledTableFooter>
  );
};

// Main Table Component
export const Table: React.FC<TableProps> = ({
  columns,
  data,
  disabled = false,
  striped = false,
  bordered = false,
  hoverable = false,
  size = 'medium',
  caption,
  loading = false,
  emptyMessage = 'No data available',
  onRowClick,
  onSort,
  className,
  maxHeight,
  backgroundColor,
  headerBackgroundColor,
  footerBackgroundColor,
  textColor,
  borderColor,
  ...props
}) => {
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (columnKey: string, direction: 'asc' | 'desc') => {
    setSortColumn(columnKey);
    setSortDirection(direction);
    if (onSort) {
      onSort(columnKey, direction);
    }
  };

  const tableContent = (
    <StyledTable
      disabled={disabled}
      size={size}
      bordered={bordered}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      maxHeight={maxHeight}
      className={className}
      {...props}
    >
      {caption && <StyledCaption>{caption}</StyledCaption>}

      <TableHeader
        columns={columns}
        disabled={disabled}
        backgroundColor={headerBackgroundColor}
        textColor={textColor}
        borderColor={borderColor}
        onSort={handleSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
      />

      <StyledTableBody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length}>
              <EmptyMessage>{emptyMessage}</EmptyMessage>
            </td>
          </tr>
        ) : (
          data.map((row, index) => (
            <TableRowComponent
              key={row.id}
              row={row}
              columns={columns}
              disabled={disabled}
              striped={striped}
              hoverable={hoverable}
              backgroundColor={backgroundColor}
              textColor={textColor}
              borderColor={borderColor}
              onClick={onRowClick}
              index={index}
            />
          ))
        )}
      </StyledTableBody>
    </StyledTable>
  );

  if (loading) {
    return <LoadingOverlay>{tableContent}</LoadingOverlay>;
  }

  return tableContent;
};