export default function BrainDumpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="flex shrink-0 items-center justify-between border-b border-white/10 px-6 py-3">
        <a href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold text-white">DeepSeek</span>
          <span className="text-xs uppercase tracking-widest text-zinc-500">Brain Dump</span>
        </a>
        <a
          href="/"
          className="text-sm text-zinc-400 hover:text-white"
        >
          Back to Dashboard
        </a>
      </header>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
