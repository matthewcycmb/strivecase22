import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background">
      {/* Grid pattern background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_hsl(var(--background))_70%)]" />

      {/* Subtle top glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative z-10 flex w-full flex-col items-center px-4 py-12">
        {/* DeepSeek Branding */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <Image
            src="/deepseek-logo.png"
            alt="DeepSeek"
            width={56}
            height={56}
          />
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              DeepSeek
            </h1>
            <p className="text-sm text-muted-foreground">
              Manufacturing Platform
            </p>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
