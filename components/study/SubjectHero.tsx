interface Props {
  title: string;
  description: string;
  glowClass?: string;
}

export default function SubjectHero({ title, description, glowClass }: Props) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/3 p-10 mb-12">
      <div className={`absolute inset-0 blur-3xl ${glowClass}`} />
      <div className="relative">
        <p className="mb-3 py-2 text-sm uppercase tracking-[0.3em] text-zinc-500">
          Subject Workspace
        </p>

        <h1 className="text-6xl font-bold tracking-tight py-4 text-zinc-100">
          {title}
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-400">
          {description}
        </p>
      </div>
    </section>
  );
}
