import {
  FaUserFriends,
  FaRegHeart,
  FaClipboardList,
  FaRunning,
  FaWeight,
  FaAppleAlt,
  FaDumbbell,
  FaChartLine,
  FaCalendarAlt,
} from 'react-icons/fa';

const features = [
  {
    icon: <FaDumbbell />,
    title: 'Track Your Workouts',
    description: 'Log your workouts and monitor your progress over time.',
  },
  {
    icon: <FaAppleAlt />,
    title: 'Meal Planning',
    description: 'Plan your meals and maintain a balanced diet effortlessly.',
  },
  {
    icon: <FaClipboardList />,
    title: 'Workout Plans',
    description: 'Access tailored workout plans to meet your fitness goals.',
  },
  {
    icon: <FaChartLine />,
    title: 'Monitor Your Progress',
    description: 'Keep track of your fitness journey and achieve your goals.',
  },
  {
    icon: <FaUserFriends />,
    title: 'Join a Community',
    description: 'Connect with friends and share your fitness journey.',
  },
  {
    icon: <FaRegHeart />,
    title: 'Health Insights',
    description: 'Get personalized health insights based on your data.',
  },
  {
    icon: <FaCalendarAlt />,
    title: 'Workout Scheduler',
    description:
      'Schedule your workouts and stay consistent with your routine.',
  },
  {
    icon: <FaRunning />,
    title: 'Running Tracker',
    description: 'Track your running sessions and analyze your performance.',
  },
  {
    icon: <FaWeight />,
    title: 'Weight Management',
    description:
      'Monitor your weight and set goals to achieve a healthy lifestyle.',
  },
];

export { features };
