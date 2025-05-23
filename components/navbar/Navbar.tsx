
'use client'
import { useState } from 'react';
import { Group, Image, Flex, Title, Text, Box, Avatar, ActionIcon, Tooltip } from '@mantine/core';
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
import { Logo } from '../../common/logo';
import classes from './navbar.module.css';
import { usePathname } from 'next/navigation'

import { logout } from '../../actions/actions';
import NavbarItem from './NavbarItem'

function handleLogout() {
  logout();
}

export default function Navbar({ userDetails }: { userDetails: any }) {

  const [active, setActive] = useState('');
  const path = usePathname();

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Box className={classes.logoSection}>
          <Group className={classes.header}>
            <Logo />
          </Group>
          <Group className={classes.companyTag}>
            <Text>{userDetails.department}</Text>
          </Group>
        </Box>


        <Title order={6} className={classes.navbarSectionHeader}>ASSETS</Title>

        <NavbarItem label='View' icon={<IconTable />} active={path == '/' || false} link='/' setActive={setActive} />
        <NavbarItem label='Add/Import' icon={<IconCirclePlus />} active={path == '/add' || false} link='/add' setActive={setActive} />
        <NavbarItem label='Bundle' icon={<IconPackages />} active={path == '/bundle' || false} link='/bundle' setActive={setActive} />
        <NavbarItem label='Accountability Form' icon={<IconForms />} active={path == '/accountability' || false} link='/accountability' setActive={setActive} />

        <Title order={6} className={classes.navbarSectionHeader}>MANAGE</Title>
        <NavbarItem label='Data Maintenance' icon={<IconServerCog />} active={path == '/dataMaintenance' || false} link='/dataMaintenance' setActive={setActive} />
        <NavbarItem label='Masterlist' icon={<IconTableExport />} active={path == '/masterlist' || false} link='/masterlist' setActive={setActive} />

      </div>

      <div>
        <NavbarItem label='Collapse' icon={<IconLayoutSidebarLeftCollapse />} active={active == 'Collapse' || false} link='/' setActive={setActive} button />
        <NavbarItem label='Recent Logs' icon={<IconHistory />} active={active == 'Recent Logs' || false} link='/' setActive={setActive} button />
        <NavbarItem label='Settings' icon={<IconSettings2 />} active={active == 'Settings' || false} link='/' setActive={setActive} button />

        <Flex
          justify='space-between'
          p='sm'
          bg="var(--mantine-color-gray-3)"
          gap="xs"
          wrap="wrap"
          className={classes.profileContainer}
        >

          <Group gap='xs' justify='flex-start'>
            <Avatar radius='xl' />
            <Box>
              <Text size='sm' fw={700}>{userDetails.firstName + ' ' + userDetails.lastName}</Text>
              <Text size='xs' c='var(--mantine-color-gray-8)'>{userDetails.email}</Text>
            </Box>
          </Group>

          <Tooltip label="Log Out">
            <ActionIcon variant='subtle' onClick={handleLogout}>
              <IconLogout className={classes.linkIcon} size='27px' />
            </ActionIcon>
          </Tooltip>

        </Flex>

      </div>

    </nav>
  );
}
