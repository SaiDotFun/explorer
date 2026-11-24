export const SAI_MAINNET_CHAIN = 'cataclysm-1';
export const SAI_TX_HASH = /^(?:0x)?[0-9a-f]{64}$/i;
export const SAI_BLOCK_HEIGHT = /^[1-9][0-9]*$/;

export function saiExploreUrl(path: string): string | undefined {
  const parts = path.split('/');
  const [root, chain, kind, value, trailing = ''] = parts;
  if (parts.length > 5 || root || chain !== SAI_MAINNET_CHAIN || !value || trailing) return;

  if ((kind === 'tx' && SAI_TX_HASH.test(value)) || (kind === 'block' && SAI_BLOCK_HEIGHT.test(value))) {
    return `https://sai.fun/explore/${kind}/${value}`;
  }
}
