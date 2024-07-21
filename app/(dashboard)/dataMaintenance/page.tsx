import { Flex, Title, Divider } from '@mantine/core'

import DataMaintenanceContainer from '../../../components/dataMaintenance/DataMaintenanceContainer';

export default function DataMaintenance() {
  return (
    <Flex direction='column'>

      < Title lineClamp={1}>Data Maintenance</Title >
      <Divider my='md' />


      <DataMaintenanceContainer />

    </Flex >

  );
}
