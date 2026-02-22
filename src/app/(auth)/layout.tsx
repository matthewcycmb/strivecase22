import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#f9f8f8]">
      {/* Grid pattern background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #614a44 1px, transparent 1px), linear-gradient(to bottom, #614a44 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#f9f8f8_70%)]" />

      {/* Subtle top glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#9cc1e7]/10 blur-3xl" />

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
            <h1 className="text-2xl font-bold tracking-tight text-[#1a1615]">
              DeepSeek
            </h1>
            <p className="text-sm text-[#757170]">
              Manufacturing Platform
            </p>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
