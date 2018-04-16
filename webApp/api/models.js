import uuid from 'uuid/v1'

export class User {
  constructor (username, password, designType, about) {
    this.username = username
    this.password = password
    this.designType = designType
    this.about = about
    this.title = 'Blog name'
    this.logoUrl = undefined
    this.posts = {}
  }
  getProfile () {
    return {
      username: this.username,
      designType: this.designType,
      about: this.about,
      logoUrl: this.logoUrl,
      title: this.title
    }
  }
  update (data) {
    this.designType = data.designType
    this.about = data.about
    this.logoUrl = data.logoUrl
    this.title = data.title
  }
}

export class Post {
  constructor (title, content) {
    this.title = title
    this.id = uuid()
    this.content = content
    this.imgUrl = undefined
    this.date = new Date()
  }
  getPost () {
    return {
      title: this.title,
      id: this.id,
      content: this.content,
      imgUrl: this.imgUrl,
      date: this.date
    }
  }
  update (data) {
    this.title = data.title
    this.content = data.content
    this.imgUrl = data.imgUrl
  }
}
