import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Text } from "./Text";

const mockAction =
  (actionName: string) =>
  (...args: any[]) => {
    console.log(`${actionName}:`, args);
  };

const meta = {
  title: "Components/Text",
  component: Text,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible text component with multiple variants, sizes, weights, and styling options for various content types.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "Text content",
    },
    variant: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "light",
        "dark",
        "muted",
      ],
      description: "Text variant",
    },
    size: {
      control: { type: "select" },
      options: ["xs", "small", "medium", "large", "xl", "2xl"],
      description: "Text size",
    },
    weight: {
      control: { type: "select" },
      options: ["light", "normal", "medium", "semibold", "bold", "extrabold"],
      description: "Font weight",
    },
    align: {
      control: { type: "select" },
      options: ["left", "center", "right", "justify"],
      description: "Text alignment",
    },
    as: {
      control: { type: "select" },
      options: ["span", "div", "p", "h1", "h2", "h3", "h4", "h5", "h6"],
      description: "HTML element to render as",
    },
    color: {
      control: "color",
      description: "Custom text color",
    },
    backgroundColor: {
      control: "color",
      description: "Custom background color",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    italic: {
      control: "boolean",
      description: "Italic text",
    },
    underline: {
      control: "boolean",
      description: "Underlined text",
    },
    strikethrough: {
      control: "boolean",
      description: "Strikethrough text",
    },
    uppercase: {
      control: "boolean",
      description: "Uppercase text",
    },
    lowercase: {
      control: "boolean",
      description: "Lowercase text",
    },
    capitalize: {
      control: "boolean",
      description: "Capitalize text",
    },
    truncate: {
      control: "boolean",
      description: "Truncate text with ellipsis",
    },
    fullWidth: {
      control: "boolean",
      description: "Full width text",
    },
    onClick: {
      action: "clicked",
      description: "Click handler",
    },
  },
  args: {
    onClick: mockAction("onClick"),
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default state
export const Primary: Story = {
  args: {
    children: "This is primary text content",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "This is secondary text content",
    variant: "secondary",
  },
};

export const Success: Story = {
  args: {
    children: "This is success text content",
    variant: "success",
  },
};

export const Danger: Story = {
  args: {
    children: "This is danger text content",
    variant: "danger",
  },
};

export const Warning: Story = {
  args: {
    children: "This is warning text content",
    variant: "warning",
  },
};

export const Info: Story = {
  args: {
    children: "This is info text content",
    variant: "info",
  },
};

export const Muted: Story = {
  args: {
    children: "This is muted text content",
    variant: "muted",
  },
};

// Size variations
export const ExtraSmall: Story = {
  args: {
    children: "Extra small text",
    size: "xs",
  },
};

export const Small: Story = {
  args: {
    children: "Small text",
    size: "small",
  },
};

export const MediumSize: Story = {
  args: {
    children: "Medium text",
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    children: "Large text",
    size: "large",
  },
};

export const ExtraLarge: Story = {
  args: {
    children: "Extra large text",
    size: "xl",
  },
};

export const DoubleExtraLarge: Story = {
  args: {
    children: "Double extra large text",
    size: "2xl",
  },
};

// Weight variations
export const Light: Story = {
  args: {
    children: "Light weight text",
    weight: "light",
  },
};

export const Normal: Story = {
  args: {
    children: "Normal weight text",
    weight: "normal",
  },
};

export const MediumWeight: Story = {
  args: {
    children: "Medium weight text",
    weight: "medium",
  },
};

export const Semibold: Story = {
  args: {
    children: "Semibold weight text",
    weight: "semibold",
  },
};

export const Bold: Story = {
  args: {
    children: "Bold weight text",
    weight: "bold",
  },
};

export const ExtraBold: Story = {
  args: {
    children: "Extra bold weight text",
    weight: "extrabold",
  },
};

// Text styling
export const Italic: Story = {
  args: {
    children: "This is italic text",
    italic: true,
  },
};

export const Underline: Story = {
  args: {
    children: "This is underlined text",
    underline: true,
  },
};

export const Strikethrough: Story = {
  args: {
    children: "This is strikethrough text",
    strikethrough: true,
  },
};

export const Uppercase: Story = {
  args: {
    children: "This is uppercase text",
    uppercase: true,
  },
};

export const Lowercase: Story = {
  args: {
    children: "THIS IS LOWERCASE TEXT",
    lowercase: true,
  },
};

export const Capitalize: Story = {
  args: {
    children: "this is capitalized text",
    capitalize: true,
  },
};

// Text alignment
export const LeftAlign: Story = {
  args: {
    children: "This text is left aligned",
    align: "left",
    fullWidth: true,
  },
  parameters: {
    layout: "padded",
  },
};

export const CenterAlign: Story = {
  args: {
    children: "This text is center aligned",
    align: "center",
    fullWidth: true,
  },
  parameters: {
    layout: "padded",
  },
};

export const RightAlign: Story = {
  args: {
    children: "This text is right aligned",
    align: "right",
    fullWidth: true,
  },
  parameters: {
    layout: "padded",
  },
};

export const JustifyAlign: Story = {
  args: {
    children:
      "This text is justified and will align to both left and right margins when it wraps to multiple lines, creating a clean block appearance.",
    align: "justify",
    fullWidth: true,
  },
  parameters: {
    layout: "padded",
  },
};

// HTML elements
export const Paragraph: Story = {
  args: {
    children:
      "This is a paragraph element with some longer text content that demonstrates how the component works as a block-level element.",
    as: "p",
  },
  parameters: {
    layout: "padded",
  },
};

export const Heading1: Story = {
  args: {
    children: "This is a Heading 1",
    as: "h1",
    size: "2xl",
    weight: "bold",
  },
};

export const Heading2: Story = {
  args: {
    children: "This is a Heading 2",
    as: "h2",
    size: "xl",
    weight: "semibold",
  },
};

export const Heading3: Story = {
  args: {
    children: "This is a Heading 3",
    as: "h3",
    size: "large",
    weight: "medium",
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    children: "This is disabled text",
    disabled: true,
  },
};

export const DisabledClickable: Story = {
  args: {
    children: "This is disabled clickable text",
    disabled: true,
    onClick: () => alert("This should not fire"),
  },
};

// Custom colors
export const CustomColor: Story = {
  args: {
    children: "This text has a custom color",
    color: "#8e44ad",
  },
};

export const CustomBackground: Story = {
  args: {
    children: "This text has a custom background",
    backgroundColor: "#f39c12",
    color: "#ffffff",
  },
};

// Clickable text
export const Clickable: Story = {
  args: {
    children: "This is clickable text",
    onClick: () => alert("Text clicked!"),
    color: "#007bff",
    underline: true,
  },
};

// Truncated text
export const Truncated: Story = {
  args: {
    children:
      "This is a very long text that will be truncated with an ellipsis when it exceeds the available width",
    truncate: true,
  },
  parameters: {
    layout: "padded",
  },
  render: (args) => (
    <div style={{ width: "200px", border: "1px solid #ccc", padding: "8px" }}>
      <Text {...args} />
    </div>
  ),
};

// Full width
export const FullWidth: Story = {
  args: {
    children: "This is full width text",
    fullWidth: true,
    backgroundColor: "#f8f9fa",
  },
  parameters: {
    layout: "padded",
  },
};

// All sizes showcase
export const AllSizes: Story = {
  args: {
    children: "Sample text",
  },
  render: (args) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        alignItems: "flex-start",
      }}
    >
      <Text {...args} size="xs">
        Extra Small Text
      </Text>
      <Text {...args} size="small">
        Small Text
      </Text>
      <Text {...args} size="medium">
        Medium Text
      </Text>
      <Text {...args} size="large">
        Large Text
      </Text>
      <Text {...args} size="xl">
        Extra Large Text
      </Text>
      <Text {...args} size="2xl">
        Double Extra Large Text
      </Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Showcase of all available text sizes",
      },
    },
  },
};

// All variants showcase
export const AllVariants: Story = {
  args: {
    children: "Sample text",
  },
  render: (args) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        alignItems: "flex-start",
      }}
    >
      <Text {...args} variant="primary">
        Primary Text
      </Text>
      <Text {...args} variant="secondary">
        Secondary Text
      </Text>
      <Text {...args} variant="success">
        Success Text
      </Text>
      <Text {...args} variant="danger">
        Danger Text
      </Text>
      <Text {...args} variant="warning">
        Warning Text
      </Text>
      <Text {...args} variant="info">
        Info Text
      </Text>
      <Text {...args} variant="muted">
        Muted Text
      </Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Showcase of all available text variants",
      },
    },
  },
};

// Combined styling example
export const CombinedStyling: Story = {
  args: {
    children: "Bold, italic, underlined, large text with custom color",
    weight: "bold",
    italic: true,
    underline: true,
    size: "large",
    color: "#e74c3c",
  },
};
