import { Component } from '@angular/core';

import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: User;

    constructor(private accountService: AccountService) {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.accountService.getByUserName(this.user.userName)
        .pipe(first())
        .subscribe(data => {
            localStorage.setItem('userData', JSON.stringify(data))
        });
    }
}