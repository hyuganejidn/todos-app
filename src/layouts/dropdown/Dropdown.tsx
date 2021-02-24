import React, { ReactNode, FC, useState, useCallback, useRef } from "react";
import { Icon, Icons } from "../../components/icon/Icon";
import useClickOutside from "../../hooks/useClickOutside";

interface DropdownProps {
  /** Icon name to display as open button */
  icon: Icons;
  /** Title for the Icon */
  title: string;
  /** Top position of the Dropdown */
  top?: string | number;
  /** Bottom position of the Dropdown */
  bottom?: string | number;
  /** Left position of the Dropdown */
  left?: string | number;
  /** Right position of the Dropdown */
  right?: string | number;
  /** Function prop for Dropdown content */
  render: (dismiss: () => void) => ReactNode;
}

export const Dropdown: FC<DropdownProps> = ({
  icon,
  render,
  top,
  bottom,
  left,
  right,
  title
}) => {
  const [showDropdown, setDropdownState] = useState(false)
  const dropdown = useRef<HTMLDivElement>(null)

  const dismissDropdown = useCallback(() => {
    setDropdownState(false)
  }, [setDropdownState])

  useClickOutside(dropdown, dismissDropdown)

  const toggleDropdown = () => {
    setDropdownState(!showDropdown);
  };

  return (
    <div ref={dropdown} style={{ position: 'absolute', right: 10, top: 10 }}>
      <Icon onClick={toggleDropdown} icon={icon} title={title} clickable />
      {showDropdown && render(dismissDropdown)}
    </div>
  )
}
