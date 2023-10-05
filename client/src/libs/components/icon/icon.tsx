import ChevronRight from '@/assets/icons/chevron-right.svg?react';
import ChevronLeft from '@/assets/icons/chevron-left.svg?react';

const iconNameToIconMappper = {
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
} as const;

type Props = {
  iconName: keyof typeof iconNameToIconMappper;
};

const Icon = ({ iconName }: Props) => {
  const IconElement = iconNameToIconMappper[iconName];

  return <IconElement />;
};

export { Icon };
