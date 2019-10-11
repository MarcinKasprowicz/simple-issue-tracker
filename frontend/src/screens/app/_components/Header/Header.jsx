import { Box, Button, Image, Text } from 'grommet';
import { Logout } from 'grommet-icons';
import React from 'react';
import { getUser, logout } from '../../../../services/auth.service';
import ash from './ash.png';

const Header = () => {
  const user = getUser();
  return (
    <Box
      gridArea="header"
      direction="row"
      align="center"
      justify="end"
      pad={{ horizontal: 'medium', vertical: 'small' }}
      background="light-2"
      gap="medium"
      elevation="xsmall"
    >
      <Box height="xxsmall" width="xxsmall">
        <Image fit="cover" src={ash} />
      </Box>
      <Text>
        {user.firstName} {user.lastName}
      </Text>
      <Button icon={<Logout />} onClick={() => logout()} />
    </Box>
  );
};

export default Header;
