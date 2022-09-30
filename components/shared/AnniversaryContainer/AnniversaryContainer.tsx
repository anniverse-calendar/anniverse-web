import { FC, ReactNode, useEffect } from 'react';
import { Signer } from 'ethers';
import { Anniversary } from '../../../lib/types/AnniversariesPropType';
import {
  useAnniversary,
  UseAnniversaryResult,
} from '../../applications/DayCalendar/useAnniversary';
import { Spinner } from '@chakra-ui/react';

export const AnniversaryContainer: FC<{
  month: number;
  day: number;
  defaultValues?: Anniversary;
  signer: Signer;
  onUpdate(data: Anniversary): void;
  children(args: UseAnniversaryResult): ReactNode;
}> = ({ month, day, signer, defaultValues, onUpdate, children }) => {
  const result = useAnniversary(month, day, signer, defaultValues);
  const { value, isLoaded } = result;

  useEffect(() => {
    if (value) {
      onUpdate(value);
    }
  }, [value, onUpdate]);

  if (!isLoaded) return <Spinner />;

  return <>{children(result)}</>;
};

/**
 * PRIVATE
 */
