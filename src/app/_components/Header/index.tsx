{
  /* eslint-disable @next/next/no-img-element */
}

import React from 'react'
import Link from 'next/link'
import { PiAxe  } from 'react-icons/pi'

import { Header as HeaderType }  from '../../../payload/payload-types'
import { fetchHeader } from '../../_api/fetchGlobals'

import HeaderComponent from './HeaderComponent'

export async function Header() {
  let header: HeaderType | null = null

  try {
    header = await fetchHeader()
  } catch (error) {
    console.log(error)
  }

  return (
    <>
      <HeaderComponent header={header}/>
    </>
  )
}


  {/* Cannot use the `<picture>` element here with `srcSet`
    This is because the theme is able to be overridden by the user
    And so `@media (prefers-color-scheme: dark)` will not work
    Instead, we just use CSS to invert the color via `filter: invert(1)` based on `[data-theme="dark"]`
  */}