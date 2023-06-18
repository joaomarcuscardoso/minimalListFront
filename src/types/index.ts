export type IUser = {
  id: number 
  email: string
  nickname: string
  image?: string
  background?: string
  token?: string
  imagePath?: string
  imagePathComplete?: string
  backgroundPathComplete?: string
  createdAt?: Date
  updatedAt?: Date
  reviews?: IReview[]
  achievements?: IAchievements[]
}

export type IReview = {
  id: number;
  title: string
  rate: number
  text: string
  spollier: boolean
  createdAt?: Date
  updatedAt?: Date
}

export type IAchievements = {
  id?: number
}

export type IErrorMessage = {
  status: number
  error: string
  login?: IErrorLogin
}

export type IErrorLogin = {
  email: string
  password: string
}
