import { useState } from 'react';

import { config } from '../../consts/config';
import { Card } from '../layout/Card';

export function TipCard() {
  const [show] = useState(config.showTipBox);
  if (!show) return null;
  return (
    <Card className="w-100 sm:w-[31rem]" style={styles.learnContainer}>
      <div className="flex justify-between" style={styles.tips}>
        <h2 className="text-black sm:text-lg" style={styles.token}>
          Bridge Tokens
        </h2>
      </div>
      <div className="flex items-end justify-between">
        <p className="mt-1 text-xs sm:text-sm max-w-[100%]">
          You can now Bridge your OORT tokens to supported chains back and forth.
        </p>
      </div>
    </Card>
  );
}

const styles = {
  tips: {
    width: '100%',
  },
  learn: {
    textDecorationLine: 'underline',
    color: '#0056D4',
  },
  learnContainer: {
    borderRadius: '24px 24px 0 0',
    padding: '24px',
  },
  token: {
    fontWeight: '600',
    fontSize: '20px',
  },
};
