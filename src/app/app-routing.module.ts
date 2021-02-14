import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { NbOAuth2CallbackComponent } from './nb-oauth2-callback/nb-oauth2-callback.component';
import { NbOAuth2LoginComponent } from './nb-oauth2-login/nb-oauth2-login.component';

const routes: Routes = [
  {
    path: '',
    component: NbOAuth2LoginComponent,
  },
  {
    path: 'callback',
    canActivate: [AuthGuard],
    component: NbOAuth2CallbackComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
