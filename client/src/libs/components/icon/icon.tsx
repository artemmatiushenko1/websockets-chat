import ChevronRight from '@/assets/icons/chevron-right.svg?react';
import ChevronLeft from '@/assets/icons/chevron-left.svg?react';
import Plus from '@/assets/icons/plus.svg?react';

const iconNameToIconMappper = {
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  plus: Plus,
} as const;

type Props = {
  iconName: keyof typeof iconNameToIconMappper;
};

const Icon = ({ iconName }: Props) => {
  const IconElement = iconNameToIconMappper[iconName];

  return <IconElement />;
};

export { Icon };
