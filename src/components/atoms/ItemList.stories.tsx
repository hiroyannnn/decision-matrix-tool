import type { Meta, StoryObj } from '@storybook/react';
import { ItemList } from './ItemList';

const meta: Meta<typeof ItemList> = {
  title: 'Atoms/ItemList',
  component: ItemList,
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
type Story = StoryObj<typeof ItemList>;

export const Default: Story = {
  args: {
    items: ['Item 1', 'Item 2', 'Item 3'],
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
};

export const LongList: Story = {
  args: {
    items: Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`),
  },
};
