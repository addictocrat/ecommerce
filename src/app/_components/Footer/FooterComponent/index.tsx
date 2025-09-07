'use client'

import React from 'react'
import classes from './index.module.scss'
import { inclusions, noHeaderFooterUrls, profileNavItems } from '../../../constants'
import { usePathname } from 'next/navigation'
import { Gutter } from '../../Gutter'
import Image from 'next/image'
import Link from 'next/link'
import { Footer } from '../../../../payload/payload-types'
import { Button } from '../../Button'


const FooterComponent = ({footer} : {footer: Footer}) => {
  const pathname = usePathname();

  const navItems = footer.navItems || [];
  
  return (
    <footer className={noHeaderFooterUrls.includes(pathname) ? classes.hide : ''}>
      
      <Gutter>
        <ul className={classes.inclusions}>
        {inclusions.map((inclusion, index) => (
          <li key={inclusion.title}>
            <Image 
            src={inclusion.icon}
            alt={inclusion.title}
            width={36}
            height={36}
            className={classes.icon}
            />
            <h5 className={classes.title}>{inclusion.title}</h5>
            <p className={classes.description}>{inclusion.description}</p>
          </li>
          )
        )}
        </ul>
        </Gutter>
    <div className={classes.footer}>
      <Gutter>
        <div className={classes.wrap}>
          <Link href="/home">
          <Image src="/logo-white.svg" alt="logo" width={170} height={50}
           />
          </Link>
          <p>{footer.copyright}</p>
          <div className={classes.socialLinks}>
            {navItems.map((item) => {
              const icon = '';

              return (
                <Button key={item.link.label}
                el="link"
                href={item.link.url}
                newTab={true}
                className={classes.socialLink}
                >

                {item.link.label}
                </Button>
              )
            })}
          </div>
          
          </div>
      </Gutter>
    </div>
    </footer>
  )
}

export default FooterComponent