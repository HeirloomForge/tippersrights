import ScatterText from './ScatterText'

type Align = 'left' | 'center'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  useScatter?: boolean
  align?: Align
  className?: string
}

const alignClasses: Record<Align, string> = {
  left: 'text-left',
  center: 'text-center',
}

export default function SectionHeading({
  title,
  subtitle,
  useScatter = false,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`${alignClasses[align]} ${className}`}>
      {useScatter ? (
        <ScatterText
          text={title}
          as="h2"
          className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white"
        />
      ) : (
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white">
          {title}
        </h2>
      )}

      <div
        className={`mt-4 h-1 w-16 rounded-full bg-emerald-500 ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      />

      {subtitle && (
        <p className={`mt-4 text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed ${
          align === 'center' ? 'mx-auto' : ''
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
