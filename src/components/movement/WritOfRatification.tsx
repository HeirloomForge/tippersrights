import { useRef } from 'react'

interface WritOfRatificationProps {
  signerName: string
  certificateId: string
  signedAt: string
}

/**
 * "Writ of Ratification" certificate component.
 * Rendered as a styled HTML element that html-to-image can capture.
 * Parchment aesthetic with constitutional typography.
 */
export default function WritOfRatification({
  signerName,
  certificateId,
  signedAt,
}: WritOfRatificationProps) {
  const ref = useRef<HTMLDivElement>(null)

  const formattedDate = new Date(signedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div
      ref={ref}
      id="writ-of-ratification"
      className="relative mx-auto overflow-hidden rounded-lg"
      style={{
        width: '600px',
        maxWidth: '100%',
        aspectRatio: '1200 / 630',
        background: 'linear-gradient(135deg, #1e1b14 0%, #2a2518 30%, #1c1a12 60%, #252116 100%)',
        border: '2px solid rgba(180, 160, 100, 0.3)',
        boxShadow: '0 0 40px rgba(180, 160, 100, 0.1), inset 0 0 60px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Parchment texture overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(200, 180, 120, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(200, 180, 120, 0.3) 0%, transparent 50%)',
        }}
      />

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center h-full px-8 py-6 text-center">
        {/* Top ornamental line */}
        <div className="w-32 h-px mb-3" style={{ background: 'linear-gradient(90deg, transparent, rgba(180, 160, 100, 0.5), transparent)' }} />

        <h2
          className="text-xs uppercase tracking-[0.3em] mb-1"
          style={{ color: 'rgba(180, 160, 100, 0.7)', fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          Writ of Ratification
        </h2>

        <h3
          className="text-[10px] uppercase tracking-[0.2em] mb-4"
          style={{ color: 'rgba(180, 160, 100, 0.5)', fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          Tipper's Bill of Rights
        </h3>

        {/* Decorative divider */}
        <div className="w-48 h-px mb-4" style={{ background: 'linear-gradient(90deg, transparent, rgba(180, 160, 100, 0.3), transparent)' }} />

        {/* Body text */}
        <p
          className="text-[11px] leading-relaxed max-w-[440px] mb-4"
          style={{ color: 'rgba(220, 210, 180, 0.85)', fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          Be it known that{' '}
          <span className="font-bold" style={{ color: '#d4c896' }}>
            {signerName}
          </span>{' '}
          has, on this{' '}
          <span style={{ color: '#d4c896' }}>{formattedDate}</span>,
          affixed their signature to the Tipper's Bill of Rights, and is hereby
          recognized as a{' '}
          <span className="font-bold italic" style={{ color: '#10b981' }}>
            Founding Signer
          </span>{' '}
          of the Movement.
        </p>

        {/* Certificate ID */}
        <div
          className="px-4 py-1.5 rounded mb-3"
          style={{
            border: '1px solid rgba(16, 185, 129, 0.3)',
            background: 'rgba(16, 185, 129, 0.08)',
          }}
        >
          <p
            className="text-[10px] uppercase tracking-widest mb-0.5"
            style={{ color: 'rgba(16, 185, 129, 0.6)' }}
          >
            Certificate
          </p>
          <p
            className="text-sm font-mono font-bold tracking-wider"
            style={{ color: '#10b981' }}
          >
            {certificateId}
          </p>
        </div>

        {/* Bottom ornamental line */}
        <div className="w-32 h-px mb-2" style={{ background: 'linear-gradient(90deg, transparent, rgba(180, 160, 100, 0.3), transparent)' }} />

        {/* Branding */}
        <p
          className="text-[9px] tracking-wider"
          style={{ color: 'rgba(180, 160, 100, 0.4)' }}
        >
          tippersbillofrights.com
        </p>
      </div>
    </div>
  )
}
