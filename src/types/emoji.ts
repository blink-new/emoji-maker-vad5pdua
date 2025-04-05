
export interface EmojiFeatures {
  color: string
  eyeStyle: 'normal' | 'star' | 'heart'
  mouthStyle: 'happy' | 'sad'
  metallic: boolean
  bouncing: boolean
  accessories: ('hat' | 'glasses')[]
  accessoryColor: string
}