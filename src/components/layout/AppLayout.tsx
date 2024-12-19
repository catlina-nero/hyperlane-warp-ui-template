import { MultiProtocolWalletModal } from '@hyperlane-xyz/widgets';
import Head from 'next/head';
import { PropsWithChildren } from 'react';
import { APP_NAME } from '../../consts/app';
import { useStore } from '../../features/store';
import { SideBarMenu } from '../../features/wallet/SideBarMenu';
import { Footer } from '../nav/Footer';
import { Header } from '../nav/Header';

export function AppLayout({ children }: PropsWithChildren) {
  const { showEnvSelectModal, setShowEnvSelectModal, isSideBarOpen, setIsSideBarOpen } = useStore(
    (s) => ({
      showEnvSelectModal: s.showEnvSelectModal,
      setShowEnvSelectModal: s.setShowEnvSelectModal,
      isSideBarOpen: s.isSideBarOpen,
      setIsSideBarOpen: s.setIsSideBarOpen,
    }),
  );

  return (
    <>
      <Head>
        {/* https://nextjs.org/docs/messages/no-document-viewport-meta */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{APP_NAME}</title>
      </Head>
      <div
        style={styles.container}
        id="app-content"
        className="min-w-screen relative flex h-full min-h-screen w-full flex-col justify-between"
      >
        <div className="absolute left-[-18%] top-[-10%] hidden md:flex" style={styles.planet}></div>
        <div
          className="absolute bottom-[-30%] right-[-28%] hidden md:flex"
          style={styles.planet}
        ></div>
        <Header />
        <div className="mx-auto flex max-w-screen-xl grow items-center sm:px-4">
          <main className="my-4 flex w-full flex-1 items-center justify-center">{children}</main>
        </div>
        <Footer />
      </div>

      <MultiProtocolWalletModal
        isOpen={showEnvSelectModal}
        close={() => setShowEnvSelectModal(false)}
      />
      <SideBarMenu
        onClose={() => setIsSideBarOpen(false)}
        isOpen={isSideBarOpen}
        onClickConnectWallet={() => setShowEnvSelectModal(true)}
      />
    </>
  );
}

const styles = {
  container: {
    overflow: 'hidden',
  },
  planet: {
    width: `80%`,
    height: `85vh`,
    borderRadius: `1373.014px`,
    background: `radial-gradient(50% 50% at 50% 50%, #C6DFFC 0%, rgba(217, 230, 255, 0.00) 100%)`,
  },
};
