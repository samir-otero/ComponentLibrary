import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Label } from './Label';

const mockAction = (actionName: string) => (...args: any[]) => {
  console.log(`${actionName}:`, args);
};

const meta = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible label component with multiple variants, sizes, and states for form elements and content labeling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Label content',
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
      description: 'Label variant',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Label size',
    },
    color: {
      control: 'color',
      description: 'Custom text color',
    },
    backgroundColor: {
      control: 'color',
      description: 'Custom background color',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    required: {
      control: 'boolean',
      description: 'Shows required indicator (*)',
    },
    bold: {
      control: 'boolean',
      description: 'Bold text',
    },
    italic: {
      control: 'boolean',
      description: 'Italic text',
    },
    underline: {
      control: 'boolean',
      description: 'Underlined text',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width label',
    },
    htmlFor: {
      control: 'text',
      description: 'Associated form control ID',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler',
    },
  },
  args: {
    onClick: mockAction('onClick'),
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default state
export const Primary: Story = {
  args: {
    children: 'Primary Label',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Label',
    variant: 'secondary',
  },
};

export const Success: Story = {
  args: {
    children: 'Success Label',
    variant: 'success',
  },
};

export const Danger: Story = {
  args: {
    children: 'Danger Label',
    variant: 'danger',
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning Label',
    variant: 'warning',
  },
};

export const Info: Story = {
  args: {
    children: 'Info Label',
    variant: 'info',
  },
};

// Size variations
export const Small: Story = {
  args: {
    children: 'Small Label',
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium Label',
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Label',
    size: 'large',
  },
};

// Required label
export const Required: Story = {
  args: {
    children: 'Required Field',
    required: true,
  },
};

// Text styling
export const Bold: Story = {
  args: {
    children: 'Bold Label',
    bold: true,
  },
};

export const Italic: Story = {
  args: {
    children: 'Italic Label',
    italic: true,
  },
};

export const Underline: Story = {
  args: {
    children: 'Underlined Label',
    underline: true,
  },
};

export const BoldItalicUnderline: Story = {
  args: {
    children: 'Bold Italic Underlined Label',
    bold: true,
    italic: true,
    underline: true,
  },
};

// Disabled states
export const Disabled: Story = {
  args: {
    children: 'Disabled Label',
    disabled: true,
  },
};

export const DisabledRequired: Story = {
  args: {
    children: 'Disabled Required Label',
    disabled: true,
    required: true,
  },
};

// Custom colors
export const CustomColor: Story = {
  args: {
    children: 'Custom Color Label',
    color: '#8e44ad',
  },
};

export const CustomBackground: Story = {
  args: {
    children: 'Custom Background Label',
    backgroundColor: '#f8f9fa',
    color: '#495057',
  },
};

// Full width
export const FullWidth: Story = {
  args: {
    children: 'Full Width Label',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

// Form example
export const FormExample: Story = {
  args: {
    children: 'Email Address',
    htmlFor: 'email-input',
    required: true,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '300px' }}>
      <Label {...args} />
      <input
        id="email-input"
        type="email"
        placeholder="Enter your email"
        style={{
          padding: '8px 12px',
          border: '1px solid #ced4da',
          borderRadius: '4px',
          fontSize: '14px',
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of label used with form input',
      },
    },
  },
};

// All sizes showcase
export const AllSizes: Story = {
  args: {
    children: 'Label',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Label {...args} size="small">Small</Label>
      <Label {...args} size="medium">Medium</Label>
      <Label {...args} size="large">Large</Label>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all available label sizes',
      },
    },
  },
};

// All variants showcase
export const AllVariants: Story = {
  args: {
    children: 'Label',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Label {...args} variant="primary">Primary</Label>
      <Label {...args} variant="secondary">Secondary</Label>
      <Label {...args} variant="success">Success</Label>
      <Label {...args} variant="danger">Danger</Label>
      <Label {...args} variant="warning">Warning</Label>
      <Label {...args} variant="info">Info</Label>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all available label variants',
      },
    },
  },
};