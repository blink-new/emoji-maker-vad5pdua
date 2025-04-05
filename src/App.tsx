
import { useState } from 'react'
import { Button } from './components/ui/button'
import { Card } from './components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Switch } from './components/ui/switch'
import { Label } from './components/ui/label'
import { EmojiCanvas } from './components/EmojiCanvas'
import { EmojiFeatures } from './types/emoji'
import { 
  Download, 
  Smile, 
  Eye, 
  PartyPopper, 
  Glasses as GlassesIcon, 
  Sparkles 
} from 'lucide-react'

export default function App() {
  const [features, setFeatures] = useState<EmojiFeatures>({
    color: '#FFE55C',
    eyeStyle: 'normal',
    mouthStyle: 'happy',
    metallic: false,
    bouncing: true,
    accessories: [],
    accessoryColor: '#FF5C5C'
  })

  const downloadEmoji = () => {
    const canvas = document.querySelector('canvas')
    if (!canvas) return
    
    const link = document.createElement('a')
    link.download = 'my-3d-emoji.png'
    link.href = canvas.toDataURL()
    link.click()
  }

  const toggleAccessory = (accessory: 'hat' | 'glasses') => {
    setFeatures(prev => ({
      ...prev,
      accessories: prev.accessories.includes(accessory)
        ? prev.accessories.filter(a => a !== accessory)
        : [...prev.accessories, accessory]
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-900">
          3D Emoji Creator
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6 bg-white/50 backdrop-blur-sm">
            <EmojiCanvas features={features} />
          </Card>

          <Card className="p-6 bg-white/50 backdrop-blur-sm">
            <Tabs defaultValue="style" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="style" className="flex-1">Style</TabsTrigger>
                <TabsTrigger value="face" className="flex-1">Face</TabsTrigger>
                <TabsTrigger value="accessories" className="flex-1">Extras</TabsTrigger>
              </TabsList>

              <TabsContent value="style" className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Color</label>
                  <input 
                    type="color" 
                    value={features.color}
                    onChange={(e) => setFeatures(prev => ({ ...prev, color: e.target.value }))}
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={features.metallic}
                    onCheckedChange={(checked) => 
                      setFeatures(prev => ({ ...prev, metallic: checked }))
                    }
                  />
                  <Label>Metallic Finish</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={features.bouncing}
                    onCheckedChange={(checked) => 
                      setFeatures(prev => ({ ...prev, bouncing: checked }))
                    }
                  />
                  <Label>Bouncy Animation</Label>
                </div>
              </TabsContent>

              <TabsContent value="face" className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Eye Style</label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={features.eyeStyle === 'normal' ? 'default' : 'outline'}
                      onClick={() => setFeatures(prev => ({ ...prev, eyeStyle: 'normal' }))}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Normal
                    </Button>
                    <Button
                      variant={features.eyeStyle === 'star' ? 'default' : 'outline'}
                      onClick={() => setFeatures(prev => ({ ...prev, eyeStyle: 'star' }))}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Star
                    </Button>
                    <Button
                      variant={features.eyeStyle === 'heart' ? 'default' : 'outline'}
                      onClick={() => setFeatures(prev => ({ ...prev, eyeStyle: 'heart' }))}
                    >
                      ❤️ Heart
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Expression</label>
                  <div className="flex gap-2">
                    <Button
                      variant={features.mouthStyle === 'happy' ? 'default' : 'outline'}
                      onClick={() => setFeatures(prev => ({ ...prev, mouthStyle: 'happy' }))}
                      className="flex-1"
                    >
                      <Smile className="w-4 h-4 mr-2" />
                      Happy
                    </Button>
                    <Button
                      variant={features.mouthStyle === 'sad' ? 'default' : 'outline'}
                      onClick={() => setFeatures(prev => ({ ...prev, mouthStyle: 'sad' }))}
                      className="flex-1"
                    >
                      😢 Sad
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="accessories" className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Accessories</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={features.accessories.includes('hat') ? 'default' : 'outline'}
                      onClick={() => toggleAccessory('hat')}
                    >
                      <PartyPopper className="w-4 h-4 mr-2" />
                      Party Hat
                    </Button>
                    <Button
                      variant={features.accessories.includes('glasses') ? 'default' : 'outline'}
                      onClick={() => toggleAccessory('glasses')}
                    >
                      <GlassesIcon className="w-4 h-4 mr-2" />
                      Cool Glasses
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Accessory Color</label>
                  <input 
                    type="color" 
                    value={features.accessoryColor}
                    onChange={(e) => setFeatures(prev => ({ ...prev, accessoryColor: e.target.value }))}
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8">
              <Button onClick={downloadEmoji} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download 3D Emoji
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}