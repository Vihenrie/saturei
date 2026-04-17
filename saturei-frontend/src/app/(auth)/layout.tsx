import type { PropsWithChildren } from 'react'
import { Banner } from './banner'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen p-5 grid grid-cols-2">
      <Banner />
      {children}
    </div>
  )
}
