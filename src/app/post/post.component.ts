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
      this.form = new FormGroup({
        title: new FormControl(this.post.title, [
          Validators.required
        ]),
        text: new FormControl(this.post.text, [
            Validators.required
          ]
        )
      })
    } else {
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
  }

  submit() {
    // @ts-ignore
    const {title, text} = {...this.form.value}
    if (this.post) {
      const id = this.post.id
      this.postsService.editPost(title, text, id)
    } else {
      this.postsService.addPost(title, text)
    }
    this.router.navigate([''])
  }

  deletePost(id) {
    console.log(id)
    this.postsService.removeById(id)
    this.router.navigate([''])
  }

}
