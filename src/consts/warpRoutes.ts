import { TokenStandard, WarpCoreConfig } from '@hyperlane-xyz/sdk';

// A list of Warp Route token configs
// These configs will be merged with the warp routes in the configured registry
// The input here is typically the output of the Hyperlane CLI warp deploy command
export const warpRouteConfigs: WarpCoreConfig = {
  tokens: [
    {
      chainName: 'ethereum',
      standard: TokenStandard.EvmHypCollateral,
      decimals: 18,
      symbol: 'OORT',
      name: 'OORT',
      addressOrDenom: '0x70f34d5cC2527Cd81de9F6e7C9208f26f7252697',
      collateralAddressOrDenom: '0x5651fA7a726B9Ec0cAd00Ee140179912B6E73599',
      logoURI: '/logo.png',
      connections: [
        {
          token: 'ethereum|oort|0x70f34d5cC2527Cd81de9F6e7C9208f26f7252697',
        },
      ],
    },
    {
      chainName: 'bsc',
      standard: TokenStandard.EvmHypCollateral,
      decimals: 18,
      symbol: 'OORT',
      name: 'OORT',
      addressOrDenom: '0x15366f1a7c71baa6fd1c8FAB56b30faf98d56a3B',
      collateralAddressOrDenom: '0x5651fA7a726B9Ec0cAd00Ee140179912B6E73599',
      logoURI: '/logo.png',
      connections: [
        {
          token: 'ethereum|oort|0x15366f1a7c71baa6fd1c8FAB56b30faf98d56a3B',
        },
      ],
    },
    {
      chainName: 'oort',
      standard: TokenStandard.EvmHypNative,
      decimals: 18,
      symbol: 'OORT',
      name: 'OORT',
      addressOrDenom: '0x15366f1a7c71baa6fd1c8FAB56b30faf98d56a3B',
      logoURI: '/logo.png',
      connections: [
        {
          token: 'ethereum|bsc|0x15366f1a7c71baa6fd1c8FAB56b30faf98d56a3B',
        },
      ],
    },
  ],
  options: {
    // Define your options here if needed
  },
};
