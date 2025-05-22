"use client"

export default function LoadingSpinner({ size = "medium", text = "Loading..." }) {
  const sizeClasses = {
    small: "w-4 h-4 border-2",
    medium: "w-8 h-8 border-3",
    large: "w-12 h-12 border-4"
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div 
        className={`${sizeClasses[size]} border-t-primary-azure border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin`}
      ></div>
      {text && <p className="text-primary-azure opacity-70 mt-2">{text}</p>}
    </div>
  );
}
