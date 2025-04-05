
export interface EmojiFeatures {
  color: string
  eyeStyle: 'normal' | 'star' | 'heart' | 'wink' | 'closed' | 'surprised'
  mouthStyle: 'happy' | 'sad'
  metallic: boolean
  bouncing: boolean
  accessories: ('hat' | 'glasses')[]
  accessoryColor: string
}