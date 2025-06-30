import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Img } from './Img';

const mockAction = (actionName: string) => (...args: any[]) => {
  console.log(`${actionName}:`, args);
};

const meta = {
  title: 'Components/Img',
  component: Img,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible image component with responsive design, fallback support, and multiple display options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for the image',
    },
    width: {
      control: 'text',
      description: 'Image width (px or CSS value)',
    },
    height: {
      control: 'text',
      description: 'Image height (px or CSS value)',
    },
    objectFit: {
      control: { type: 'select' },
      options: ['contain', 'cover', 'fill', 'none', 'scale-down'],
      description: 'How the image should fit within its container',
    },
    borderRadius: {
      control: 'text',
      description: 'Border radius CSS value',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    loading: {
      control: { type: 'select' },
      options: ['lazy', 'eager'],
      description: 'Image loading behavior',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when image fails to load',
    },
    fallbackSrc: {
      control: 'text',
      description: 'Fallback image URL',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler',
    },
  },
  args: {
    onClick: mockAction('onClick'),
  },
} satisfies Meta<typeof Img>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default state
export const Default: Story = {
  args: {
    src: 'https://picsum.photos/400/300',
    alt: 'Sample image',
    width: '400px',
    height: '300px',
  },
};

// Different sizes
export const Small: Story = {
  args: {
    src: 'https://picsum.photos/200/150',
    alt: 'Small image',
    width: '200px',
    height: '150px',
  },
};

export const Large: Story = {
  args: {
    src: 'https://picsum.photos/600/400',
    alt: 'Large image',
    width: '600px',
    height: '400px',
  },
};

// Object fit variations
export const Cover: Story = {
  args: {
    src: 'https://picsum.photos/800/400',
    alt: 'Cover fit image',
    width: '400px',
    height: '300px',
    objectFit: 'cover',
  },
};

export const Contain: Story = {
  args: {
    src: 'https://picsum.photos/800/400',
    alt: 'Contain fit image',
    width: '400px',
    height: '300px',
    objectFit: 'contain',
  },
};

// Border radius variations
export const Rounded: Story = {
  args: {
    src: 'https://picsum.photos/300/300',
    alt: 'Rounded image',
    width: '300px',
    height: '300px',
    borderRadius: '15px',
  },
};

export const Circle: Story = {
  args: {
    src: 'https://picsum.photos/200/200',
    alt: 'Circular image',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    src: 'https://picsum.photos/400/300',
    alt: 'Disabled image',
    width: '400px',
    height: '300px',
    disabled: true,
  },
};

// Clickable image
export const Clickable: Story = {
  args: {
    src: 'https://picsum.photos/400/300',
    alt: 'Clickable image',
    width: '400px',
    height: '300px',
    onClick: () => alert('Image clicked!'),
  },
};

// Error handling
export const WithFallback: Story = {
  args: {
    src: 'https://invalid-url.com/image.jpg',
    fallbackSrc: 'https://picsum.photos/400/300',
    alt: 'Image with fallback',
    width: '400px',
    height: '300px',
  },
};

export const ErrorPlaceholder: Story = {
  args: {
    src: 'https://invalid-url.com/image.jpg',
    alt: 'Image with error',
    width: '400px',
    height: '300px',
    placeholder: 'Failed to load image',
  },
};

// Responsive showcase
export const ResponsiveShowcase: Story = {
  args: {
    src: 'https://picsum.photos/400/300',
    alt: 'Responsive image',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Img {...args} width="200px" height="150px" />
      <Img {...args} width="300px" height="200px" />
      <Img {...args} width="400px" height="300px" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of different image sizes',
      },
    },
  },
};