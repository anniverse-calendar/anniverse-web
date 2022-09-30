import {
  Link,
  Avatar,
  Box,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';

export const Anniversary: React.FC<{
  anniversary: {
    month: number;
    day: number;
    name: string;
    description: string;
    author: string;
    authorUrl: string;
    isEmpty: boolean;
  };
}> = ({ anniversary }) => {
  const sizes = { text: '2xl', containerW: '350px', dayFontSize: '120px' };
  return (
    <Stack
      w="full"
      padding="2"
      justifyContent="center"
      alignItems="center"
      gap="1"
    >
      <Box maxW={sizes.containerW} w="full">
        <Flex justifyContent="center" w="full">
          <Text color="red.600" fontSize={sizes.text}>
            {anniversary.month}月
          </Text>
        </Flex>
        <Heading
          color="red.600"
          fontSize={sizes.dayFontSize}
          w="full"
          textAlign="center"
        >
          {anniversary.day}
        </Heading>
      </Box>
      <Box maxW={sizes.containerW} w="full">
        <Stack justifyContent="center" alignItems="center">
          <Text color="red.600" fontSize={sizes.text}>
            {anniversary.name}
          </Text>
          <Text color="gray">{anniversary.description}</Text>
        </Stack>
        <Flex justifyContent="center" alignItems="center" gap="2">
          {anniversary.author && (
            <Link
              href={anniversary.authorUrl || '#'}
              target="_blank"
              rel="noreferrer"
              display="inline-flex"
              alignItems="center"
              gap="2"
            >
              <Text>{anniversary.author}</Text>
              <Avatar size="sm" />
            </Link>
          )}
        </Flex>
      </Box>
    </Stack>
  );
};
