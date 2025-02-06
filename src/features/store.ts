import { GithubRegistry, IRegistry } from '@hyperlane-xyz/registry';
import { ChainMap, ChainMetadata, MultiProtocolProvider, WarpCore } from '@hyperlane-xyz/sdk';
import { objFilter } from '@hyperlane-xyz/utils';
import { toast } from 'react-toastify';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { config } from '../consts/config';
import { logger } from '../utils/logger';
import { assembleWarpCoreConfig } from './tokens/warpCoreConfig';
import { FinalTransferStatuses, TransferContext, TransferStatus } from './transfer/types';

// Increment this when persist state has breaking changes
const PERSIST_STATE_VERSION = 2;

// Keeping everything here for now as state is simple
// Will refactor into slices as necessary
export interface AppState {
  // Chains and providers
  chainMetadata: ChainMap<ChainMetadata>;
  chainMetadataOverrides: ChainMap<Partial<ChainMetadata>>;
  setChainMetadataOverrides: (overrides?: ChainMap<Partial<ChainMetadata> | undefined>) => void;
  multiProvider: MultiProtocolProvider;
  registry: IRegistry;
  warpCore: WarpCore;
  setWarpContext: (context: {
    registry: IRegistry;
    chainMetadata: ChainMap<ChainMetadata>;
    multiProvider: MultiProtocolProvider;
    warpCore: WarpCore;
  }) => void;

  // User history
  transfers: TransferContext[];
  addTransfer: (t: TransferContext) => void;
  resetTransfers: () => void;
  updateTransferStatus: (
    i: number,
    s: TransferStatus,
    options?: { msgId?: string; originTxHash?: string },
  ) => void;
  failUnconfirmedTransfers: () => void;

  // Shared component state
  transferLoading: boolean;
  setTransferLoading: (isLoading: boolean) => void;
  isSideBarOpen: boolean;
  setIsSideBarOpen: (isOpen: boolean) => void;
  showEnvSelectModal: boolean;
  setShowEnvSelectModal: (show: boolean) => void;
}

export const useStore = create<AppState>()(
  persist(
    // Store reducers
    (set, get) => ({
      // Chains and providers
      chainMetadata: {},
      chainMetadataOverrides: {},
      setChainMetadataOverrides: async (
        overrides: ChainMap<Partial<ChainMetadata> | undefined> = {},
      ) => {
        logger.debug('Setting chain overrides in store');
        const { multiProvider } = await initWarpContext(get().registry, overrides);
        const filtered = objFilter(overrides, (_, metadata) => !!metadata);
        set({ chainMetadataOverrides: filtered, multiProvider });
      },
      multiProvider: new MultiProtocolProvider({}),
      registry: new GithubRegistry({
        uri: config.registryUrl,
        branch: config.registryBranch,
        proxyUrl: config.registryProxyUrl,
      }),
      warpCore: new WarpCore(new MultiProtocolProvider({}), []),
      setWarpContext: ({ registry, chainMetadata, multiProvider, warpCore }) => {
        logger.debug('Setting warp context in store');
        set({ registry, chainMetadata, multiProvider, warpCore });
      },

      // User history
      transfers: [],
      addTransfer: (t) => {
        set((state) => ({ transfers: [...state.transfers, t] }));
      },
      resetTransfers: () => {
        set(() => ({ transfers: [] }));
      },
      updateTransferStatus: (i, s, options) => {
        set((state) => {
          if (i >= state.transfers.length) return state;
          const txs = [...state.transfers];
          txs[i].status = s;
          txs[i].msgId ||= options?.msgId;
          txs[i].originTxHash ||= options?.originTxHash;
          return {
            transfers: txs,
          };
        });
      },
      failUnconfirmedTransfers: () => {
        set((state) => ({
          transfers: state.transfers.map((t) =>
            FinalTransferStatuses.includes(t.status) ? t : { ...t, status: TransferStatus.Failed },
          ),
        }));
      },

      // Shared component state
      transferLoading: false,
      setTransferLoading: (isLoading) => {
        set(() => ({ transferLoading: isLoading }));
      },
      isSideBarOpen: false,
      setIsSideBarOpen: (isSideBarOpen) => {
        set(() => ({ isSideBarOpen }));
      },
      showEnvSelectModal: false,
      setShowEnvSelectModal: (showEnvSelectModal) => {
        set(() => ({ showEnvSelectModal }));
      },
    }),

    // Store config
    {
      name: 'app-state', // name in storage
      partialize: (state) => ({
        // fields to persist
        chainMetadataOverrides: state.chainMetadataOverrides,
        transfers: state.transfers,
      }),
      version: PERSIST_STATE_VERSION,
      onRehydrateStorage: () => {
        logger.debug('Rehydrating state');
        return (state, error) => {
          state?.failUnconfirmedTransfers();
          if (error || !state) {
            logger.error('Error during hydration', error);
            return;
          }
          initWarpContext(state.registry, state.chainMetadataOverrides).then(
            ({ registry, chainMetadata, multiProvider, warpCore }) => {
              state.setWarpContext({ registry, chainMetadata, multiProvider, warpCore });
              logger.debug('Rehydration complete');
            },
          );
        };
      },
    },
  ),
);

