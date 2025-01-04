import { Dot } from "lucide-react";

const AnimatedEllipsis = () => {
  return (
    <div className="flex items-center justify-center">
      <Dot className="w-16 h-16 text-gray-500 animate-bounce [animation-delay:-0.3s] -mr-10" />
      <Dot className="w-16 h-16 text-gray-500 animate-bounce [animation-delay:-0.15s] -mr-10" />
      <Dot className="w-16 h-16 text-gray-500 animate-bounce" />
    </div>
  );
};

export default AnimatedEllipsis;
