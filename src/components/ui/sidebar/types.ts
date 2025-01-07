import * as React from "react"
import { TooltipContent } from "@/components/ui/tooltip"

export type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

export type SidebarProviderProps = {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

export type SidebarProps = {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
} & React.ComponentProps<"div">

export type SidebarMenuButtonProps = {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
} & React.ComponentProps<"button">

export type SidebarMenuActionProps = {
  asChild?: boolean
  showOnHover?: boolean
} & React.ComponentProps<"button">

export type SidebarMenuSkeletonProps = {
  showIcon?: boolean
} & React.ComponentProps<"div">