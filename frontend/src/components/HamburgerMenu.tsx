import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Settings, LogOut } from 'lucide-react'
import { Button } from "../components/ui/Button.tsx"

interface HamburgerMenuProps {
  userName: string
  userEmail: string
  profilePhotoUrl: string
}

export default function HamburgerMenu({ userName, userEmail, profilePhotoUrl }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const menuItems = [
    { name: 'Mission', href: '/mission' },
    { name: 'Habitude', href: '/habitude' },
    { name: 'Logs', href: '/logs' },
  ]

  return (
    <>
      {/* Hamburger Icon (Menu or Cross) */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50"
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 w-1/5 bg-white shadow-lg z-40 overflow-y-auto"
          >
            <div className="relative p-6 space-y-6 flex flex-col justify-between h-full">

              {/* Profile Section */}
              <div>
                <div className="flex items-center space-x-4 my-10">
                  <div className="relative">
                    <img
                      src={profilePhotoUrl}
                      alt={`${userName}'s profile`}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-800">{userName}</h2>
                    <p className="text-sm text-gray-600">{userEmail}</p>
                  </div>
                </div>

                {/* Menu Items */}
                <nav className="mt-6">
  <ul className="space-y-4">
    {menuItems.map((item) => (
      <motion.li
        key={item.name}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
      >
        <a
          href={item.href}
          className="block py-3 px-6 text-lg font-semibold text-gray-800 bg-beige-200 rounded-lg shadow-lg hover:bg-beige-300 transition-all duration-300 ease-in-out"
        >
          {item.name}
        </a>
      </motion.li>
    ))}
  </ul>
</nav>


              </div>

              {/* Settings and Logout Section */}
              <div className="pt-6 border-t border-gray-200">
                <a
                  href="/settings"
                  className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-100 rounded transition duration-150 ease-in-out"
                >
                  <Settings className="h-5 w-5 mr-3" />
                  Settings
                </a>
                <button
                  onClick={() => { /* Add logout logic here */ }}
                  className="flex items-center w-full py-2 px-4 text-gray-700 hover:bg-gray-100 rounded transition duration-150 ease-in-out"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}
    </>
  )
}
