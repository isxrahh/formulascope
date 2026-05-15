interface Props {
  title: string;
  children: React.ReactNode;
}

export default function RevisionCard({
  title,
  children,
}: Props) {
  return (
    <div
      className="
        group relative overflow-hidden

        rounded-3xl
        border border-amber-500/20

        bg-linear-to-br
        from-amber-500/10
        via-zinc-950
        to-zinc-950

        p-8

        transition-all duration-300

        hover:border-amber-400/40
        hover:shadow-[0_0_40px_rgba(251,191,36,0.08)]
      "
    >
      {/* Glow */}
      <div
        className="
          absolute inset-0 opacity-0
          transition-opacity duration-300

          group-hover:opacity-100

          bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.12),transparent_70%)]
        "
      />

      <div className="relative z-10">
        {/* Label */}
        <div className="mb-6 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-amber-400" />

          <span
            className="
              text-xs uppercase
              tracking-[0.2em]
              text-amber-300
            "
          >
            Revision
          </span>
        </div>

        {/* Title */}
        <h2
          className="
            mb-6 text-2xl
            font-semibold text-white
          "
        >
          {title}
        </h2>

        {/* Content */}
        <div
          className="
            prose prose-invert max-w-none

            prose-p:text-zinc-200
            prose-headings:text-white
            prose-strong:text-amber-200
            prose-li:text-zinc-300

            [&_.katex-display]:overflow-x-auto
            [&_.katex-display]:py-6

            [&_.katex]:text-amber-100
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
}