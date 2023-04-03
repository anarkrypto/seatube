import { useContext, useState } from 'react'
import Logo from './logo'
import UploadVideo from './UploadVideo'
import Link from 'next/link'
import Search from 'components/Search'
import Web3Context from 'contexts/Web3Context'
import Identicon from 'components/Identicon'

export default function Navbar() {
  const [uploadModal, setUploadModal] = useState<boolean>(false)
  const { account, connectWallet } = useContext(Web3Context)

  return (
    <nav style={{ height: 56 }} className="fixed inset-0 z-10 w-full">
      <div className="flex items-center space-x-3 w-full h-full px-2 sm:px-6 pl-14 sm:pl-20 py-6 border-b border-gray-200 bg-white">
        <Link href={'/'}>
          <a className="md:cursor-default lg:cursor-pointer">
            <Logo />
          </a>
        </Link>
        <div className="flex flex-grow justify-end md:justify-center">
          <Search />
        </div>
        {account ? (
          <>
            <button
              onClick={() => setUploadModal(true)}
              className="hidden sm:block"
            >
              <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                className="text-gray-400"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M33.0556 10.0528C33.0585 9.67037 32.9544 9.29475 32.7551 8.96835C32.5558 8.64194 32.2693 8.37774 31.9278 8.20557C31.6041 8.03174 31.2378 7.95319 30.8713 7.979C30.5048 8.00481 30.1531 8.13393 29.857 8.3514L25.2778 11.2778V7.77779C25.2778 7.26209 25.0729 6.76751 24.7083 6.40286C24.3436 6.0382 23.849 5.83334 23.3333 5.83334H5.83335C4.80195 5.83334 3.8128 6.24306 3.08349 6.97237C2.35418 7.70168 1.94446 8.69083 1.94446 9.72223V25.2778C1.94446 26.3092 2.35418 27.2983 3.08349 28.0276C3.8128 28.757 4.80195 29.1667 5.83335 29.1667H23.3333C23.849 29.1667 24.3436 28.9618 24.7083 28.5972C25.0729 28.2325 25.2778 27.7379 25.2778 27.2222V23.7222L29.7889 26.6389C30.0907 26.87 30.4517 27.0109 30.8302 27.0453C31.2088 27.0797 31.5893 27.0062 31.9278 26.8333C32.2753 26.6583 32.5659 26.388 32.7655 26.054C32.9652 25.7201 33.0658 25.3362 33.0556 24.9472V10.0528ZM31.0431 25.0542C30.9847 25.0542 30.9361 25.0542 30.8583 24.9958L23.3333 20.1931V27.2222H5.83335C5.31765 27.2222 4.82307 27.0174 4.45842 26.6527C4.09376 26.2881 3.8889 25.7935 3.8889 25.2778V9.72223C3.8889 9.20653 4.09376 8.71196 4.45842 8.3473C4.82307 7.98265 5.31765 7.77779 5.83335 7.77779H23.3333V14.807L30.9167 9.94584C30.935 9.93241 30.9571 9.92517 30.9799 9.92517C31.0026 9.92517 31.0247 9.93241 31.0431 9.94584C31.0643 9.95408 31.0824 9.96891 31.0947 9.98815C31.1069 10.0074 31.1127 10.03 31.1111 10.0528V24.9472C31.1127 24.97 31.1069 24.9926 31.0947 25.0119C31.0824 25.0311 31.0643 25.0459 31.0431 25.0542Z"
                  stroke="#fff"
                />
                <path d="M14 12C14.1658 12 14.3247 12.0658 14.4419 12.1831C14.5592 12.3003 14.625 12.4592 14.625 12.625V16.375H18.375C18.5408 16.375 18.6997 16.4408 18.8169 16.5581C18.9342 16.6753 19 16.8342 19 17C19 17.1658 18.9342 17.3247 18.8169 17.4419C18.6997 17.5592 18.5408 17.625 18.375 17.625H14.625V21.375C14.625 21.5408 14.5592 21.6997 14.4419 21.8169C14.3247 21.9342 14.1658 22 14 22C13.8342 22 13.6753 21.9342 13.5581 21.8169C13.4408 21.6997 13.375 21.5408 13.375 21.375V17.625H9.625C9.45924 17.625 9.30027 17.5592 9.18306 17.4419C9.06585 17.3247 9 17.1658 9 17C9 16.8342 9.06585 16.6753 9.18306 16.5581C9.30027 16.4408 9.45924 16.375 9.625 16.375H13.375V12.625C13.375 12.4592 13.4408 12.3003 13.5581 12.1831C13.6753 12.0658 13.8342 12 14 12Z" />
              </svg>
            </button>
            <div className="w-1 h-8 border-l border-gray-100 hidden md:block mx-4 lg:mx-8"></div>
            <Identicon account={account} />
          </>
        ) : (
          <button
            className="flex items-center sm:py-1 px-2 gap-2 border-l sm:border sm:border-gray-300 sm:rounded-lg"
            onClick={connectWallet}
          >
            <img src="/assets/metamask.svg" className="h-8 w-auto" />
            <span className="text-sm text-gray-600 pr-1 hidden sm:block">Connect Wallet</span>
          </button>
        )}
      </div>
      <UploadVideo open={uploadModal} onClose={() => setUploadModal(false)} />
    </nav>
  )
}
