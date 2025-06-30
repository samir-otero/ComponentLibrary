import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { RadioButton } from './RadioButton';
import { SetStateAction, useState } from 'react';

const mockAction = (actionName: string) => (...args: any[]) => {
  console.log(`${actionName}:`, args);
};

const meta = {
  title: 'Components/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible radio button component with multiple sizes and states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Radio button label text',
    },
    name: {
      control: 'text',
      description: 'Radio button name attribute',
    },
    value: {
      control: 'text',
      description: 'Radio button value',
    },
    checked: {
      control: 'boolean',
      description: 'Checked state',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Radio button size',
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
    onChange: {
      action: 'changed',
      description: 'Change handler',
    },
  },
  args: {
    onChange: mockAction('onChange'),
  },
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default state
export const Primary: Story = {
  args: {
    label: 'Primary Option',
    name: 'primary',
    value: 'primary',
  },
};

// Checked state
export const Checked: Story = {
  args: {
    label: 'Checked Option',
    name: 'checked',
    value: 'checked',
    checked: true,
  },
};

// Size variations
export const Small: Story = {
  args: {
    label: 'Small Radio',
    name: 'small',
    value: 'small',
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium Radio',
    name: 'medium',
    value: 'medium',
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Radio',
    name: 'large',
    value: 'large',
    size: 'large',
  },
};

// Disabled states
export const Disabled: Story = {
  args: {
    label: 'Disabled Radio',
    name: 'disabled',
    value: 'disabled',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled Checked',
    name: 'disabled-checked',
    value: 'disabled-checked',
    disabled: true,
    checked: true,
  },
};

// Custom colors
export const CustomColor: Story = {
  args: {
    label: 'Custom Color',
    name: 'custom',
    value: 'custom',
    backgroundColor: '#28a745',
    color: '#28a745',
    checked: true,
  },
};

// Radio group example
export const RadioGroup: Story = {
  args: {
    label: 'Option',
    name: 'group',
    value: 'option1',
  },
  render: (args: any) => {
    const [selectedValue, setSelectedValue] = useState('option1');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <RadioButton
          {...args}
          label="Option 1"
          value="option1"
          checked={selectedValue === 'option1'}
          onChange={(e: { target: { value: SetStateAction<string>; }; }) => setSelectedValue(e.target.value)}
        />
        <RadioButton
          {...args}
          label="Option 2"
          value="option2"
          checked={selectedValue === 'option2'}
          onChange={(e: { target: { value: SetStateAction<string>; }; }) => setSelectedValue(e.target.value)}
        />
        <RadioButton
          {...args}
          label="Option 3"
          value="option3"
          checked={selectedValue === 'option3'}
          onChange={(e: { target: { value: SetStateAction<string>; }; }) => setSelectedValue(e.target.value)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of radio buttons working as a group',
      },
    },
  },
};

// All sizes showcase
export const AllSizes: Story = {
  args: {
    label: 'Radio',
    name: 'sizes',
    value: 'radio',
  },
  render: (args: any) => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <RadioButton {...args} size="small" label="Small" value="small" />
      <RadioButton {...args} size="medium" label="Medium" value="medium" />
      <RadioButton {...args} size="large" label="Large" value="large" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all available radio button sizes',
      },
    },
  },
};