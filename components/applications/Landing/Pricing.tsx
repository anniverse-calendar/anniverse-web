import { Flex, Grid, GridItem, Stack, Text } from '@chakra-ui/react';
import { FC } from 'react';

export const Pricing: FC<{
  currentPrice: number;
  originalPrice: number;
  quantity: number;
}> = ({ currentPrice, originalPrice, quantity }) => {
  return (
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
  );
};

/**
 * PRIVATE
 */

const PricingValue: FC<{
  currentPrice: number;
  originalPrice: number;
}> = ({ currentPrice, originalPrice }) => {
  if (currentPrice === 0) {
    return (
      <>
        <Text as="s" color="gray.700">
          {originalPrice}ETH
        </Text>
        <Text color="red.600" fontSize={{ base: '2xl' }}>
          今なら無料
        </Text>
      </>
    );
  }

  if (currentPrice < 1) {
    return (
      <>
        <Text as="s" color="gray.700">
          {originalPrice}ETH
        </Text>
        <Text color="red.600" fontSize={{ base: '2xl' }}>
          {currentPrice}ETH
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
