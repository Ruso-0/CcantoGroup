export async function POST(req: Request) {
  const { text } = await req.json()

  // Clean markdown formatting for cleaner speech
  const clean = text
    .replace(/^#{1,3}\s/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/\|[^|]*\|/g, '')
    .replace(/^[-•]\s/gm, '')
    .replace(/^\d+\.\s/gm, '')
    .replace(/\n{2,}/g, '. ')
    .replace(/\n/g, '. ')
    .trim()
    .slice(0, 5000)

  if (!clean) {
    return Response.json({ error: 'No text provided' }, { status: 400 })
  }

  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
  if (!apiKey) {
    return Response.json({ error: 'API key not configured' }, { status: 500 })
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: clean }] }],
        generationConfig: {
          response_modalities: ['AUDIO'],
          speech_config: {
            voice_config: {
              prebuilt_voice_config: {
                voice_name: 'Orus',
              },
            },
          },
        },
      }),
    },
  )

  if (!response.ok) {
    const err = await response.text()
    console.error('TTS API error:', err)
    return Response.json({ error: 'TTS generation failed' }, { status: 500 })
  }

  const data = await response.json()

  const part = data.candidates?.[0]?.content?.parts?.[0]
  if (!part?.inlineData) {
    return Response.json({ error: 'No audio in response' }, { status: 500 })
  }

  const pcmData = Buffer.from(part.inlineData.data, 'base64')
  const mimeType: string = part.inlineData.mimeType || ''

  // Parse sample rate from mimeType (e.g. "audio/L16;rate=24000")
  const rateMatch = mimeType.match(/rate=(\d+)/)
  const sampleRate = rateMatch ? parseInt(rateMatch[1]) : 24000

  // Wrap raw PCM in WAV header so browsers can play it
  const wavBuffer = pcmToWav(pcmData, sampleRate, 1, 16)

  return new Response(new Uint8Array(wavBuffer), {
    headers: {
      'Content-Type': 'audio/wav',
      'Cache-Control': 'private, max-age=3600',
    },
  })
}

function pcmToWav(
  pcmData: Buffer,
  sampleRate: number,
  numChannels: number,
  bitsPerSample: number,
): Buffer {
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8
  const blockAlign = (numChannels * bitsPerSample) / 8
  const dataSize = pcmData.length
  const headerSize = 44
  const buffer = Buffer.alloc(headerSize + dataSize)

  // RIFF header
  buffer.write('RIFF', 0)
  buffer.writeUInt32LE(36 + dataSize, 4)
  buffer.write('WAVE', 8)

  // fmt sub-chunk
  buffer.write('fmt ', 12)
  buffer.writeUInt32LE(16, 16) // sub-chunk size
  buffer.writeUInt16LE(1, 20) // PCM format
  buffer.writeUInt16LE(numChannels, 22)
  buffer.writeUInt32LE(sampleRate, 24)
  buffer.writeUInt32LE(byteRate, 28)
  buffer.writeUInt16LE(blockAlign, 32)
  buffer.writeUInt16LE(bitsPerSample, 34)

  // data sub-chunk
  buffer.write('data', 36)
  buffer.writeUInt32LE(dataSize, 40)
  pcmData.copy(buffer, 44)

  return buffer
}
