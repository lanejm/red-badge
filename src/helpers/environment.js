let APIURL = ''

switch (window.location.hostname) {
    case 'localhost':
    case '127.0.0.1':
        APIURL = 'http://localhost:8081'
        break
    case 'gifttag.herokuapp.com':
        APIURL = 'https://gifttag.herokuapp.com'
}

export default APIURL