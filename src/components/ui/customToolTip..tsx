import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip"

interface Props {
    children: React.ReactNode
    text: string
}

export const CustomToolTip = ({children, text}: Props) => {
    return (
        <TooltipProvider>
  <Tooltip>
    <TooltipTrigger className={'truncate cursor-default'}>{children}</TooltipTrigger>
    <TooltipContent>
      <p>{text}</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
    )
}