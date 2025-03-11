interface InlineCodeProps {
  children: React.ReactNode
}

export function InlineCode({ children }: InlineCodeProps) {
  return (
    <code className="rounded-md bg-primary-900/5 px-1.5 py-0.5 font-mono text-[0.9em] font-normal text-primary-600">
      {children}
    </code>
  )
} 