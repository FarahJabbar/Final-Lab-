export const StatCard = ({ icon: Icon, title, value, subValue, color }) => (
  <div className='bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6'>
    <div className='flex items-start justify-between mb-4'>
      <div>
        <h3 className='text-sm font-medium text-gray-500 mb-1'>{title}</h3>
        <p className='text-2xl font-bold text-gray-900'>{value}</p>
        {subValue && <p className='text-sm text-gray-600 mt-1'>{subValue}</p>}
      </div>
      <div className={`p-3 rounded-lg bg-${color}-50`}>
        <Icon className={`w-6 h-6 text-${color}-500`} />
      </div>
    </div>
    <div className='h-1 w-full bg-gray-100 rounded-full'>
      <div className={`h-full bg-${color}-500 rounded-full w-3/4`} />
    </div>
  </div>
);
