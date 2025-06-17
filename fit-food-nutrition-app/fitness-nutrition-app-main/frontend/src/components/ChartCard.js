export const ChartCard = ({ title, icon: Icon, children }) => (
  <div className='bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6'>
    <div className='flex items-center gap-2 mb-6'>
      <Icon className='w-6 h-6 text-gray-500' />
      <h2 className='text-xl font-semibold text-gray-800'>{title}</h2>
    </div>
    {children}
  </div>
);
