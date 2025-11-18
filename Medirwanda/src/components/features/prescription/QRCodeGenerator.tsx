import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

type Props = {
  value: string
  size?: number
}

export default function QRCodeGenerator({ value, size = 256 }: Props) {
  const [url, setUrl] = useState<string>('')
  useEffect(() => {
    QRCode.toDataURL(value, { width: size, margin: 1 }).then(setUrl).catch(()=>setUrl(''))
  }, [value, size])
  if (!url) return <div className="h-64 w-64 grid place-items-center border border-white/10 rounded-md">Generating…</div>
  return (
    <img src={url} width={size} height={size} alt="Prescription QR" className="rounded-md border border-white/10" />
  )
}