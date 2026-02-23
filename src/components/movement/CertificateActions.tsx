import { useState } from 'react'
import { toPng } from 'html-to-image'
import MagneticButton from '../shared/MagneticButton'

interface CertificateActionsProps {
  certificateId: string
}

const SHARE_TEXT = "I signed the Tipper's Bill of Rights. Join the movement. #TippersBillOfRights"
const SHARE_URL = 'https://tippersbillofrights.com/movement'

const socialPlatforms = [
  {
    name: 'X',
    icon: '𝕏',
    getUrl: (text: string, url: string) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
  },
  {
    name: 'Facebook',
    icon: 'f',
    getUrl: (_text: string, url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: 'Reddit',
    icon: 'r',
    getUrl: (text: string, url: string) =>
      `https://reddit.com/submit?title=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
  },
  {
    name: 'LinkedIn',
    icon: 'in',
    getUrl: (_text: string, url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
]

export default function CertificateActions({ certificateId }: CertificateActionsProps) {
  const [downloading, setDownloading] = useState(false)
  const [copied, setCopied] = useState(false)

  async function handleDownload() {
    setDownloading(true)
    try {
      const node = document.getElementById('writ-of-ratification')
      if (!node) return

      const dataUrl = await toPng(node, {
        pixelRatio: 2,
        backgroundColor: '#1e1b14',
      })

      const link = document.createElement('a')
      link.download = `${certificateId}.png`
      link.href = dataUrl
      link.click()
    } catch {
      // Silently fail — user can screenshot instead
    } finally {
      setDownloading(false)
    }
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(`${SHARE_TEXT}\n${SHARE_URL}`)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(() => {})
  }

  return (
    <div className="mt-6 space-y-4">
      {/* Download */}
      <div className="flex justify-center">
        <MagneticButton
          variant="primary"
          size="sm"
          onClick={handleDownload}
          disabled={downloading}
        >
          {downloading ? 'Generating...' : 'Download Certificate'}
        </MagneticButton>
      </div>

      {/* Share */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs uppercase tracking-widest text-slate-500">
          Share the movement
        </p>
        <div className="flex items-center gap-2">
          {socialPlatforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.getUrl(SHARE_TEXT, SHARE_URL)}
              target="_blank"
              rel="noopener noreferrer"
              title={`Share on ${platform.name}`}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-800 text-slate-400 text-xs font-bold hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors"
            >
              {platform.icon}
            </a>
          ))}
          <button
            onClick={handleCopyLink}
            title="Copy link"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-800 text-slate-400 text-xs font-bold hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors"
          >
            {copied ? '✓' : '🔗'}
          </button>
        </div>
      </div>
    </div>
  )
}
