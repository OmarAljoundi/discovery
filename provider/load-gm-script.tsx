/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import Script from 'next/script'
import React from 'react'

export default function LoadGMScript() {
  return (
    <React.Fragment>
      <Script strategy="beforeInteractive" id="gtm-script">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5C7C7MQL');`}
      </Script>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-5C7C7MQL"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </React.Fragment>
  )
}
