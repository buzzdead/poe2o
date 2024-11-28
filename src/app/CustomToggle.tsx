import { Toggle } from "@/components/ui/toggle"

interface Props {
    pressed: boolean
    onPressedChange: () => void
    text?: string
}

export function CustomToggle({pressed, onPressedChange, text = "Show full description"}: Props) {
  return (
    <Toggle className={"mb-1 hover:bg-accent/25 data-[state=on]:bg-accent/50"} pressed={pressed} onPressedChange={onPressedChange} aria-label="Toggle italic">
      <div className={`font-bold ${pressed ? "text-white" : "text-blue-300"}`}>{text}</div>
    </Toggle>
  )
}
