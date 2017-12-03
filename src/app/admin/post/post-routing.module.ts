import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PostComponent} from './post.component';
import {PostListComponent} from './post-list/post-list.component';
import {AdminGuard} from './../../shared/guard/admin.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        canActivate: [AdminGuard],
        component: PostComponent
    },
    {
        path: 'list',
        canActivate: [AdminGuard],
        component: PostListComponent
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostRoutingModule {
}
