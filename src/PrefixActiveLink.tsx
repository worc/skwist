import React from 'react'
import { Link, useLocation } from 'wouter'
import type { AnchorHTMLAttributes, RefAttributes, ReactNode } from 'react'

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'href'> &
  RefAttributes<HTMLAnchorElement> & {
    to: string
    className?: string | ((isActive: boolean) => string | undefined)
    children?: ReactNode
  }

export default function PrefixActiveLink ({ to, className, children, ...rest }: Props) {
  const [location] = useLocation()
  const active = location.startsWith(to)
  const resolvedClassName = typeof className === 'function' ? className(active) : className

  return (
    <Link to={to} className={resolvedClassName} {...rest}>
      {children}
    </Link>
  )
}
