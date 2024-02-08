
import '~bootstrap/dist/css/bootstrap.min.css'

function addStyle(url) {
    var header = document.querySelector('head')
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = url
    header.appendChild(link)
}

addStyle('/redcap/redcap_v999.0.0/Resources/webpack/css/fontawesome/css/all.min.css?1704744621')

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import init from './lib'


init('#app')
