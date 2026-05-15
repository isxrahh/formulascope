"use client";

interface Props {
  onInsert: (text: string) => void;
}

const snippets = [
  {
    label: "H1",
    value: "# ",
  },
  {
    label: "H2",
    value: "## ",
  },
  {
    label: "List",
    value: "- ",
  },
  {
    label: "Bold",
    value: "**bold text**",
  },
  {
    label: "Formula",
    value: "\n$$\nF = ma\n$$\n",
  },
  {
    label: "Fraction",
    value: "\\frac{a}{b}",
  },
  {
    label: "Integral",
    value: "\\int_a^b",
  },
  {
    label: "Summation",
    value: "\\sum_{i=1}^{n}",
  },
  {
    label: "Matrix",
    value:
      "\\begin{bmatrix}\na & b \\\\\nc & d\n\\end{bmatrix}",
  },
];

export default function EditorToolbar({
  onInsert,
}: Props) {
  return (
    <div className="my-8 flex flex-wrap gap-4">
      {snippets.map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={() =>
            onInsert(item.value)
          }
          className="
            rounded-xl border border-white/10
            bg-white/3
            px-3 py-2
            text-sm text-zinc-300

            transition-all duration-200

            hover:border-white/20
            hover:bg-white/6
            hover:text-white
          "
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}