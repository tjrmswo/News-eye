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
    name: 'logout',
    icons: <LogOut className="ml-2 size-[18px]" />,
  },
  {
    name: 'deleteID',
    icons: <UserRoundX className="ml-2 size-[18px]" />,
  },
];
