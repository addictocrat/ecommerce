'use client'

import React, { Fragment } from 'react'
import Link from 'next/link'

import { Page, Settings } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { HR } from '../../../_components/HR'
import { LoadingShimmer } from '../../../_components/LoadingShimmer'
import { Media } from '../../../_components/Media'
import { Price } from '../../../_components/Price'
import { RemoveFromCartButton } from '../../../_components/RemoveFromCartButton'
import { useAuth } from '../../../_providers/Auth'
import { useCart } from '../../../_providers/Cart'

import classes from './index.module.scss'

export const CartPage: React.FC<{
  settings: Settings
  page: Page
}> = props => {
  const { settings } = props
  const { productsPage } = settings || {}

  const { user } = useAuth()

  const { cart, cartIsEmpty, addItemToCart, cartTotal, hasInitializedCart } = useCart()

  return (
    <Fragment>
      <br />
      {!hasInitializedCart ? (
        <div className={classes.loading}>
          <LoadingShimmer />
        </div>
      ) : (
        <Fragment>
          {cartIsEmpty ? (
            <div className={classes.empty}>
              Sepetinize hiç ürün yok.
              {typeof productsPage === 'object' && productsPage?.slug && (
                <Fragment>
                    {` Ürünlerimize göz atmak için `}
                  <Link href={`/${productsPage.slug}`}>buraya tıklayın.</Link>
                
                </Fragment>
              )}
              {!user && (
                <Fragment>
                  
                  {`Sepetinizi görüntülemek için `}
                  <Link href={`/login?redirect=%2Fcart`}>giriş yapın.</Link>
                
                </Fragment>
              )}
            </div>
          ) : (
            <div className={classes.items}>
              <div className={classes.itemsTotal}>
                {`Sepetinizde ${cart?.items?.length} ürün var.`}
                {!user && (
                  <Fragment>
                     {`Sepet durumunuzu görmek için `}
                    <Link href={`/login?redirect=%2Fcart`}>giriş yapın.</Link>
                   
                  </Fragment>
                )}
              </div>
              {cart?.items?.map((item, index) => {
                if (typeof item.product === 'object') {
                  const {
                    quantity,
                    product,
                    product: { id, title, meta, stripeProductID },
                  } = item

                  const isLast = index === (cart?.items?.length || 0) - 1

                  const metaImage = meta?.image

                  return (
                    <Fragment key={index}>
                      <div className={classes.row}>
                        <Link href={`/products/${product.slug}`} className={classes.mediaWrapper}>
                          {!metaImage && <span className={classes.placeholder}>No image</span>}
                          {metaImage && typeof metaImage !== 'string' && (
                            <Media
                              className={classes.media}
                              imgClassName={classes.image}
                              resource={metaImage}
                              fill
                            />
                          )}
                        </Link>
                        <div className={classes.rowContent}>
                          {!stripeProductID && (
                            <p className={classes.warning}>
                              {
                                'Ürün henüz Stripe veritabanında yüklü değil. Yüklemek için, '
                              }
                              <Link
                                href={`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/products/${id}`}
                              >
                                ürünü panelden düzenleyebilirsiniz.
                              </Link>
                              {'.'}
                            </p>
                          )}
                          <h5 className={classes.title}>
                            <Link href={`/products/${product.slug}`} className={classes.titleLink}>
                              {title}
                            </Link>
                          </h5>
                          <div className={classes.actions}>
                            <label>
                              Adet &nbsp;
                              <input
                                type="number"
                                className={classes.quantity}
                                // fallback to empty string to avoid uncontrolled input error
                                // this allows the user to user their backspace key to clear the input
                                value={typeof quantity === 'number' ? quantity : ''}
                                onChange={e => {
                                  addItemToCart({
                                    product,
                                    quantity: Number(e.target.value),
                                  })
                                }}
                              />
                            </label>
                            <RemoveFromCartButton product={product} />
                          </div>
                          <Price product={product} button={false} quantity={quantity} />
                        </div>
                      </div>
                      {!isLast && <HR />}
                    </Fragment>
                  )
                }
                return null
              })}
              <HR />
              <h5 className={classes.cartTotal}>{`Toplam: ${cartTotal.formatted}`}</h5>
              <Button
                className={classes.checkoutButton}
                href={user ? '/checkout' : '/login?redirect=%2Fcheckout'}
                label={user ? 'Ödemeye Geç' : 'Ödemek için giriş yapın'}
                appearance="primary"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}
