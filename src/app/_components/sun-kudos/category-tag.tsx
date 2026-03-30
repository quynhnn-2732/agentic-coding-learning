interface CategoryTagProps {
  tag: string
}

export function CategoryTag({ tag }: CategoryTagProps) {
  if (!tag) return null

  return (
    <span className="inline-block font-montserrat font-bold text-base leading-6 tracking-[0.5px] text-[#00101A]">
      {tag}
    </span>
  )
}
