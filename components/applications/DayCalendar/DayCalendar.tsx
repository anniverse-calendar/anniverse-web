import { LinkIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { useWeb3Context } from '../../../lib/web3Client/useWeb3Context';
import { AnniversaryFormModal } from './AnniversaryForm';
import { useAnniversary } from './useAnniversary';
import { Day } from '../../shared/Day';

export const DayCalendar: React.FC<{
  year: number;
  month: number;
  day: number;
  anniversary: {
    name: string;
    description: string;
    author: string;
    authorUrl: string;
  };
}> = ({ year, month, day, anniversary }) => {
  const { web3Client, connect } = useWeb3Context();
  const { value, update, mint, isMinted, canEdit } = useAnniversary(
    month,
    day,
    anniversary
  );

  return (
    <Day
      year={year}
      month={month}
      day={day}
      anniversary={value}
      footer={
        web3Client == null ? (
          <Button
            onClick={(e) => {
              e.preventDefault();
              connect();
            }}
            leftIcon={<LinkIcon />}
          >
            ログイン
          </Button>
        ) : !isMinted ? (
          <Button
            onClick={(e) => {
              e.preventDefault();
              mint();
            }}
            leftIcon={<LinkIcon />}
          >
            ミント
          </Button>
        ) : (
          <AnniversaryFormModal
            disabled={!canEdit}
            defaultValues={value}
            onSubmit={update}
          />
        )
      }
    />
  );
};
