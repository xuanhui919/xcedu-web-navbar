import request from './request'

export function getSiteConfig () {
  return request.get('/sites/current/config').then(({ data }) => data.siteConfig)
}

export function loadCurrentUserInfo () {
  return request.get('/users/current').then(({ data }) => {
    const { user, profile } = data
    return { currentUser: user, profile }
  })
}

export function logout () {
  return request.post('/user/logout')
}
