

"use client"

import { memo, useEffect, useRef } from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

const lineVariants = {
  normal: { width: 24 },
  active: { width: 40 },
  hover: { width: 40 },
}

export type LineNavItem = {
  title: string
  href: string
  count?: number
}

export type LineNavProps = {
  className?: string
  
  items: LineNavItem[]
  
  activeHref?: string
  
  scrollActiveIntoView?: boolean
  
  align?: "left" | "right"
  
  onItemClick?: (
    item: LineNavItem,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => void
}

export function LineNav({
  className,
  items,
  activeHref,
  scrollActiveIntoView = false,
  align = "left",
  onItemClick,
}: LineNavProps) {
  const activeItemRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    if (scrollActiveIntoView) {
      activeItemRef.current?.scrollIntoView({ block: "center" })
    }
  }, [scrollActiveIntoView])

  return (
    <nav
      className={cn(
        "flex flex-col gap-2 py-2",
        align === "right" && "items-end",
        className
      )}
      style={
        {
          "--line-nav-width": `${lineVariants.normal.width}px`,
        } as React.CSSProperties
      }
    >
      {items.map((item, index) => {
        const isActive = item.href === activeHref

        return (
          <LineNavItem
            key={item.href}
            ref={isActive ? activeItemRef : undefined}
            title={item.title}
            href={item.href}
            count={item.count}
            active={isActive}
            align={align}
            isLast={index === items.length - 1}
            onClick={
              onItemClick ? (event) => onItemClick(item, event) : undefined
            }
          />
        )
      })}
    </nav>
  )
}

const LineNavItem = memo(function LineNavItem({
  ref,
  title,
  href,
  count,
  active = false,
  align = "left",
  isLast = false,
  onClick,
}: {
  ref?: React.Ref<HTMLAnchorElement>
  title: string
  href: string
  count?: number
  active?: boolean
  align?: "left" | "right"
  isLast?: boolean
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}) {
  const isRight = align === "right"

  return (
    <>
      <motion.a
        ref={ref}
        aria-current={active ? "page" : undefined}
        className={cn(
          "group relative flex h-px items-center gap-3 after:absolute after:top-1/2 after:size-full after:-translate-y-1/2 after:p-3.5 cursor-pointer select-none",
          isRight ? "flex-row-reverse after:right-0" : "after:left-0"
        )}
        href={href}
        initial={false}
        animate={active ? "active" : "normal"}
        whileHover="hover"
        onClick={(e) => {
          if (onClick) {
            e.preventDefault()
          }
          if (onClick) {
            onClick(e)
          }
        }}
      >
        <motion.span
          className="block h-px shrink-0 bg-white/25 transition-[background-color] ease-out group-hover:bg-white group-aria-[current=page]:bg-white"
          variants={lineVariants}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />
        <span
          className={cn(
            "text-[11px] sm:text-xs font-mono tracking-wider whitespace-nowrap text-stone-400 transition-[color,font-weight] ease-out group-hover:text-white group-aria-[current=page]:text-white group-aria-[current=page]:font-bold flex items-center gap-1.5",
            isRight && "flex-row-reverse"
          )}
        >
          <span>{title}</span>
          {typeof count === "number" && (
            <span className="text-[9.5px] font-mono text-stone-500 group-hover:text-stone-300 group-aria-[current=page]:text-stone-300 font-normal">
              ({count})
            </span>
          )}
        </span>
      </motion.a>

      {!isLast && (
        <>
          <span
            className={cn(
              "block h-px w-[var(--line-nav-width)] bg-white/10",
              isRight && "self-end"
            )}
          />
          <span
            className={cn(
              "block h-px w-[var(--line-nav-width)] bg-white/10",
              isRight && "self-end"
            )}
          />
        </>
      )}
    </>
  )
})
