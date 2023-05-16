export interface IUserInfo {
  avatar: string
  collectionId: string
  collectionName: string
  created: string
  email: string
  emailVisibility: boolean
  id: string
  name: string
  updated: string
  username: string
  verified: boolean
}

export interface ILoginAuth {
  record: IUserInfo
  token: string
}
