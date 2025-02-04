import {
  ChartBarDecreasing,
  ChartNoAxesCombined,
  LogOut,
  UserRoundX,
} from 'lucide-react';

export const AdminTabs = [
  {
    name: 'Dashboard',
    icons: <ChartBarDecreasing className="w-[18px] h-[18px] ml-2" />,
  },
  {
    name: 'Analyst',
    icons: <ChartNoAxesCombined className="w-[18px] h-[18px] ml-2" />,
  },
  {
    name: 'LogOut',
    icons: <LogOut className="w-[18px] h-[18px] ml-2" />,
  },
  {
    name: 'DeleteID',
    icons: <UserRoundX className="w-[18px] h-[18px] ml-2" />,
  },
];
