import React, { useRef } from "react"
import { EmojiData, emojiIndex } from "emoji-mart"

import "emoji-mart/css/emoji-mart.css"
import useClickOutside from "../../hooks/useClickOutside"

type EmojiInputProps = {
  value: string
  onSelection(contentWithEmoji: string): any
}

const getEmojisFromEmojiSearchTerm = (emojiSearchTerm: string) =>
  (emojiIndex.search(emojiSearchTerm) as any) as EmojiData[]

const getEmojiSearchTerm = (content: string, replaceEmoji: (search: string, emoji: EmojiData, value: string) => void) => {
  const colons = content.match(/:([a-z_]+)(:)?/)
  if (!colons) return ""

  if (colons[2] !== undefined) {
    const match = emojiIndex.emojis[colons[1]]
    if (match && "native" in match) {
      replaceEmoji(colons[1] + ':', match, content)
    } else {
      const results = (emojiIndex.search(colons[1]) as any) as EmojiData[]
      if (results[0] && "native" in results[0]) {
        replaceEmoji(colons[1] + ':', (results[0] as any), content)
      }
    }
    return ""
  }

  if (colons[1].length > 1) return colons[1]

  return ""
}


const EmojiSuggestion = ({ value, onSelection }: EmojiInputProps) => {
  const suggestions = useRef<HTMLDivElement>(null)

  const replaceEmoji = (search: string, emoji: EmojiData, value: string) => {
    if ("native" in emoji) {
      const txt = value.replace(`:${search}`, emoji.native)
      onSelection(txt)
    }
  }

  let displayed = false

  const emojiSearchTerm = getEmojiSearchTerm(value, replaceEmoji)
  const emojis = getEmojisFromEmojiSearchTerm(emojiSearchTerm)

  if (emojiSearchTerm !== "" && emojis.length > 0) {
    displayed = true
  } else {
    displayed = false
  }
  useClickOutside(suggestions, () => { displayed = false })

  const EmojiResult = ({ emoji }: { emoji: EmojiData }) => {
    return (
      <li onClick={() => replaceEmoji(emojiSearchTerm, emoji, value)}>
        {"native" in emoji && emoji.native}
        {emoji.colons}
      </li>
    )
  }

  return (
    <>
      {displayed && (
        <div ref={suggestions}>
          Suggestions for <b>{emojiSearchTerm}</b>

          {emojis.map((emoji, i) => (
            <EmojiResult key={i} emoji={emoji}></EmojiResult>
          ))}
        </div>
      )}
    </>
  )
}

export { EmojiSuggestion }
