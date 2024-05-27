
'use client'
import { useState } from 'react';
import { Group, Flex, Title, Text, Box, Image, ActionIcon } from '@mantine/core';
import {
  IconTable,
  IconCirclePlus,
  IconPackages,
  IconForms,
  IconServerCog,
  IconTableExport,
  IconLayoutSidebarLeftCollapse,
  IconHistory,
  IconSettings2,
  IconLogout
} from '@tabler/icons-react';
import { Logo } from './logo'
import classes from './navbar.module.css';
import { usePathname } from 'next/navigation'

import NavbarItem from './NavbarItem'

export default function Navbar() {
  const [active, setActive] = useState('');

  const path = usePathname();
  console.log(path)

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Box className={classes.logoSection}>
          <Group className={classes.header}>
            <Logo />
            <Title order={1}>Basket</Title>
          </Group>
          <Group className={classes.companyTag}>
            <Image radius='xl' h={20} w={20} src='pointwestLogo.png' />
            <Text>Pointwest</Text>
          </Group>
        </Box>


        <Title order={6} className={classes.navbarSectionHeader}>ASSETS</Title>

        <NavbarItem label='View' icon={<IconTable />} active={path == '/' || false} link='/' setActive={setActive} />
        <NavbarItem label='Add/Import' icon={<IconCirclePlus />} active={path == '/add' || false} link='/add' setActive={setActive} />
        <NavbarItem label='Bundle' icon={<IconPackages />} active={path == '/bundle' || false} link='/bundle' setActive={setActive} />
        <NavbarItem label='Accountability Form' icon={<IconForms />} active={path == '/accountability' || false} link='/accountability' setActive={setActive} />

        <Title order={6} className={classes.navbarSectionHeader}>MANAGE</Title>
        <NavbarItem label='Data Maintenance' icon={<IconServerCog />} active={path == '/data_maintenance' || false} link='/data_maintenance' setActive={setActive} />
        <NavbarItem label='Masterlist' icon={<IconTableExport />} active={path == '/masterlist' || false} link='/masterlist' setActive={setActive} />

      </div>

      <div>
        <NavbarItem label='Collapse' icon={<IconLayoutSidebarLeftCollapse />} active={active == 'Collapse' || false} link='/' setActive={setActive} button />
        <NavbarItem label='Masterlist' icon={<IconHistory />} active={active == 'Recent Logs' || false} link='/' setActive={setActive} button />
        <NavbarItem label='Masterlist' icon={<IconSettings2 />} active={active == 'Settings' || false} link='/' setActive={setActive} button />

        <Flex
          justify='space-between'
          p='sm'
          bg="var(--mantine-color-gray-3)"
          gap="xs"
          wrap="wrap"
          className={classes.profileContainer}
        >

          <Group gap='xs' justify='flex-start'>
            <Image radius='xl' h={35} w={35} src='janthony.png' />
            <Box>
              <Text size='sm' fw={700}>Jan Anthony Murillo</Text>
              <Text size='xs' c='var(--mantine-color-gray-8)'>jan_murillo@dlsu.edu.ph</Text>
            </Box>
          </Group>

          <ActionIcon variant='subtle'>
            <IconLogout className={classes.linkIcon} size='27px' />
          </ActionIcon>

        </Flex>

      </div>

    </nav>
  );
}
