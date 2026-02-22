export default function BrainDumpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col bg-[#f9f8f8]">
      <header className="flex shrink-0 items-center justify-between border-b border-border bg-white px-6 py-3">
        <a href="/projects" className="flex items-center gap-2">
          <span className="text-lg font-bold text-[#1a1615]">DeepSeek</span>
          <span className="text-xs uppercase tracking-widest text-[#757170]">Brain Dump</span>
        </a>
        <a
          href="/projects"
          className="text-sm text-[#757170] hover:text-[#1a1615]"
        >
          Back to Projects
        </a>
      </header>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
