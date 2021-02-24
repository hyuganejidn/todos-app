import React, { SVGProps } from "react"
import { ReactComponent as Emoji } from "../../assets/svg/emoji.svg"

interface IconWrapperProps {
  clickable?: boolean;
}

export enum Icons {
  Emoji = "Emoji",
}

interface IconProps extends IconWrapperProps, SVGProps<SVGSVGElement> {
  /** Icon file to display */
  icon: Icons
  /** Human readable name */
  title?: string
}

type IconComponentsType = {
  [key in Icons]: typeof Emoji
}

const IconComponents: IconComponentsType = { Emoji }

export const Icon = ({ icon, clickable, color, ...rest }: IconProps) => {
  const IconFile = IconComponents[icon];

  return (
    <IconFile {...rest} />
  )
}
