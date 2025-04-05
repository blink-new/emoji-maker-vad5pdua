
import { useState, useRef, useEffect } from 'react'
import { Button } from './components/ui/button'
import { Card } from './components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Slider } from './components/ui/slider'
import { Download, Smile, Eye, Frown } from 'lucide-react'

const CANVAS_SIZE = 400
const EMOJI_SIZE = 300

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [color, setColor] = useState('#FFE55C')
  const [eyeStyle, setEyeStyle] = useState<'normal' | 'happy'>('normal')
  const [mouthStyle, setMouthStyle] = useState<'smile' | 'frown'>('smile')
  const [eyeSize, setEyeSize] = useState([30])

  useEffect(() => {
    drawEmoji()
  }, [color, eyeStyle, mouthStyle, eyeSize])

  const drawEmoji = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

    // Draw face
    ctx.beginPath()
    ctx.arc(CANVAS_SIZE/2, CANVAS_SIZE/2, EMOJI_SIZE/2, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()

    // Draw eyes
    const eyeY = CANVAS_SIZE/2 - 30
    const leftEyeX = CANVAS_SIZE/2 - 60
    const rightEyeX = CANVAS_SIZE/2 + 60

    if (eyeStyle === 'normal') {
      // Left eye
      ctx.beginPath()
      ctx.arc(leftEyeX, eyeY, eyeSize[0], 0, Math.PI * 2)
      ctx.fillStyle = '#000'
      ctx.fill()

      // Right eye
      ctx.beginPath()
      ctx.arc(rightEyeX, eyeY, eyeSize[0], 0, Math.PI * 2)
      ctx.fillStyle = '#000'
      ctx.fill()
    } else {
      // Happy eyes
      ctx.beginPath()
      ctx.arc(leftEyeX, eyeY, eyeSize[0], Math.PI, 0, true)
      ctx.strokeStyle = '#000'
      ctx.lineWidth = 5
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(rightEyeX, eyeY, eyeSize[0], Math.PI, 0, true)
      ctx.stroke()
    }

    // Draw mouth
    ctx.beginPath()
    if (mouthStyle === 'smile') {
      ctx.arc(CANVAS_SIZE/2, CANVAS_SIZE/2 + 30, 80, 0, Math.PI)
    } else {
      ctx.arc(CANVAS_SIZE/2, CANVAS_SIZE/2 + 80, 80, Math.PI, Math.PI * 2)
    }
    ctx.strokeStyle = '#000'
    ctx.lineWidth = 5
    ctx.stroke()
  }

  const downloadEmoji = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement('a')
    link.download = 'my-emoji.png'
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-900">Emoji Maker</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6 bg-white/50 backdrop-blur-sm">
            <canvas
              ref={canvasRef}
              width={CANVAS_SIZE}
              height={CANVAS_SIZE}
              className="w-full aspect-square rounded-lg bg-white shadow-inner"
            />
          </Card>

          <Card className="p-6 bg-white/50 backdrop-blur-sm">
            <Tabs defaultValue="face" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="face" className="flex-1">Face</TabsTrigger>
                <TabsTrigger value="eyes" className="flex-1">Eyes</TabsTrigger>
                <TabsTrigger value="mouth" className="flex-1">Mouth</TabsTrigger>
              </TabsList>

              <TabsContent value="face" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Color</label>
                  <input 
                    type="color" 
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>
              </TabsContent>

              <TabsContent value="eyes" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Eye Style</label>
                  <div className="flex gap-2">
                    <Button
                      variant={eyeStyle === 'normal' ? 'default' : 'outline'}
                      onClick={() => setEyeStyle('normal')}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Normal
                    </Button>
                    <Button
                      variant={eyeStyle === 'happy' ? 'default' : 'outline'}
                      onClick={() => setEyeStyle('happy')}
                    >
                      <Smile className="w-4 h-4 mr-2" />
                      Happy
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Eye Size</label>
                  <Slider
                    value={eyeSize}
                    onValueChange={setEyeSize}
                    min={10}
                    max={50}
                    step={1}
                  />
                </div>
              </TabsContent>

              <TabsContent value="mouth" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mouth Style</label>
                  <div className="flex gap-2">
                    <Button
                      variant={mouthStyle === 'smile' ? 'default' : 'outline'}
                      onClick={() => setMouthStyle('smile')}
                    >
                      <Smile className="w-4 h-4 mr-2" />
                      Smile
                    </Button>
                    <Button
                      variant={mouthStyle === 'frown' ? 'default' : 'outline'}
                      onClick={() => setMouthStyle('frown')}
                    >
                      <Frown className="w-4 h-4 mr-2" />
                      Frown
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8">
              <Button onClick={downloadEmoji} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Emoji
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}