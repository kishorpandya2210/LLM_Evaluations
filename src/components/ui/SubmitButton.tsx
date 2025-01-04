import { ArrowUp, Square, CircleArrowUp, CircleStop } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  onClick: () => Promise<void>;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function SubmitButton({
  onClick,
  disabled,
  isLoading,
}: SubmitButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={`absolute bottom-2 right-2 !h-6 !w-6 ${
        disabled ? "!cursor-no-drop" : "!cursor-pointer"
      }`}
      onClick={disabled ? undefined : onClick}
    >
      {!isLoading ? (
        <CircleArrowUp className="!h-6 !w-6" />
      ) : (
        <CircleStop className="!h-6 !w-6" />
      )}
    </Button>
  );
}
