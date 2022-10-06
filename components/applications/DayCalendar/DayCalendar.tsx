import { LinkIcon } from '@chakra-ui/icons';
import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import { AnniversaryFormModal } from './AnniversaryForm';
import { Day } from '../../shared/Day';
import { ShareButtons } from '../../shared/ShareButtons';
import { RequireWallet } from '../../shared/RequireWallet';
import { AnniversaryContainer } from '../../shared/AnniversaryContainer';
import { useState } from 'react';
import { Anniversary } from '../../../lib/types/AnniversariesPropType';
import Link from 'next/link';
import { OpenSeaLink } from '../../shared/OpenSeaLink';

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
        <Stack alignItems="stretch" w="full">
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
                          記念日を購入（ミント）
                        </Button>
                      );
                    }
                    if (!canEdit) {
                      const tokenId = month * 100 + day;
                      return (
                        <OpenSeaLink
                          path={`/assets/${process.env.NEXT_PUBLIC_ANNIVERSARY_TOKEN_ADDRESS}/${tokenId}`}
                          text="OpenSeaでこの祝日を確認"
                        />
                      );
                    }
                    return (
                      <AnniversaryFormModal
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
          <Link href="/#help">
            <a style={{ color: 'gray' }}>よくある質問/使い方 をみる</a>
          </Link>
        </Stack>
      }
    />
  );
};

/**
 * PRIVATE
 */
