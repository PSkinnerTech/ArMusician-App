import { SETUP_NEW_CONTRACT_EVENT_SIGNATURE } from "@/lib/events";
import { CHAIN_ID } from "../consts";
import { DuneDecodedEvent } from "@/types/dune";
import getSmartWallet from "../getSmartWallet";

const getSmartWalletCreatedContractEvents = async (): Promise<
  DuneDecodedEvent[]
> => {
  // If no API key is provided, return empty array
  if (!process.env.DUNE_API_KEY || process.env.DUNE_API_KEY === "your-dune-api-key") {
    console.warn("No valid Dune API key provided. Skipping API call.");
    return [];
  }

  const smartWallet = await getSmartWallet();
  if (!smartWallet) return [];
  const options = {
    method: "GET",
    headers: { "X-Dune-Api-Key": process.env.DUNE_API_KEY as string },
  };
  const params: any = {
    decode: "true",
    chain_ids: `${CHAIN_ID}`,
    topic0: SETUP_NEW_CONTRACT_EVENT_SIGNATURE,
  };

  const urlSearchParams = new URLSearchParams(params);

  try {
    const response = await fetch(
      `https://api.dune.com/api/echo/v1/transactions/evm/${smartWallet.address}?${urlSearchParams}`,
      options,
    );
    if (!response.ok) {
      console.error("Failed to call Dune API:", await response.text());
      return [];
    }

    const data = await response.json();
    const transactions: DuneDecodedEvent[] = data.transactions;
    return transactions;
  } catch (error) {
    console.error("Error calling Dune API:", error);
    return [];
  }
};

export default getSmartWalletCreatedContractEvents;
