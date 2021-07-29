import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/_models';
import { AccountService, AlertService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-update-user',
  templateUrl: 'update-user.component.html',
  styleUrls: ['./update-user.component.less']
})
export class UpdateUserComponent implements OnInit {

  user: User;

  form: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    
  constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService) { }

  ngOnInit(): void {
      this.form = this.formBuilder.group({
        email: ['', Validators.required]
      });

      this.user = JSON.parse(localStorage.getItem('userData'));
      console.log(this.user)
      this.f.email.setValue(this.user.email)
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;

        this.user.email = this.f.email.value;
        this.accountService.update(this.user)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });

  }

}
