interface Props {
  title: string;
  children: React.ReactNode;
}

export default function NoteCard({
  title,
  children,
}: Props) {
  return (
    <div
      className="
        rounded-3xl
        border border-white/10

        bg-zinc-950/80

        p-8

        transition-all duration-300

        hover:border-white/20
        hover:bg-zinc-900
      "
    >
      {/* Label */}
      <div className="mb-6 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-zinc-400" />

        <span
          className="
            text-xs uppercase
            tracking-[0.2em]
            text-zinc-500
          "
        >
          Notes
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
          prose-strong:text-white
          prose-li:text-zinc-300

          [&_.katex-display]:overflow-x-auto
          [&_.katex-display]:py-6
        "
      >
        {children}
      </div>
    </div>
  );
}