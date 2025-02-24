import {
  ChartBarDecreasing,
  ChartNoAxesCombined,
  LogOut,
  UserRoundX,
} from 'lucide-react';

export const AdminTabs = [
  {
    name: 'dashboard',
    icons: <ChartBarDecreasing className="ml-2 size-[18px]" />,
  },
  {
    name: 'analysis',
    icons: <ChartNoAxesCombined className="ml-2 size-[18px]" />,
  },
  {
    name: 'LogOut',
    icons: <LogOut className="ml-2 size-[18px]" />,
  },
  {
    name: 'DeleteID',
    icons: <UserRoundX className="ml-2 size-[18px]" />,
  },
];
