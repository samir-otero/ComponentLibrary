import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Card } from './Card';

const mockAction = (actionName: string) => (...args: any[]) => {
  console.log(`${actionName}:`, args);
};

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible card component with multiple variants, sizes, and states. Perfect for displaying content in a structured format.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Card content',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    clickable: {
      control: 'boolean',
      description: 'Whether the card is clickable',
    },
    backgroundColor: {
      control: 'color',
      description: 'Custom background color',
    },
    borderColor: {
      control: 'color',
      description: 'Custom border color',
    },
    borderRadius: {
      control: 'text',
      description: 'Custom border radius',
    },
    elevation: {
      control: { type: 'select' },
      options: ['none', 'low', 'default', 'medium', 'high'],
      description: 'Card shadow elevation',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Card size',
    },
    padding: {
      control: 'text',
      description: 'Custom padding',
    },
    margin: {
      control: 'text',
      description: 'Custom margin',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width card',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler',
    },
  },
  args: {
    onClick: mockAction('onClick'),
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default states
export const Default: Story = {
  args: {
    title: 'Card Title',
    subtitle: 'Card subtitle with additional information',
    children: 'This is the main content of the card. It can contain any React elements including text, buttons, forms, and more.',
  },
};

export const WithoutHeader: Story = {
  args: {
    children: 'This card has no title or subtitle, just content. Perfect for simple layouts.',
  },
};

export const WithFooter: Story = {
  args: {
    title: 'Card with Footer',
    children: 'This card includes a footer section for actions or additional information.',
    footer: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <button style={{ padding: '4px 8px', fontSize: '12px' }}>Action 1</button>
        <button style={{ padding: '4px 8px', fontSize: '12px' }}>Action 2</button>
      </div>
    ),
  },
};

export const WithImage: Story = {
  args: {
    title: 'Card with Image',
    subtitle: 'Beautiful landscape photo',
    image: {
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop',
      alt: 'Mountain landscape',
    },
    children: 'This card includes an image at the top, perfect for photo galleries or product showcases.',
  },
};

// Size variations
export const Small: Story = {
  args: {
    title: 'Small Card',
    size: 'small',
    children: 'This is a small card perfect for compact layouts.',
  },
};

export const Medium: Story = {
  args: {
    title: 'Medium Card',
    size: 'medium',
    children: 'This is a medium-sized card, which is the default size.',
  },
};

export const Large: Story = {
  args: {
    title: 'Large Card',
    size: 'large',
    children: 'This is a large card suitable for detailed content and larger layouts.',
  },
};

// Elevation variations
export const NoElevation: Story = {
  args: {
    title: 'No Elevation',
    elevation: 'none',
    children: 'This card has no shadow elevation.',
  },
};

export const LowElevation: Story = {
  args: {
    title: 'Low Elevation',
    elevation: 'low',
    children: 'This card has low shadow elevation.',
  },
};

export const MediumElevation: Story = {
  args: {
    title: 'Medium Elevation',
    elevation: 'medium',
    children: 'This card has medium shadow elevation.',
  },
};

export const HighElevation: Story = {
  args: {
    title: 'High Elevation',
    elevation: 'high',
    children: 'This card has high shadow elevation.',
  },
};

// Interactive states
export const Clickable: Story = {
  args: {
    title: 'Clickable Card',
    clickable: true,
    children: 'This card is clickable. Hover over it to see the effect!',
    onClick: () => alert('Card clicked!'),
  },
};

export const Disabled: Story = {
  args: {
    title: 'Disabled Card',
    disabled: true,
    children: 'This card is disabled and cannot be interacted with.',
  },
};

export const DisabledClickable: Story = {
  args: {
    title: 'Disabled Clickable Card',
    clickable: true,
    disabled: true,
    children: 'This card would be clickable but is currently disabled.',
  },
};

// Custom styling
export const CustomColors: Story = {
  args: {
    title: 'Custom Colors',
    backgroundColor: '#f0f8ff',
    borderColor: '#4a90e2',
    children: 'This card has custom background and border colors.',
  },
};

export const CustomBorderRadius: Story = {
  args: {
    title: 'Custom Border Radius',
    borderRadius: '20px',
    children: 'This card has a custom border radius for a more rounded appearance.',
  },
};

// Full width
export const FullWidth: Story = {
  args: {
    title: 'Full Width Card',
    fullWidth: true,
    children: 'This card takes up the full width of its container.',
  },
  parameters: {
    layout: 'padded',
  },
};

// Complex example
export const ComplexCard: Story = {
  args: {
    title: 'Product Card',
    subtitle: '$29.99',
    image: {
      src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=200&fit=crop',
      alt: 'Product image',
    },
    clickable: true,
    elevation: 'medium',
    children: (
      <div>
        <p>High-quality wireless headphones with noise cancellation technology.</p>
        <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
          <li>40-hour battery life</li>
          <li>Active noise cancellation</li>
          <li>Premium sound quality</li>
        </ul>
      </div>
    ),
    footer: (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <span style={{ fontSize: '12px', color: '#666' }}>Free shipping</span>
        <button style={{
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Add to Cart
        </button>
      </div>
    ),
  },
};

// All sizes showcase
export const AllSizes: Story = {
  args: {
    title: 'Card',
    children: 'Sample content',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <Card {...args} size="small" title="Small Card">Small card content</Card>
      <Card {...args} size="medium" title="Medium Card">Medium card content</Card>
      <Card {...args} size="large" title="Large Card">Large card content</Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all available card sizes',
      },
    },
  },
};

// All elevations showcase
export const AllElevations: Story = {
  args: {
    title: 'Card',
    children: 'Sample content',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <Card {...args} elevation="none" title="No Elevation">No shadow</Card>
      <Card {...args} elevation="low" title="Low Elevation">Low shadow</Card>
      <Card {...args} elevation="default" title="Default Elevation">Default shadow</Card>
      <Card {...args} elevation="medium" title="Medium Elevation">Medium shadow</Card>
      <Card {...args} elevation="high" title="High Elevation">High shadow</Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all available card elevations',
      },
    },
  },
};