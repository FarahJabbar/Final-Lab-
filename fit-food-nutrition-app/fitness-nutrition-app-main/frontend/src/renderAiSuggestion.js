export const renderAiSuggestion = (text) => {
  return text.split('**').map((segment, index) => {
    if (index % 2 !== 0) {
      return (
        <div key={index} className='inline-block mx-1'>
          <span className='bg-yellow-300 px-2 py-1 rounded'>{segment}</span>
        </div>
      );
    }
    return segment.split('\n').map((line, i) => (
      <p key={`${index}-${i}`} className='my-1'>
        {line}
      </p>
    ));
  });
};
