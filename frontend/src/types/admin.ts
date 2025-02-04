import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

export type IconMapType = {
  [key: string]: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, 'ref'>
  > &
    RefAttributes<SVGSVGElement>;
};

export type ComponentsType = {
  [key: string]: React.JSX.Element;
};
