// Generated by https://quicktype.io

export interface Data {
  music: number
  youtubeUrl: string
  name: string
  background: Background
  typing: Typing
  messages: Array<Message | string>
}

export interface Background {
  topColor: string
  bottomColor: string
  type: string
  starAngle: number
  starQuantity: number
  starOpacity: number[]
  starSize: number[]
}

export interface Message {
  text: string
  position: number
  image: string
}

export interface Typing {
  delay: number
  textColor: string
}
