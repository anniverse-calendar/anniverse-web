import { useEffect, useState } from 'react';
import { useWeb3Context } from '../../shared/context/useWeb3Context';

export type Anniversary = {
  name: string;
  description: string;
};

type State = 'initialized' | 'connected' | 'minted';

export function useAnniversary(
  month: number,
  day: number,
  defaultValue?: Anniversary
): {
  value?: Anniversary;
  state: State;
  connect(): Promise<void>;
  mint(): Promise<void>;
  update(data: Anniversary): Promise<void>;
} {
  const [anniversary, setAnniversary] = useState<Anniversary | undefined>(
    defaultValue
  );
  const { isConnected, connect, web3Client } = useWeb3Context();
  const [state, setState] = useState<State>(
    isConnected() ? 'connected' : 'initialized'
  );
  useEffect(() => {
    if (!isConnected()) return;

    const tokenId = tokenIdFromMonthDay(month, day);
    web3Client().then((client) =>
      client.contract.anniversary(tokenId).then(setAnniversary)
    );
  }, [web3Client, month, day, setAnniversary, isConnected]);

  useEffect(() => {
    if (state === 'connected') {
      web3Client().then(async (client) => {
        if (await client.contract.hasMinted(month, day)) {
          setState('minted');
        }
      });
    }
  }, [state, setState, web3Client, month, day]);

  return {
    value: anniversary,
    state,
    async connect() {
      await connect();
      setState(isConnected() ? 'connected' : 'initialized');
    },
    async mint() {
      const client = await web3Client();
      await client.contract.mint(month, day);
    },
    async update(data: Anniversary) {
      const tokenId = tokenIdFromMonthDay(month, day);
      const client = await web3Client();
      if (isConnected()) {
        setState('connected');
        client.contract.setAnniversary(tokenId, data.name, data.description);
      }
    },
  };
}

/**
 * PRIVATE
 */

/**
 *
 * @param month
 * @param day
 * @returns tokenId (mdd)
 */
function tokenIdFromMonthDay(month: number, day: number): number {
  return month * 100 + day;
}
