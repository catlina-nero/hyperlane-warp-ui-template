import Link from 'next/link';

import { links } from '../../consts/links';
import { Discord } from '../icons/Discord';
import { Telegram } from '../icons/Telegram';
import { Twitter } from '../icons/Twitter';

const footerLinks3 = [
  { title: 'Twitter', url: links.twitter, external: true, icon: <Twitter /> },
  { title: 'Telegram', url: links.telegram, external: true, icon: <Telegram /> },
  { title: 'Discord', url: links.discord, external: true, icon: <Discord /> },
];

export function Footer() {
  return (
    <footer className="relative" style={styles.footer}>
      <div className="relative z-10 px-8 pb-5 pt-2 sm:pt-0">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row sm:gap-10">
          <div className="flex items-center justify-center">
            <div className="ml-6 space-y-1 text-lg sm:text-md">
              <div>© 2024 OORT Foundation. All rights reserved</div>
              <div>Bundesstrasse 3, 6302 Zug, Switzerland</div>
            </div>
          </div>
          <nav className="flex text-md font-medium">
            <ul className={`${styles.linkCol}`}>
              {footerLinks3.map((item) => (
                <li key={item.title}>
                  <Link
                    className={styles.linkItem}
                    target={item.external ? '_blank' : '_self'}
                    href={item.url}
                  >
                    {item?.icon && <div className="mr-4 w-6">{item?.icon}</div>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  linkCol: 'flex gap-5',
  linkItem: 'flex capitalize text-decoration-none hover:underline underline-offset-2',
  footer: {
    paddingBottom: '30px',
  },
};
