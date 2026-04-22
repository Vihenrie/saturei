import type { PropsWithChildren } from 'react'

export function ErrorMessage({ children }: PropsWithChildren) {
  return <p className="text-xs text-destructive">{children}</p>
}
