import type { Meta, StoryObj } from '@storybook/react';
import { QuadrantSection } from './QuadrantSection';

const meta: Meta<typeof QuadrantSection> = {
  title: 'Atoms/QuadrantSection',
  component: QuadrantSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    quadrant: { control: 'select', options: ['urgent-important', 'not-urgent-important', 'urgent-not-important', 'not-urgent-not-important'] },
  },
};

export default meta;
type Story = StoryObj<typeof QuadrantSection>;

export const UrgentImportant: Story = {
  args: {
    title: 'Urgent & Important',
    quadrant: 'urgent-important',
  },
};

export const NotUrgentImportant: Story = {
  args: {
    title: 'Not Urgent & Important',
    quadrant: 'not-urgent-important',
  },
};

export const UrgentNotImportant: Story = {
  args: {
    title: 'Urgent & Not Important',
    quadrant: 'urgent-not-important',
  },
};

export const NotUrgentNotImportant: Story = {
  args: {
    title: 'Not Urgent & Not Important',
    quadrant: 'not-urgent-not-important',
  },
};
