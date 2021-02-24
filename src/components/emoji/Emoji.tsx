import "emoji-mart/css/emoji-mart.css"
import React from "react"
import { Picker as EmojiPicker, EmojiData } from "emoji-mart"
import { Dropdown } from "../../layouts/dropdown/Dropdown"
import { Icons } from "../icon/Icon"

interface EmojiInputProps {
  value: string;
  onSelection(contentWithEmoji: string): void;
}

const EmojiInput = ({ value, onSelection }: EmojiInputProps) => {
  return (
    <Dropdown
      icon={Icons.Emoji}
      right="0"
      bottom="0"
      title="Open emoji selector"
      render={dismiss => {
        const addEmoji = (emoji: EmojiData) => {
          if ("native" in emoji) {
            onSelection(`${value}${emoji.native}`)
            dismiss()
          }
        }
        return (
          <EmojiPicker
            set="google"
            native
            emoji=""
            title=""
            onSelect={addEmoji}
          />
        )
      }}
    />
  )
}

export { EmojiInput }