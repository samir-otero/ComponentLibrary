import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Table } from "./Table";
import { TableColumn, TableRow } from "./Table.types";

const mockAction =
  (actionName: string) =>
  (...args: any[]) => {
    console.log(`${actionName}:`, args);
  };

// Sample data for stories
const sampleColumns: TableColumn[] = [
  { key: "id", title: "ID", width: "60px", sortable: true },
  { key: "name", title: "Name", sortable: true },
  { key: "email", title: "Email", sortable: true },
  { key: "role", title: "Role", align: "center" },
  { key: "status", title: "Status", align: "center" },
  { key: "joinDate", title: "Join Date", align: "right", sortable: true },
];

const sampleData: TableRow[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "Active",
    joinDate: "2023-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "User",
    status: "Active",
    joinDate: "2023-02-20",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "Moderator",
    status: "Inactive",
    joinDate: "2023-03-10",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice.brown@example.com",
    role: "User",
    status: "Active",
    joinDate: "2023-04-05",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie.wilson@example.com",
    role: "Admin",
    status: "Active",
    joinDate: "2023-05-12",
  },
];

const meta = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A flexible table component with sorting, responsive design, and multiple styling options.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    columns: {
      description: "Array of column definitions",
      control: { type: "object" },
    },
    data: {
      description: "Array of row data",
      control: { type: "object" },
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    striped: {
      control: "boolean",
      description: "Striped rows",
    },
    bordered: {
      control: "boolean",
      description: "Table borders",
    },
    hoverable: {
      control: "boolean",
      description: "Hover effect on rows",
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Table size",
    },
    caption: {
      control: "text",
      description: "Table caption",
    },
    loading: {
      control: "boolean",
      description: "Loading state",
    },
    emptyMessage: {
      control: "text",
      description: "Empty state message",
    },
    backgroundColor: {
      control: "color",
      description: "Table background color",
    },
    headerBackgroundColor: {
      control: "color",
      description: "Header background color",
    },
    textColor: {
      control: "color",
      description: "Text color",
    },
    borderColor: {
      control: "color",
      description: "Border color",
    },
    maxHeight: {
      control: "text",
      description: "Maximum height with scrolling",
    },
    onRowClick: {
      action: "row-clicked",
      description: "Row click handler",
    },
    onSort: {
      action: "sorted",
      description: "Sort handler",
    },
  },
  args: {
    columns: sampleColumns,
    data: sampleData,
    onRowClick: mockAction("onRowClick"),
    onSort: mockAction("onSort"),
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default state
export const Default: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    disabled: true,
  },
};

// Size variations
export const Small: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    size: "large",
  },
};

// Style variations
export const Striped: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    striped: true,
  },
};

export const Bordered: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    bordered: true,
  },
};

export const Hoverable: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    hoverable: true,
  },
};

export const StripedBorderedHoverable: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    striped: true,
    bordered: true,
    hoverable: true,
  },
};

// With caption
export const WithCaption: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    caption: "User Management Table",
    bordered: true,
  },
};

// Empty state
export const EmptyState: Story = {
  args: {
    columns: sampleColumns,
    data: [],
    emptyMessage: "No users found",
    bordered: true,
  },
};

// Loading state
export const Loading: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    loading: true,
  },
};

// Custom colors
export const CustomColors: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    backgroundColor: "#f8f9fa",
    headerBackgroundColor: "#007bff",
    textColor: "#ffffff",
    borderColor: "#0056b3",
    bordered: true,
  },
};

// Scrollable table
export const ScrollableTable: Story = {
  args: {
    columns: sampleColumns,
    data: [...sampleData, ...sampleData, ...sampleData], // Triple the data
    maxHeight: "300px",
    bordered: true,
    striped: true,
  },
};

// Interactive example
export const Interactive: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    striped: true,
    hoverable: true,
    bordered: true,
    onRowClick: (row) => alert(`Clicked row: ${row.name}`),
    onSort: (column, direction) => alert(`Sorted by ${column} ${direction}`),
  },
};

// Responsive showcase
export const ResponsiveShowcase: Story = {
  args: {
    columns: [
      { key: "id", title: "ID", width: "60px" },
      { key: "name", title: "Full Name" },
      { key: "email", title: "Email Address" },
      { key: "role", title: "Role", align: "center" },
      { key: "status", title: "Status", align: "center" },
      { key: "joinDate", title: "Join Date", align: "right" },
      { key: "lastLogin", title: "Last Login", align: "right" },
    ],
    data: sampleData.map((row) => ({
      ...row,
      lastLogin: "2023-06-15 14:30",
    })),
    striped: true,
    bordered: true,
    hoverable: true,
    size: "medium",
  },
  parameters: {
    docs: {
      description: {
        story: "Table with many columns to demonstrate responsive behavior",
      },
    },
  },
};

// All sizes comparison
export const AllSizes: Story = {
  render: (args) => {
    const shortData = sampleData.slice(0, 3);
    const shortColumns = sampleColumns.slice(0, 4);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        <div>
          <h3 style={{ marginBottom: "16px" }}>Small Size</h3>
          <Table
            {...args}
            columns={shortColumns}
            data={shortData}
            size="small"
          />
        </div>
        <div>
          <h3 style={{ marginBottom: "16px" }}>Medium Size</h3>
          <Table
            {...args}
            columns={shortColumns}
            data={shortData}
            size="medium"
          />
        </div>
        <div>
          <h3 style={{ marginBottom: "16px" }}>Large Size</h3>
          <Table
            {...args}
            columns={shortColumns}
            data={shortData}
            size="large"
          />
        </div>
      </div>
    );
  },
  args: {
    bordered: true,
    striped: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Comparison of all available table sizes",
      },
    },
  },
};
