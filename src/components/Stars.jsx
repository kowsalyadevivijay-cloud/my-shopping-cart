export default function Stars({ rate = 0, count }) {
 
  const filledStarsCount = Math.round(rate);
  const emptyStarsCount = 5 - filledStarsCount;

  return (
    <div className="flex items-center gap-1.5 text-sm">
   
      <span className="text-amber-400" aria-label={`Rating: ${rate} out of 5 stars`}>
        {"★".repeat(filledStarsCount)}
        <span className="text-gray-300 dark:text-gray-600">
          {"★".repeat(emptyStarsCount)}
        </span>
      </span>

    
      <span className="font-medium text-gray-800 dark:text-gray-200">
        {rate.toFixed(1)}
      </span>

      
      {count !== undefined && (
        <span className="text-xs text-gray-500 dark:text-gray-400">
          ({count})
        </span>
      )}
    </div>
  );
}