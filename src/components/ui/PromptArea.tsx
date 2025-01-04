import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent } from "react";

interface PromptAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function PromptArea({
  value,
  onChange,
  placeholder,
  disabled,
}: PromptAreaProps) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };
  return (
    <Textarea
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      aria-label="Prompt input area"
      className="min-h-[100px] w-full resize-none bg-white shadow-lg"
    />
  );
}
