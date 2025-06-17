export const Input = ({ label, icon: Icon, type, value, onChange, error }) => (
  <div className='mb-4'>
    <label className='flex items-center text-sm font-medium text-gray-700 mb-2'>
      <Icon className='mr-2 text-green-600' />
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all'
    />
    {error && <p className='mt-1 text-red-500 text-sm'>{error}</p>}
  </div>
);
