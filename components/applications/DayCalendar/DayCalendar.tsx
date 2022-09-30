import { LinkIcon } from '@chakra-ui/icons';
import { Button, Flex } from '@chakra-ui/react';
import { AnniversaryFormModal } from './AnniversaryForm';
import { Day } from '../../shared/Day';
import { ShareButtons } from '../../shared/ShareButtons';
import { RequireWallet } from '../../shared/RequireWallet';
import { AnniversaryContainer } from '../../shared/AnniversaryContainer';
import { useState } from 'react';
import { Anniversary } from '../../../lib/types/AnniversariesPropType';

type Props = {
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
};
export const DayCalendar: React.FC<Props> = ({
  year,
  month,
  day,
  anniversary,
}) => {
  const [value, setValue] = useState<Anniversary>(anniversary);

  return (
    <Day
      year={year}
      month={month}
      day={day}
      anniversary={value}
      footer={
        <Flex justifyContent="space-between" w="full">
          <RequireWallet>
            {(signer) => (
              <AnniversaryContainer
                month={month}
                day={day}
                defaultValues={anniversary}
                signer={signer}
                onUpdate={setValue}
              >
                {({ canEdit, isMinted, update, mint }) => {
                  if (!isMinted) {
                    return (
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          mint();
                        }}
                        leftIcon={<LinkIcon />}
                      >
                        ミント
                      </Button>
                    );
                  }
                  return (
                    <AnniversaryFormModal
                      disabled={!canEdit}
                      defaultValues={value}
                      onSubmit={update}
                    />
                  );
                }}
              </AnniversaryContainer>
            )}
          </RequireWallet>
          <ShareButtons />
        </Flex>
      }
    />
  );
};

/**
 * PRIVATE
 */
