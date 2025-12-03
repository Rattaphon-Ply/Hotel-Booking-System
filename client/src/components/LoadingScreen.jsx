const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-2">
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />

        {/* Text */}
        <p className="text-gray-600 text-sm animate-pulse">กำลังโหลด...</p>
      </div>
    </div>
  );
};
export default LoadingScreen;
