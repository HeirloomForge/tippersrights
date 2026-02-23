import { useState } from 'react'
import { toPng } from 'html-to-image'
import MagneticButton from '../shared/MagneticButton'

interface CertificateActionsProps {
  certificateId: string
}

const SHARE_TEXT = "I signed the Tipper's Bill of Rights. Join the movement. #TippersBillOfRights"
const SHARE_URL = 'https://tippersbillofrights.com/movement'

export default function CertificateActions({ certificateId }: CertificateActionsProps) {
  const [downloading, setDownloading] = useState(false)
  const [copied, setCopied] = useState(false)

  async function getCertificateImage(): Promise<Blob | null> {
    const node = document.getElementById('writ-of-ratification')
    if (!node) return null

    try {
      // Generate at 2x for crisp output (1200x630)
      const dataUrl = await toPng(node, {
        width: 1200,
        height: 630,
        pixelRatio: 2,
        backgroundColor: '#1e1b14',
      })
      const response = await fetch(dataUrl)
      return await response.blob()
    } catch {
      return null
    }
  }

  async function handleDownload() {
    setDownloading(true)
    try {
      const node = document.getElementById('writ-of-ratification')
      if (!node) return

      const dataUrl = await toPng(node, {
        width: 1200,
        height: 630,
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

  async function handleShare() {
    // Try native Web Share API (mobile)
    if (navigator.share) {
      try {
        const blob = await getCertificateImage()
        if (blob) {
          const file = new File([blob], `${certificateId}.png`, { type: 'image/png' })
          await navigator.share({
            title: "Tipper's Bill of Rights",
            text: SHARE_TEXT,
            url: SHARE_URL,
            files: [file],
          })
          return
        }
      } catch {
        // User cancelled or share failed — fall through to clipboard
      }
    }

    // Fallback: copy share text to clipboard
    try {
      await navigator.clipboard.writeText(`${SHARE_TEXT}\n${SHARE_URL}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Last resort — ignore
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
      <MagneticButton
        variant="primary"
        size="sm"
        onClick={handleDownload}
        disabled={downloading}
      >
        {downloading ? 'Generating...' : 'Download Certificate'}
      </MagneticButton>

      <MagneticButton
        variant="outline"
        size="sm"
        onClick={handleShare}
      >
        {copied ? 'Copied!' : 'Share'}
      </MagneticButton>
    </div>
  )
}
