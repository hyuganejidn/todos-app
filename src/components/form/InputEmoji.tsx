import React, { useRef, useState } from "react";
import { EmojiInput } from "../emoji/Emoji";
import { EmojiSuggestion } from "../emoji/EmojiSuggestion";
import { FieldInputProps, FormikState } from 'formik'

type InputFieldProps = {
  form: FormikState<string>
  field: FieldInputProps<string>,

  label: string,
  disabled?: boolean,
  type?: string,
  placeholder: string,
  autoComplete?: string,
}

type NameType = 'task'

// function InputField(props: InputFieldProps): React.ReactNode {


function InputEmoji(props: InputFieldProps): React.ReactNode {
  const { field, form,
    label, disabled, placeholder, autoComplete } = props
  const { name, value } = field
  const { errors, touched } = form
  // const showError = errors['task'] && touched['task']
  const textareaRef = useRef<HTMLTextAreaElement>(document.createElement("textarea"))

  console.log(errors)
  const emojiInserted = (messageWithEmoji: string) => {
    const eventChange = {
      target: {
        name: name,
        value: messageWithEmoji
      }
    }
    field.onChange(eventChange)
    textareaRef.current.focus()
  }

  return (
    <div style={{ position: 'relative' }}>
      <textarea
        style={{ width: 400 }}
        {...field}
        id={name}
        autoComplete={autoComplete || 'off'}
        disabled={disabled || false}
        placeholder={placeholder}
      />
      <EmojiInput value={value} onSelection={emojiInserted} />
      <EmojiSuggestion value={value} onSelection={emojiInserted} />
      <div className="is-invalid"></div>
      {/* {showError && <div>{errors[name as NameType]}</div>} */}
    </div>
  )
}

export default InputEmoji;
