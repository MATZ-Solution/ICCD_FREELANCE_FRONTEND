export default function SkeletonDemo() {
  return (
    <div className="flex items-center space-x-4 animate-pulse">
      {/* Circular Skeleton (e.g., avatar) */}
      <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />

      {/* Text Skeletons */}
      <div className="space-y-2">
        <div className="h-4 w-[250px] bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-4 w-[200px] bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
}
