import {Component, OnInit} from '@angular/core';
import {Post, PostsService} from "../posts.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post: Post | undefined
  form: FormGroup
  postTitle = ''
  postText = ''

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.post = this.postsService.getById(+params.id)
    })

    if (!!this.post) {
      this.postTitle = this.post.title
      this.postText = this.post.text
    }

    this.form = new FormGroup({
      title: new FormControl('', [
        Validators.required
      ]),
      text: new FormControl('', [
          Validators.required
        ]
      )
    })
  }

  // Функция изменяет пост или создает новый
  submit() {
    // @ts-ignore
    if (this.post) {
      const id = this.post.id
      this.postsService.editPost(this.postTitle, this.postText, id)
    } else {
      this.postsService.addPost(this.postTitle, this.postText,)
    }
    this.router.navigate([''])
  }

  // Функция удаляет пост
  deletePost(id) {
    if (confirm('Действительно удалить?')) {
      console.log(id)
      this.postsService.removeById(id)
      this.router.navigate([''])
    }
  }
}
