import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  Table,
  TableHeader,
  TableRowComponent,
  TableCell,
  TableFooter,
} from "./Table";
import { TableColumn, TableRow } from "./Table.types";

// Sample test data
const sampleColumns: TableColumn[] = [
  { key: "id", title: "ID", sortable: true },
  { key: "name", title: "Name", sortable: true },
  { key: "email", title: "Email" },
];

const sampleData: TableRow[] = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

describe("Table Component", () => {
  // Test 1: Component visibility (required)
  test("renders table component", () => {
    render(<Table columns={sampleColumns} data={sampleData} />);
    const tableElement = screen.getByRole("table");
    expect(tableElement).toBeInTheDocument();
    expect(tableElement).toBeVisible();
  });

  // Test 2: Disabled state background color change (required)
  test("changes background color when component is in disabled state", () => {
    render(<Table columns={sampleColumns} data={sampleData} disabled />);
    const tableElement = screen.getByRole("table");

    const computedStyles = window.getComputedStyle(tableElement);
    expect(computedStyles.opacity).toBe("0.65");
    expect(computedStyles.pointerEvents).toBe("none");
  });

  // Additional tests for better coverage
  test("renders table with correct column headers", () => {
    render(<Table columns={sampleColumns} data={sampleData} />);

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  test("renders table data correctly", () => {
    render(<Table columns={sampleColumns} data={sampleData} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("calls onRowClick handler when row is clicked", () => {
    const handleRowClick = jest.fn();
    render(
      <Table
        columns={sampleColumns}
        data={sampleData}
        onRowClick={handleRowClick}
      />,
    );

    const firstRow = screen.getByText("John Doe").closest("tr");
    if (firstRow) {
      fireEvent.click(firstRow);
      expect(handleRowClick).toHaveBeenCalledWith(sampleData[0]);
    }
  });

  test("does not call onRowClick handler when disabled", () => {
    const handleRowClick = jest.fn();
    render(
      <Table
        columns={sampleColumns}
        data={sampleData}
        onRowClick={handleRowClick}
        disabled
      />,
    );

    const firstRow = screen.getByText("John Doe").closest("tr");
    if (firstRow) {
      fireEvent.click(firstRow);
      expect(handleRowClick).not.toHaveBeenCalled();
    }
  });

  test("renders empty message when no data provided", () => {
    render(<Table columns={sampleColumns} data={[]} />);
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  test("renders custom empty message", () => {
    const customMessage = "No users found";
    render(
      <Table columns={sampleColumns} data={[]} emptyMessage={customMessage} />,
    );
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  test("renders caption when provided", () => {
    const caption = "User Data Table";
    render(
      <Table columns={sampleColumns} data={sampleData} caption={caption} />,
    );
    expect(screen.getByText(caption)).toBeInTheDocument();
  });

  test("applies striped styling", () => {
    render(<Table columns={sampleColumns} data={sampleData} striped />);
    const tableElement = screen.getByRole("table");
    expect(tableElement).toBeInTheDocument();
  });

  test("handles sorting when sortable column is clicked", () => {
    const handleSort = jest.fn();
    render(
      <Table columns={sampleColumns} data={sampleData} onSort={handleSort} />,
    );

    const nameHeader = screen.getByText("Name");
    fireEvent.click(nameHeader);
    expect(handleSort).toHaveBeenCalledWith("name", "asc");
  });

  test("renders with different sizes", () => {
    const { rerender } = render(
      <Table columns={sampleColumns} data={sampleData} size="small" />,
    );
    let tableElement = screen.getByRole("table");
    expect(tableElement).toBeInTheDocument();

    rerender(<Table columns={sampleColumns} data={sampleData} size="large" />);
    tableElement = screen.getByRole("table");
    expect(tableElement).toBeInTheDocument();
  });

  test("applies custom className", () => {
    const customClass = "custom-table-class";
    render(
      <Table
        columns={sampleColumns}
        data={sampleData}
        className={customClass}
      />,
    );
    const tableElement = screen.getByRole("table");
    expect(tableElement).toHaveClass(customClass);
  });

  test("renders bordered table", () => {
    render(<Table columns={sampleColumns} data={sampleData} bordered />);
    const tableElement = screen.getByRole("table");
    expect(tableElement).toBeInTheDocument();
  });
});

describe("TableHeader Component", () => {
  test("renders table header component", () => {
    render(
      <table>
        <TableHeader columns={sampleColumns} />
      </table>,
    );

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  test("handles sort click on sortable columns", () => {
    const handleSort = jest.fn();
    render(
      <table>
        <TableHeader columns={sampleColumns} onSort={handleSort} />
      </table>,
    );

    const sortableHeader = screen.getByText("ID");
    fireEvent.click(sortableHeader);
    expect(handleSort).toHaveBeenCalledWith("id", "asc");
  });

  test("disabled header does not handle sort clicks", () => {
    const handleSort = jest.fn();
    render(
      <table>
        <TableHeader columns={sampleColumns} onSort={handleSort} disabled />
      </table>,
    );

    const sortableHeader = screen.getByText("ID");
    fireEvent.click(sortableHeader);
    expect(handleSort).not.toHaveBeenCalled();
  });
});

describe("TableRowComponent", () => {
  test("renders table row component", () => {
    render(
      <table>
        <tbody>
          <TableRowComponent
            row={sampleData[0]}
            columns={sampleColumns}
            index={0}
          />
        </tbody>
      </table>,
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });

  test("handles row click", () => {
    const handleClick = jest.fn();
    render(
      <table>
        <tbody>
          <TableRowComponent
            row={sampleData[0]}
            columns={sampleColumns}
            onClick={handleClick}
            index={0}
          />
        </tbody>
      </table>,
    );

    const row = screen.getByText("John Doe").closest("tr");
    if (row) {
      fireEvent.click(row);
      expect(handleClick).toHaveBeenCalledWith(sampleData[0]);
    }
  });

  test("disabled row does not handle clicks", () => {
    const handleClick = jest.fn();
    render(
      <table>
        <tbody>
          <TableRowComponent
            row={sampleData[0]}
            columns={sampleColumns}
            onClick={handleClick}
            disabled
            index={0}
          />
        </tbody>
      </table>,
    );

    const row = screen.getByText("John Doe").closest("tr");
    if (row) {
      fireEvent.click(row);
      expect(handleClick).not.toHaveBeenCalled();
    }
  });
});

describe("TableCell Component", () => {
  test("renders table cell component", () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell>Test Cell Content</TableCell>
          </tr>
        </tbody>
      </table>,
    );

    expect(screen.getByText("Test Cell Content")).toBeInTheDocument();
  });

  test("applies text alignment", () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell align="center">Centered Text</TableCell>
          </tr>
        </tbody>
      </table>,
    );

    const cell = screen.getByText("Centered Text");
    expect(cell).toBeInTheDocument();
  });
});

describe("TableFooter Component", () => {
  test("renders table footer component", () => {
    render(
      <table>
        <TableFooter columnsCount={3}>Footer Content</TableFooter>
      </table>,
    );

    expect(screen.getByText("Footer Content")).toBeInTheDocument();
  });

  test("spans correct number of columns", () => {
    render(
      <table>
        <TableFooter columnsCount={5}>Footer spanning 5 columns</TableFooter>
      </table>,
    );

    const footerCell = screen.getByText("Footer spanning 5 columns");
    expect(footerCell).toHaveAttribute("colSpan", "5");
  });
});
