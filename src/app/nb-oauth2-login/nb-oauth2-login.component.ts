import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbAuthResult, NbAuthService, NbAuthOAuth2Token } from '@nebular/auth';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'nb-oauth2-login',
  templateUrl: './nb-oauth2-login.component.html',
  styleUrls: ['./nb-oauth2-login.component.scss']
})
export class NbOAuth2LoginComponent implements OnDestroy {
  token: NbAuthOAuth2Token;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  userURL: any;
  userData: any;

  constructor(private authService: NbAuthService, private http: HttpClient) {
    this.authService.onTokenChange()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((token: NbAuthOAuth2Token) => {
        this.token = null;
        if (token && token.isValid()) {
          this.token = token;
          this.userURL=`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${this.token.getPayload().access_token}`;
          this.http.get<any>(this.userURL).subscribe(response => {
            this.userData = response;
           });
          // var xhttp = new XMLHttpRequest();
          // xhttp.onreadystatechange = function () {
          //   if (this.readyState == 4 && this.status == 200) {
          //     console.log("authResult",this.responseText);
          //   }
          // };
          // xhttp.open("GET", this.userData, true);
          // xhttp.send();
        }
      });
  }

  login() {
    this.authService.authenticate('google')
      .pipe(takeUntil(this.destroyed$))
      .subscribe((authResult: NbAuthResult) => {
        console.log("authResult", authResult);
      });
  }

  logout() {
    this.authService.logout('google')
      .pipe(takeUntil(this.destroyed$))
      .subscribe((authResult: NbAuthResult) => {
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
