import '../../typings'

/// Read this before making any changes
///
/// 1). Don't change baseURI or apiURI under any circumstances
/// 2). If you want to pass parameter to the url, Please consider an example below
///
///
/// 1 -> Example
//  const demoUri = "$apiRoot/user/{hello}"
// ....
// ....
// demoUri.substituteParameter({'hello' : "hi"})
///
/// 2 -> Example
//  const demoUri = "$apiRoot/user/search/?name={name}"
// ....
// ....
// demoUri.substituteParameter({'name' : "sushil"})
///

const baseURI = process.env.NEXT_PUBLIC_API_BASE_URL
const nagarikAppBaseURI = process.env.NEXT_PUBLIC_NAGARIK_APP_BASE_URL

const apiRoot = `${baseURI}/api`
const nagarikAppApiRoot = `${nagarikAppBaseURI}`

export const apiNagarikCheckAuthTypeBase = `${nagarikAppApiRoot}/api`
export const apiNagarikCheckAuth = `${apiNagarikCheckAuthTypeBase}/web0auth/check`
export const apiNagarikGetDistricts = `${apiNagarikCheckAuthTypeBase}/registration/districts`

export const apiNagarikWsURI = `${nagarikAppApiRoot}/nagarik-ws`

export const apiGetAllAccountTypeBase = `${apiRoot}/account-types`
export const apiGetAllAccountTypes = `${apiGetAllAccountTypeBase}/all`


export const apiFetchBase = `${apiRoot}/nagarik-app`
export const apiFetchRedirectionCode = `${apiFetchBase}/fetch-redirection-code`
export const apiFetchCitizenshipDetails = `${apiFetchBase}/fetch-citizens-detail`
