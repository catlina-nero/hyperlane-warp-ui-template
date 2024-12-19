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
          token: 'ethereum|oort|0x15366f1a7c71baa6fd1c8FAB56b30faf98d56a3B',
        },
        {
          token: 'ethereum|bsc|0x15366f1a7c71baa6fd1c8FAB56b30faf98d56a3B',
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
        {
          token: 'ethereum|ethereum|0x70f34d5cC2527Cd81de9F6e7C9208f26f7252697',
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
        {
          token: 'ethereum|ethereum|0x70f34d5cC2527Cd81de9F6e7C9208f26f7252697',
        },
      ],
    },
    {
      chainName: 'ethereum',
      standard: TokenStandard.EvmHypCollateral,
      decimals: 6,
      symbol: 'USDC',
      name: 'USD Coin',
      addressOrDenom: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      collateralAddressOrDenom: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      logoURI: '/usdc.svg',
      connections: [
        {
          token: 'ethereum|oort|0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
        },
        {
          token: 'ethereum|bsc|0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
        },
      ],
    },
    {
      chainName: 'bsc',
      standard: TokenStandard.EvmHypCollateral,
      decimals: 18,
      symbol: 'USDC',
      name: 'USD Coin',
      addressOrDenom: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
      collateralAddressOrDenom: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
      logoURI: '/usdc.svg',
      connections: [
        {
          token: 'ethereum|oort|0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
        },
        {
          token: 'ethereum|ethereum|0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        },
      ],
    },
    {
      chainName: 'oort',
      standard: TokenStandard.EvmHypNative,
      decimals: 18,
      symbol: 'USDC',
      name: 'USD Coin',
      addressOrDenom: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
      logoURI: '/usdc.svg',
      connections: [
        {
          token: 'ethereum|bsc|0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
        },
        {
          token: 'ethereum|ethereum|0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        },
      ],
    },
  ],
  options: {},
};
