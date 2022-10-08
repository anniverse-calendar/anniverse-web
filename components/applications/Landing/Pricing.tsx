import { Grid, GridItem, Stack, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { FC } from 'react';

export const Pricing: FC<{
  currentPrice: string;
  originalPrice: string;
  quantity: number;
}> = ({ currentPrice, originalPrice, quantity }) => {
  return (
    <Stack>
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={2}
      >
        <GridItem
          bg="tomato"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize={{ base: 'xl' }}>価格</Text>
        </GridItem>
        <GridItem
          bg="papayawhip"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <PricingValue
            currentPrice={currentPrice}
            originalPrice={originalPrice}
          />
          <Text color="gray.600" fontSize={{ base: 'xs' }} alignSelf="flex-end">
            +GAS Fee
          </Text>
        </GridItem>
        <GridItem
          bg="papayawhip"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize={{ base: 'xl' }}>数量</Text>
        </GridItem>
        <GridItem
          bg="tomato"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize={{ base: 'xl' }}>
            {quantity < 365 ? `残り ${365 - quantity}` : 'Sold Out'} / 365
          </Text>
        </GridItem>
      </Grid>
      <Text alignSelf="flex-end" fontSize="xs" color="gray.500">
        ※一部日付を除く
      </Text>
    </Stack>
  );
};

/**
 * PRIVATE
 */

const PricingValue: FC<{
  currentPrice: string;
  originalPrice: string;
}> = ({ currentPrice, originalPrice }) => {
  const price = ethers.utils.parseEther(currentPrice);
  if (price.isZero()) {
    return (
      <>
        <Text as="s" color="gray.700">
          {originalPrice}ETH
        </Text>
        <Text color="red.600" fontSize={{ base: '2xl' }}>
          今なら無料
        </Text>
        <Text fontSize="xs" color="gray.500">
          ※
        </Text>
      </>
    );
  }

  if (price.lt(ethers.utils.parseEther('1.0'))) {
    return (
      <>
        <Text as="s" color="gray.700">
          {originalPrice}ETH
        </Text>
        <Text color="red.600" fontSize={{ base: '2xl' }}>
          {currentPrice}ETH
        </Text>
        <Text fontSize="xs" color="gray.500">
          ※
        </Text>
      </>
    );
  }
  return (
    <>
      <Text color="red.600" fontSize={{ base: '2xl' }}>
        {originalPrice}ETH
      </Text>
    </>
  );
};
