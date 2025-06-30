import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { HeroImage } from './HeroImage';

const mockAction = (actionName: string) => (...args: any[]) => {
  console.log(`${actionName}:`, args);
};

const meta = {
  title: 'Components/HeroImage',
  component: HeroImage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A hero image component with overlay text, customizable positioning, and responsive design.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Hero image source URL',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for the image',
    },
    title: {
      control: 'text',
      description: 'Hero title text',
    },
    subtitle: {
      control: 'text',
      description: 'Hero subtitle text',
    },
    height: {
      control: 'text',
      description: 'Hero image height',
    },
    overlayColor: {
      control: 'color',
      description: 'Overlay color (overrides overlayOpacity)',
    },
    overlayOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Overlay opacity (0-1)',
    },
    textColor: {
      control: 'color',
      description: 'Text color',
    },
    textAlign: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: 'Text alignment',
    },
    verticalAlign: {
      control: { type: 'select' },
      options: ['top', 'center', 'bottom'],
      description: 'Vertical text alignment',
    },
    objectFit: {
      control: { type: 'select' },
      options: ['contain', 'cover', 'fill', 'none', 'scale-down'],
      description: 'How the image should fit within its container',
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
    showGradient: {
      control: 'boolean',
      description: 'Show gradient overlay',
    },
    gradientDirection: {
      control: { type: 'select' },
      options: ['to-top', 'to-bottom', 'to-left', 'to-right'],
      description: 'Gradient direction',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler',
    },
  },
  args: {
    onClick: mockAction('onClick'),
  },
} satisfies Meta<typeof HeroImage>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default state
export const Default: Story = {
  args: {
    src: 'https://picsum.photos/1200/600',
    alt: 'Hero image',
    title: 'Welcome to Our Platform',
    subtitle: 'Discover amazing features and capabilities',
    height: '500px',
  },
};

// Different heights
export const Small: Story = {
  args: {
    src: 'https://picsum.photos/1200/400',
    alt: 'Small hero image',
    title: 'Compact Hero',
    subtitle: 'Perfect for smaller sections',
    height: '300px',
  },
};

export const Large: Story = {
  args: {
    src: 'https://picsum.photos/1200/800',
    alt: 'Large hero image',
    title: 'Full Screen Experience',
    subtitle: 'Make a bold statement',
    height: '600px',
  },
};

// Text alignment variations
export const LeftAligned: Story = {
  args: {
    src: 'https://picsum.photos/1200/600',
    alt: 'Left aligned hero',
    title: 'Left Aligned Content',
    subtitle: 'Text positioned to the left side',
    textAlign: 'left',
    verticalAlign: 'center',
  },
};

export const RightAligned: Story = {
  args: {
    src: 'https://picsum.photos/1200/600',
    alt: 'Right aligned hero',
    title: 'Right Aligned Content',
    subtitle: 'Text positioned to the right side',
    textAlign: 'right',
    verticalAlign: 'center',
  },
};

export const TopAligned: Story = {
  args: {
    src: 'https://picsum.photos/1200/600',
    alt: 'Top aligned hero',
    title: 'Top Positioned',
    subtitle: 'Content at the top of the image',
    textAlign: 'center',
    verticalAlign: 'top',
  },
};

export const BottomAligned: Story = {
  args: {
    src: 'https://picsum.photos/1200/600',
    alt: 'Bottom aligned hero',
    title: 'Bottom Positioned',
    subtitle: 'Content at the bottom of the image',
    textAlign: 'center',
    verticalAlign: 'bottom',
  },
};

// Overlay variations
export const DarkOverlay: Story = {
  args: {
    src: 'https://picsum.photos/1200/600',
    alt: 'Dark overlay hero',
    title: 'Dark Overlay',
    subtitle: 'Enhanced text readability',
    overlayOpacity: 0.6,
  },
};

export const LightOverlay: Story = {
  args: {
    src: 'https://picsum.photos/1200/600',
    alt: 'Light overlay hero',
    title: 'Light Overlay',
    subtitle: 'Subtle background enhancement',
    overlayOpacity: 0.2,
  },
};

export const ColoredOverlay: Story = {
  args: {
    src: 'https://picsum.photos/1200/600',
    alt: 'Colored overlay hero',
    title: 'Branded Overlay',
    subtitle: 'Custom color overlay',
    overlayColor: 'rgba(0, 123, 255, 0.4)',
  },
};

// Gradient overlays
export const GradientOverlay: Story = {
  args: {
    src: 'https://picsum.photos/1200/600',
    alt: 'Gradient overlay hero',
    title: 'Gradient Effect',
    subtitle: 'Beautiful gradient overlay',
    showGradient: true,
    gradientDirection: 'to-bottom',
  },
};

export const GradientToTop: Story = {
  args: {
    src: 'https://picsum.photos/1200/600',
    alt: 'Gradient to top hero',
    title: 'Upward Gradient',
    subtitle: 'Gradient flowing upward',
    showGradient: true,
    gradientDirection: 'to-top',
  },
};

// Custom text colors
export const CustomTextColor: Story = {
  args: {
    src: 'https://picsum.photos/1200/600',
    alt: 'Custom text color hero',
    title: 'Custom Text Color',
    subtitle: 'Stand out with unique colors',
    textColor: '#ffd700',
    overlayOpacity: 0.1,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    src: 'https://picsum.photos/1200/600',
    alt: 'Disabled hero image',
    title: 'Disabled State',
    subtitle: 'This hero image is disabled',
    disabled: true,
  },
};

// Clickable hero
export const Clickable: Story = {
  args: {
    src: 'https://picsum.photos/1200/600',
    alt: 'Clickable hero image',
    title: 'Interactive Hero',
    subtitle: 'Click to interact',
    onClick: () => alert('Hero image clicked!'),
  },
};

// With custom content
export const WithCustomContent: Story = {
  args: {
    src: 'https://picsum.photos/1200/600',
    alt: 'Hero with custom content',
    title: 'Custom Content',
    subtitle: 'Hero with additional elements',
  },
  render: (args) => (
    <HeroImage {...args}>
      <div style={{ marginTop: '20px' }}>
        <button style={{
          padding: '12px 24px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          marginRight: '10px'
        }}>
          Get Started
        </button>
        <button style={{
          padding: '12px 24px',
          backgroundColor: 'transparent',
          color: 'white',
          border: '2px solid white',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px'
        }}>
          Learn More
        </button>
      </div>
    </HeroImage>
  ),
};

// Error handling
export const ErrorPlaceholder: Story = {
  args: {
    src: 'https://invalid-url.com/image.jpg',
    alt: 'Error hero image',
    title: 'Error State',
    subtitle: 'Image failed to load',
  },
};

// Object fit variations
export const ObjectFitContain: Story = {
  args: {
    src: 'https://picsum.photos/800/1200',
    alt: 'Object fit contain',
    title: 'Contain Fit',
    subtitle: 'Image contained within bounds',
    objectFit: 'contain',
    height: '400px',
  },
};

// Responsive showcase
export const ResponsiveShowcase: Story = {
  args: {
    src: 'https://picsum.photos/1200/600',
    alt: 'Responsive hero',
    title: 'Responsive Design',
    subtitle: 'Adapts to different screen sizes',
  },
  parameters: {
    docs: {
      description: {
        story: 'This hero image automatically adjusts its height on smaller screens',
      },
    },
  },
};