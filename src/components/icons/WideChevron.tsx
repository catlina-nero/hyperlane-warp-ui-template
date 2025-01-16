import { WideChevronIcon as WideChevronInner } from '@hyperlane-xyz/widgets';

import { Color } from '../../styles/Color';

export function WideChevron({ classes }: { classes?: string }) {
  return (
    <WideChevronInner
      width="17"
      height="100%"
      direction="e"
      color={Color.gray}
      //classes={classes}
      rounded={true}
    />
  );
}
