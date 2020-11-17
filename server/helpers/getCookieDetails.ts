type CookieDetails = {
    jsesssion_ID: string,
    auth_token: string,
    lb_route_ID: string
}


const getCookieDetails = (cookieData: string): CookieDetails => {
    const jsesssion_ID = String(cookieData[0]).split(';')[0].split('=')[1]
    const auth_token = String(cookieData[1]).split(';')[0].split('=')[1]
    const lb_route_ID = String(cookieData[4]).split(';')[0].split('=')[1]

    return { jsesssion_ID, auth_token, lb_route_ID }
}

export default getCookieDetails
