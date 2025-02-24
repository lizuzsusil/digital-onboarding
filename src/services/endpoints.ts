// import '../../typings'

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

const apiRoot = `${baseURI}/api/v2`

export const apiGetAllAccountTypeBase = `${apiRoot}/list_movies.json`
export const apiGetAllAccountTypes = `${apiGetAllAccountTypeBase}/{test}`