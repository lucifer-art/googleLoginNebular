import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth-guard.service';
import { NbThemeModule,NbSidebarModule, NbLayoutModule, NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme';
import { NbOAuth2AuthStrategy, NbAuthModule, NbOAuth2ResponseType } from '@nebular/auth';
import { NbOAuth2LoginComponent } from './nb-oauth2-login/nb-oauth2-login.component';
import { NbOAuth2CallbackComponent } from './nb-oauth2-callback/nb-oauth2-callback.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';

const formSetting: any = {
  redirectDelay: 0,
  showMessages: {
    success: true,
  },
};

@NgModule({
  declarations: [
    AppComponent,
    NbOAuth2LoginComponent,
    NbOAuth2CallbackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NbThemeModule.forRoot(),
    NbCardModule,
    NbEvaIconsModule,
    NbIconModule,
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    
    HttpClientModule,
    NbAuthModule.forRoot({
      strategies: [
        NbOAuth2AuthStrategy.setup({
          name: 'google',
          clientId: '532438012459-iovnllgbq24hj7cc21lp4mh98dalqcju.apps.googleusercontent.com',
          clientSecret: 'xC-xuJRVAdapUa5tXU37tLfZ',
          authorize: {
            endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
            responseType: NbOAuth2ResponseType.TOKEN,
            scope: 'https://www.googleapis.com/auth/userinfo.profile',
            redirectUri: 'http://localhost:4200/callback',
          },
        }),
      ],
    }), 
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
