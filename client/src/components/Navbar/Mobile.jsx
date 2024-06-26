import { AiOutlineClose } from 'react-icons/ai';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Button, Heading, Flex, List, ListItem, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import Auth from '../../utils/auth';

const Mobile = ({ links, handleSetMobile }) => {
  const navigate = useNavigate();
  const MOBILE_SIZE = 768;

  const handleResize = (e) => {
    if (e.target.innerWidth > MOBILE_SIZE) {
      handleSetMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box position="relative" bg="teal.500" minH="50px">
      <Box
        zIndex={10}
        p="0.5rem"
        bg="teal.700"
        borderRadius={8}
        position="absolute"
        w="220px"
        minH={['350px', '400px', '400px']}
        top="35px"
        right="0"
      >
        <Flex
          onClick={() => handleSetMobile(false)}
          justify="flex-end"
          cursor="pointer"
          p="0.25rem"
          color="#fff"
          fontSize="1.75rem"
        >
          <AiOutlineClose />
        </Flex>
        <Heading cursor="pointer" onClick={() => navigate('/')} color="white">
          SeeSS
        </Heading>
                {Auth.loggedIn() && 
        <Box fontSize="0.85rem" color="#fff" fontWeight="bold" mx="0.25rem">
          <Text>{Auth.getProfile().data.username}</Text>
        </Box>}
        <List>
          {links.map((link, index) => {
            return (
              <ListItem
                onClick={() => handleSetMobile(false)}
                p="0.25rem"
                _hover={{ background: 'teal.900' }}
                my="0.5rem"
                mx="0.25rem"
                color="white"
                key={index}
              >
                <RouterLink to={link.path}>{link.text}</RouterLink>
              </ListItem>
            );
          })}
          {Auth.loggedIn() && (
            <ListItem p="0.25rem" _hover={{ background: 'teal.900' }} my="0.5rem" mx="0.25rem">
              <Button onClick={() => Auth.logout()} p="0" fontWeight="normal" colorScheme="transparent">
                Logout
              </Button>
            </ListItem>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default Mobile;