async function initWarpContext(
  registry: IRegistry,
  storeMetadataOverrides: ChainMap<Partial<ChainMetadata> | undefined>,
) {
  try {
    const coreConfig = await assembleWarpCoreConfig();
    // const chainsInTokens = Array.from(new Set(coreConfig.tokens.map((t) => t.chainName)));
    // Pre-load registry content to avoid repeated requests
    // await registry.listRegistryContent();
    // const { chainMetadata, chainMetadataWithOverrides } = await assembleChainMetadata(
    //   chainsInTokens,
    //   registry,
    //   storeMetadataOverrides,
    // );
    const chainMetadata: any = {
      bsc: {
        blockExplorers: [
          {
            name: 'BscScan',
            url: 'https://bscscan.com',
            apiUrl: 'https://api.bscscan.com/api',
            family: 'etherscan',
          },
          {
            apiUrl: 'https://api.bscscan.com/api',
            family: 'etherscan',
            name: 'BscScan',
            url: 'https://bscscan.com',
          },
        ],
        blocks: {
          confirmations: 1,
          estimateBlockTime: 3,
          reorgPeriod: 'finalized',
        },
        chainId: 56,
        deployer: {
          name: 'Abacus Works',
          url: 'https://www.hyperlane.xyz',
        },
        displayName: 'Binance',
        displayNameShort: 'Binance',
        domainId: 56,
        gasCurrencyCoinGeckoId: 'binancecoin',
        gnosisSafeTransactionServiceUrl: 'https://safe-transaction-bsc.safe.global/',
        name: 'bsc',
        nativeToken: {
          decimals: 18,
          name: 'BNB',
          symbol: 'BNB',
        },
        protocol: 'ethereum',
        rpcUrls: [
          {
            http: 'https://rpc.ankr.com/bsc',
          },
          {
            http: 'https://bsc.drpc.org',
          },
          {
            http: 'https://bscrpc.com',
          },
          {
            http: 'https://rpc.ankr.com/bsc',
          },
          {
            http: 'https://bsc.drpc.org',
          },
          {
            http: 'https://bscrpc.com',
          },
        ],
        technicalStack: 'other',
        logoURI: '/logos/bsc.svg',
        isTestnet: false,
      },
      ethereum: {
        blockExplorers: [
          {
            name: 'EtherScan',
            url: 'https://etherscan.com',
            apiUrl: 'https://api.etherscan.com/api',
            family: 'etherscan',
          },
          {
            apiUrl: 'https://api.etherscan.io/api',
            family: 'etherscan',
            name: 'Etherscan',
            url: 'https://etherscan.io',
          },
          {
            apiUrl: 'https://eth.blockscout.com/api',
            family: 'blockscout',
            name: 'Blockscout',
            url: 'https://blockscout.com/eth/mainnet',
          },
        ],
        blocks: {
          confirmations: 2,
          estimateBlockTime: 13,
          reorgPeriod: 15,
        },
        chainId: 1,
        deployer: {
          name: 'Abacus Works',
          url: 'https://www.hyperlane.xyz',
        },
        displayName: 'Ethereum',
        domainId: 1,
        gasCurrencyCoinGeckoId: 'ethereum',
        gnosisSafeTransactionServiceUrl: 'https://safe-transaction-mainnet.safe.global/',
        name: 'ethereum',
        nativeToken: {
          decimals: 18,
          name: 'ETH',
          symbol: 'ETH',
        },
        protocol: 'ethereum',
        rpcUrls: [
          {
            http: 'https://mainnet.gateway.tenderly.co',
          },
          {
            http: 'https://eth.llamarpc.com',
          },
          {
            http: 'https://ethereum.publicnode.com',
          },
          {
            http: 'https://cloudflare-eth.com',
          },
        ],
        technicalStack: 'other',
        logoURI: '/logos/weth.png',
        isTestnet: false,
      },
      oort: {
        chainId: 970,
        displayName: 'OORT',
        domainId: 970,
        isTestnet: false,
        logoURI: '/logo.png',
        name: 'oort',
        nativeToken: {
          name: 'OORT',
          symbol: 'OORT',
          decimals: 18,
        },
        protocol: 'ethereum',
        rpcUrls: [
          {
            http: 'https://mainnet-rpc.oortech.com',
          },
        ],
      },
    };
    const chainMetadataWithOverrides = {
      bsc: {
        blockExplorers: [
          {
            name: 'BscScan',
            url: 'https://bscscan.com',
            apiUrl: 'https://api.bscscan.com/api',
            family: 'etherscan',
          },
          {
            apiUrl: 'https://api.bscscan.com/api',
            family: 'etherscan',
            name: 'BscScan',
            url: 'https://bscscan.com',
          },
        ],
        blocks: {
          confirmations: 1,
          estimateBlockTime: 3,
          reorgPeriod: 'finalized',
        },
        chainId: 56,
        deployer: {
          name: 'Abacus Works',
          url: 'https://www.hyperlane.xyz',
        },
        displayName: 'Binance',
        displayNameShort: 'Binance',
        domainId: 56,
        gasCurrencyCoinGeckoId: 'binancecoin',
        gnosisSafeTransactionServiceUrl: 'https://safe-transaction-bsc.safe.global/',
        name: 'bsc',
        nativeToken: {
          decimals: 18,
          name: 'BNB',
          symbol: 'BNB',
        },
        protocol: 'ethereum',
        rpcUrls: [
          {
            http: 'https://rpc.ankr.com/bsc',
          },
          {
            http: 'https://bsc.drpc.org',
          },
          {
            http: 'https://bscrpc.com',
          },
          {
            http: 'https://rpc.ankr.com/bsc',
          },
          {
            http: 'https://bsc.drpc.org',
          },
          {
            http: 'https://bscrpc.com',
          },
        ],
        technicalStack: 'other',
        logoURI: '/logos/bsc.svg',
        isTestnet: false,
      },
      ethereum: {
        blockExplorers: [
          {
            name: 'EtherScan',
            url: 'https://etherscan.com',
            apiUrl: 'https://api.etherscan.com/api',
            family: 'etherscan',
          },
          {
            apiUrl: 'https://api.etherscan.io/api',
            family: 'etherscan',
            name: 'Etherscan',
            url: 'https://etherscan.io',
          },
          {
            apiUrl: 'https://eth.blockscout.com/api',
            family: 'blockscout',
            name: 'Blockscout',
            url: 'https://blockscout.com/eth/mainnet',
          },
        ],
        blocks: {
          confirmations: 2,
          estimateBlockTime: 13,
          reorgPeriod: 15,
        },
        chainId: 1,
        deployer: {
          name: 'Abacus Works',
          url: 'https://www.hyperlane.xyz',
        },
        displayName: 'Ethereum',
        domainId: 1,
        gasCurrencyCoinGeckoId: 'ethereum',
        gnosisSafeTransactionServiceUrl: 'https://safe-transaction-mainnet.safe.global/',
        name: 'ethereum',
        nativeToken: {
          decimals: 18,
          name: 'ETH',
          symbol: 'ETH',
        },
        protocol: 'ethereum',
        rpcUrls: [
          {
            http: 'https://mainnet.gateway.tenderly.co',
          },
          {
            http: 'https://eth.llamarpc.com',
          },
          {
            http: 'https://ethereum.publicnode.com',
          },
          {
            http: 'https://cloudflare-eth.com',
          },
        ],
        technicalStack: 'other',
        logoURI: '/logos/weth.png',
        isTestnet: false,
      },
      oort: {
        chainId: 970,
        displayName: 'OORT',
        domainId: 970,
        isTestnet: false,
        logoURI: '/logo.png',
        name: 'oort',
        nativeToken: {
          name: 'OORT',
          symbol: 'OORT',
          decimals: 18,
        },
        protocol: 'ethereum',
        rpcUrls: [
          {
            http: 'https://mainnet-rpc.oortech.com',
          },
        ],
      },
    };
    const multiProvider = new MultiProtocolProvider(chainMetadataWithOverrides as any);
    const warpCore = WarpCore.FromConfig(multiProvider, coreConfig);
    return { registry, chainMetadata, multiProvider, warpCore };
  } catch (error) {
    toast.error('Error initializing warp context. Please check connection status and configs.');
    logger.error('Error initializing warp context', error);
    return {
      registry,
      chainMetadata: {},
      multiProvider: new MultiProtocolProvider({}),
      warpCore: new WarpCore(new MultiProtocolProvider({}), []),
    };
  }
}
