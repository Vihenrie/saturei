import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'
import type * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding leading-none text-sm font-medium whitespace-nowrap transition-all duration-150 outline-none cursor-pointer select-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground active:bg-primary/85',

        accent: 'bg-accent text-accent-foreground active:bg-accent/85',

        outline: 'border-border bg-background text-foreground active:bg-muted',

        secondary:
          'bg-secondary text-secondary-foreground active:bg-secondary/85',

        ghost: 'text-foreground active:bg-muted',

        destructive: 'bg-destructive text-white active:bg-destructive/85',

        link: 'text-primary underline-offset-4 active:underline',
      },

      size: {
        default: 'h-9 px-4 gap-2',

        xs: "h-6 px-2 text-xs gap-1 rounded-md [&_svg:not([class*='size-'])]:size-3",

        sm: "h-8 px-3 text-sm gap-1.5 rounded-md [&_svg:not([class*='size-'])]:size-3.5",

        lg: 'h-11 px-6 text-base gap-2.5',

        icon: 'size-9',

        'icon-sm': 'size-8',

        'icon-lg': 'size-11',
      },
    },

    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : 'button'

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
