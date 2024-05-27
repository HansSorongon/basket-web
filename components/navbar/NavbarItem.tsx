import React, { ReactElement } from 'react';
import { Anchor } from '@mantine/core'
import classes from '../../styles/navbarItem.module.css';

interface NavbarItemProps {
  label: string;
  icon: ReactElement;
  active: boolean;
  link: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  button?: boolean;
}

export default function NavbarItem({ label, icon, active, link, setActive, button = false }: NavbarItemProps) {
  return (
    <Anchor
      className={classes.link}
      data-active={active ? true : undefined}
      href={link}
      key={label}
      onClick={(event) => {
        // event.preventDefault();
        if (!button) setActive(label);
      }}
    >
      <div className={classes.linkIcon}>{icon}</div>
      <span>{label}</span>
    </Anchor>
  );
}
