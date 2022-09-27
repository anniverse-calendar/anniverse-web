import { LinkIcon } from '@chakra-ui/icons';
import { Button, Flex } from '@chakra-ui/react';
import { useWeb3Context } from '../../../lib/web3Client/useWeb3Context';
import { AnniversaryFormModal } from './AnniversaryForm';
import { useAnniversary } from './useAnniversary';
import { Day } from '../../shared/Day';
import { ShareButtons } from '../../shared/ShareButtons';

export const DayCalendar: React.FC<{
  year: number;
  month: number;
  day: number;
  anniversary: {
    name: string;
    description: string;
    author: string;
    authorUrl: string;
    isEmpty: boolean;
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
        <Flex justifyContent="space-between" w="full">
          {web3Client == null ? (
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
          )}
          <ShareButtons />
        </Flex>
      }
    />
  );
};
