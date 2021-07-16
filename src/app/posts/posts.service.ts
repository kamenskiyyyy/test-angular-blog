import {Injectable} from '@angular/core'

export interface Post {
  title: string
  text: string
  id: number
}

@Injectable({providedIn: 'root'})
export class PostsService {
  posts: Post[] = []

  getById(id: number) {
    return this.posts.find(p => p.id === id)
  }

  addPost(title: string, text: string) {
    return this.posts.push({title: title, text: text, id: Math.floor(Math.random() * 1000)})
  }

  editPost(title: string, text: string, id: number) {
    return this.posts.forEach(item => {
      if (item.id === id) {
        item.title = title;
        item.text = text;
      }
    })
  }

  removeById(id: number) {
    // @ts-ignore
    return this.posts.splice(this.posts.indexOf(p => p.id === id), 1)
  }
}
