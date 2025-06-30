import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Dropdown } from './Dropdown';

const mockAction = (actionName: string) => (...args: any[]) => {
  console.log(`${actionName}:`, args);
};

const sampleOptions = ['Option 1', 'Option 2', 'Option 3', 'Long Option Name Example', 'Option 5'];

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible dropdown component with multiple sizes and states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'Array of dropdown options',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no option is selected',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Dropdown size',
    },
    backgroundColor: {
      control: 'color',
      description: 'Custom background color',
    },
    color: {
      control: 'color',
      description: 'Text color',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width dropdown',
    },
    value: {
      control: 'text',
      description: 'Selected value',
    },
    onChange: {
      action: 'changed',
      description: 'Change handler',
    },
  },
  args: {
    onChange: mockAction('onChange'),
    options: sampleOptions,
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default state
export const Primary: Story = {
  args: {
    placeholder: 'Select an option',
    options: sampleOptions,
  },
};

// Size variations
export const Small: Story = {
  args: {
    placeholder: 'Small dropdown',
    size: 'small',
    options: sampleOptions,
  },
};

export const Medium: Story = {
  args: {
    placeholder: 'Medium dropdown',
    size: 'medium',
    options: sampleOptions,
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Large dropdown',
    size: 'large',
    options: sampleOptions,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    placeholder: 'Disabled dropdown',
    disabled: true,
    options: sampleOptions,
  },
};

// Custom colors
export const CustomColor: Story = {
  args: {
    placeholder: 'Custom color dropdown',
    backgroundColor: '#28a745',
    color: '#ffffff',
    options: sampleOptions,
  },
};

// Full width
export const FullWidth: Story = {
  args: {
    placeholder: 'Full width dropdown',
    fullWidth: true,
    options: sampleOptions,
  },
  parameters: {
    layout: 'padded',
  },
};

// With selected value
export const WithValue: Story = {
  args: {
    value: 'Option 2',
    options: sampleOptions,
  },
};

// All sizes showcase
export const AllSizes: Story = {
  args: {
    placeholder: 'Dropdown',
    options: sampleOptions,
  },
  render: (args: any) => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <Dropdown {...args} size="small" placeholder="Small" />
      <Dropdown {...args} size="medium" placeholder="Medium" />
      <Dropdown {...args} size="large" placeholder="Large" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all available dropdown sizes',
      },
    },
  },
};