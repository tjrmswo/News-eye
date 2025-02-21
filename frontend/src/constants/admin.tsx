import {
  ChartBarDecreasing,
  ChartNoAxesCombined,
  LogOut,
  UserRoundX,
} from 'lucide-react';

export const AdminTabs = [
  {
    name: 'Dashboard',
    icons: <ChartBarDecreasing className="size-[18px] ml-2" />,
  },
  {
    name: 'Analyst',
    icons: <ChartNoAxesCombined className="size-[18px] ml-2" />,
  },
  {
    name: 'LogOut',
    icons: <LogOut className="size-[18px] ml-2" />,
  },
  {
    name: 'DeleteID',
    icons: <UserRoundX className="size-[18px] ml-2" />,
  },
];
