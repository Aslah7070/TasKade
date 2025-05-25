
"use client"

import { useAuthStore } from '@/lib/store/useAuthStore';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Image from 'next/image';
interface ProfileMenu {
  handleLogout: () => void
}

export default function Profilemenu({ handleLogout }: ProfileMenu) {
  const { user } = useAuthStore()


  return (
    <Menu as="div" className="relative inline-block text-left cursor-pointer  ">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-full cursor-pointer hover:text-blue-500 border hover:border-blue-500 bg-black text-sm font-semibold shadow-xs ring-1 ring-inset">
          {user ? (
            user.profilePicture ? (
              <Image
                className="rounded-full"
                src={user.profilePicture}
                width={50}
                height={50}
                alt="profile"
              />
            ) : (
              <AccountBoxIcon className='rounded-full' />
            )
          ) : (
            <AccountBoxIcon />
          )}
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-60 origin-top-right divide-y  divide-black rounded-md bg-[#121212] shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1 p-1">
          <span className='text-blue-500 font-tagesschrift-regular '>Account</span>
          <MenuItem>
            <div className=' flex text-[12px] items-center ps-3 py-4'>
              {
                user ? (
                  user.profilePicture?(
                  <Image className='rounded-full' src={user?.profilePicture} width={40} height={40} alt='' />
                  ):<AccountBoxIcon />
                ) : <AccountBoxIcon />
              }
              <div className='text-white ms-2'>

                <p>{user?.username}</p>
                <p>{user?.email}</p>

              </div>
            </div>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-1 text-sm text-white data-focus:bg-gray-300 hover:text-blue-500 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Switch Account
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-1 text-sm text-white hover:text-blue-500 data-focus:bg-gray-300 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Manage Account
            </a>
          </MenuItem>
        </div>
        <div className="py-1 p-1">
          <MenuItem>
            <span className='text-blue-500 font-tagesschrift-regular '>TasKade</span>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-1 text-sm text-white hover:text-blue-500 data-focus:bg-gray-300 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Cards
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-1 text-sm text-white hover:text-blue-500 data-focus:bg-gray-300 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Activity
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-1 text-sm text-white hover:text-blue-500 data-focus:bg-gray-300 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Theme
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-1 text-sm text-white hover:text-blue-500 data-focus:bg-gray-300 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Settings
            </a>
          </MenuItem>
        </div>
        <div className="py-1 ">
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-1 text-sm text-white hover:text-blue-500 data-focus:bg-gray-300 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Help
            </a>
          </MenuItem>
          <MenuItem>
            <a
              onClick={handleLogout}
              className="block px-4 py-1 text-sm text-white hover:text-blue-500 data-focus:bg-gray-300 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Log Out
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  )
}
