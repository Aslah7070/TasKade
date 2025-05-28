


'use client'
import Link from 'next/link'
import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
// import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { Button } from '../ui/buttons';
import LoginIcon from '@mui/icons-material/Login';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Profilemenu from '../user/common/Profilemenu';

// import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useLoadingBar } from 'react-top-loading-bar';
import { ModeToggle } from '../user/common/ThemeDropdowm';
// import { SidebarTrigger } from '../ui/sidebar';
const NavBar = () => {
  const { user,logoutUser} = useAuthStore()
  console.log("user",user);
  
const {start,complete}=useLoadingBar()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

    const handleLogout = async () => {
    start()
    const logout = await logoutUser()
    if (logout?.success) {

      router.push("/")
      complete()


    } else {
      complete()
    }
  }


  return (
    <nav className="dark:bg-[#121212] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-1 flex items-center justify-between ">
        {
          user&&""
        }

        <Link href="/" className="  font-bold   animate__animated animate__flipInX ">
          {/* <TextHoverEffect   text="Taskade" /> */}
           <h1 className="text-5xl  sm:text-5xl font-bold text-white">
              Tas
              <span className="relative inline-block">
                <span
                  className="absolute inset-0"
                  style={{
                    WebkitTextStroke: "2px white",
                    color: "transparent",
                  }}
                >
                  Kade
                </span>
                <span className="relative z-10 text-transparent bg-clip-text transition-all duration-300 ease-in-out bg-violet-700 hover:bg-violet-700">
                  Kade
                </span>
              </span>
            </h1>
        </Link>

        <ul className="hidden md:flex gap-6  font-medium">
          <li><Link className='hover:text-violet-700 ' href="/">Home</Link></li>
          <li><Link className='hover:text-violet-700 ' href="/tracker">Tracker</Link></li>
          {!user?<li><Link className='hover:text-violet-700 ' href="/login">Community</Link></li>:<li><Link className='hover:text-violet-700 ' href="/community">Community</Link></li>}
          <li><Link className='hover:text-violet-700 ' href="/about">About</Link></li>
          {user&&  <li><Link className='hover:text-violet-700 ' href=""> <ModeToggle  /></Link></li>}
        
                  
        </ul>
        {
          !user ? (
            <div className="hidden md:flex gap-4">
              <Button
                onClick={() => router.push("/login")}
                variant="secondary"
                className='text-violet-700'

              >
                Login
              </Button>
              <Button
                onClick={() => router.push("/signup")}
                variant="outline"
             className='text-violet-700'
              >
                Sign Up
              </Button>

            </div>
          ) : (
            <div className='hidden md:block'>
             
        <Profilemenu handleLogout={handleLogout}  />

            </div>
          )
        }
        <div className="md:hidden">
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <MenuIcon sx={{ width: 32, height: 32, color: "white" }} />
              </IconButton>
            </Tooltip>
          </Box>

          {
            user ? (
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleClose}>
                  <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add another account
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            ) : (
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >

                <Divider />

                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={() => router.push("/login")}>
                  <ListItemIcon>
                    <LoginIcon fontSize="small" />
                  </ListItemIcon>
                  Log In
                </MenuItem>
                <MenuItem onClick={() => router.push("/signup")} >
                  <ListItemIcon>
                    <LockOpenIcon fontSize="small" />
                  </ListItemIcon>
                  Sing Up
                </MenuItem>
              </Menu>
            )
          }
        </div>

      </div>
    </nav>
  )
}

export default NavBar
