import { Toggle } from "@/components/ui/toggle"

interface Props {
    pressed: boolean
    onPressedChange: () => void
    text?: string
}

export function CustomToggle({pressed, onPressedChange, text = "Show full description"}: Props) {
  return (
    <Toggle className={"mb-1"} pressed={pressed} onPressedChange={onPressedChange} aria-label="Toggle italic">
      <div className={"font-bold text-blue-300"}>{text}</div>
    </Toggle>
  )
}
