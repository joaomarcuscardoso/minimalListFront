export type IUser = {
  id: number 
  email: string
  nickname: string
  image?: string
  background?: string
  token?: string
  imagePath?: string
  imagePathComplete: string
  backgroundPathComplete: string
  createdAt?: Date
  updatedAt?: Date
  reviews?: IReview[]
  achievements?: IAchievements[]
  libraries?: ILibrary[]
}

export type ILibrary = {
  id: number
  episode: number 
  seasonContent: string
  content: IContent
  user?: IUser
  createdAt?: Date
  updatedAt?: Date
}

export type IReview = {
  user: IUser
  id: number;
  title: string
  rate: number
  imageProfile: string
  text: string
  spollier: boolean
  createdAt?: Date
  updatedAt?: Date
}

export type IContent = {
  id: number
  name: string
  season: number
  image: string
  title: string
  description?: string
  reviews?: IReview[]
  category: ICategory
  contentSeason: IContentSeason[]
  categoryName: string
  produce: boolean
  date?: Date
  createdAt?: Date
  updatedAt?: Date
}

export type IContentSeason = {
  id: number
  episode: number 
}

export type ICategory = {
  id: number
  name: string
  Content?: IContent[]
  createdAt?: Date
  updatedAt?: Date
}

export type IAchievements = {
  id?: number
  user: IUser
  name: string
  icon: string
  status: boolean
  createdAt?: Date
  updatedAt?: Date
}

export type IErrorMessage = {
  status: number
  error: string
  login?: IErrorLogin
  register?: IErrorRegister
}

export type IErrorLogin = {
  email?: string
  password?: string
}

export type IErrorRegister = {
  email?: string
  nickname?: string
  password?: string
}
