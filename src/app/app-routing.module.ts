import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {PostComponent} from './post/post.component'
import {PostsComponent} from "./posts/posts.component";

const routes: Routes = [
  {path: '', component: PostsComponent},
  {path: 'posts/:id', component: PostComponent},
  {path: 'posts/create', component: PostComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
