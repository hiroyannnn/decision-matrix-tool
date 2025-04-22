import type { Meta, StoryObj } from '@storybook/react';
import { MatrixGrid } from './MatrixGrid';

const meta: Meta<typeof MatrixGrid> = {
  title: 'Atoms/MatrixGrid',
  component: MatrixGrid,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'array' },
    onItemClick: { action: 'itemClicked' },
  },
};

export default meta;
type Story = StoryObj<typeof MatrixGrid>;

export const Default: Story = {
  args: {
    items: [
      { id: 1, title: 'Item 1', quadrant: 'urgent-important' },
      { id: 2, title: 'Item 2', quadrant: 'not-urgent-important' },
      { id: 3, title: 'Item 3', quadrant: 'urgent-not-important' },
      { id: 4, title: 'Item 4', quadrant: 'not-urgent-not-important' },
    ],
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
};
