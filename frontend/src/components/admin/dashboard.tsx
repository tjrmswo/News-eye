'use client';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); // Chart.js의 모든 요소 등록

const labels = [
  'JavaScript',
  'PHP',
  'Java',
  'Golang',
  'Python',
  'C#',
  'C++',
  'Erlang',
];

const data = {
  labels,
  datasets: [
    {
      label: 'Usage by Language', // 그래프의 레이블
      data: [65, 59, 80, 81, 56, 55, 40, 30], // Y축 데이터
      backgroundColor: 'rgba(75, 192, 192, 0.2)', // 막대의 배경색
      borderColor: 'rgba(75, 192, 192, 1)', // 막대의 경계색
      borderWidth: 1, // 경계 두께
    },
  ],
};

const Data = {
  labels: ['JavaScript', 'PHP', 'Java', 'Golang', 'Python'],
  datasets: [
    {
      label: 'Language Usage',
      data: [55, 25, 15, 5, 10], // 각 프로그래밍 언어별 비율
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

// Bar 차트 옵션
const options = {
  scales: {
    y: {
      beginAtZero: true, // Y축 0부터 시작
      title: {
        display: true,
        text: 'Usage', // Y축 제목
      },
    },
    x: {
      beginAtZero: true, // Y축 0부터 시작
      title: {
        display: true,
        text: 'Programming Languages', // X축 제목
      },
    },
  },
};

// Pie 차트 옵션
const Options = {
  responsive: true,
};

export default function Dashboard() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <span className="text-xl">Dashboard</span>

        <select className="font-mono">
          <option>분야</option>
          <option>IT/과학</option>
          <option>경제</option>
          <option>정치</option>
          <option>사회</option>
          <option>생활/문화</option>
        </select>
      </div>

      <div className="h-[500px] flex flex-row flex-wrap items-center justify-around">
        <div style={{ width: '550px', height: '300px' }}>
          <Bar data={data} options={options} />
        </div>

        <div style={{ width: '350px', height: '300px' }}>
          <Pie data={Data} options={Options} />
        </div>
      </div>
    </div>
  );
}
