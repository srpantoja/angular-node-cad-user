import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { UserService } from '../services';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of } from 'rxjs';
import { CepError, Cep } from 'src/app/dto/cep.dto';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
    private strongPassword: string =
        '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}';

    public hide: boolean;
    public formGroup: FormGroup;
    public nameFormControl: FormControl;
    public dateFormControl: FormControl;
    public postalCodeFormControl: FormControl;
    public addressFormControl: FormControl;
    public cityFormControl: FormControl;
    public stateFormControl: FormControl;
    public passwordFormControl: FormControl;
    public emailFormControl: FormControl;
    public btnController: boolean;
    public responseMessage: string;

    constructor(
        private userService: UserService,
        private _snackBar: MatSnackBar
    ) {
        this.hide = true;
        this.nameFormControl = new FormControl('', [Validators.required]);
        this.dateFormControl = new FormControl('', [Validators.required]);
        this.postalCodeFormControl = new FormControl('', [Validators.required]);
        this.addressFormControl = new FormControl(
            { value: '', disabled: true },
            [Validators.required]
        );
        this.cityFormControl = new FormControl({ value: '', disabled: true }, [
            Validators.required,
        ]);
        this.stateFormControl = new FormControl({ value: '', disabled: true }, [
            Validators.required,
        ]);
        this.passwordFormControl = new FormControl('', [
            Validators.required,
            Validators.pattern(this.strongPassword),
        ]);
        this.emailFormControl = new FormControl('', [
            Validators.required,
            Validators.email,
        ]);
        this.btnController = true;

        this.formGroup = new FormGroup({
            name: this.nameFormControl,
            birth_day: this.dateFormControl,
            cep: this.postalCodeFormControl,
            address: this.addressFormControl,
            city: this.cityFormControl,
            state: this.stateFormControl,
            password: this.passwordFormControl,
            email: this.emailFormControl,
        });
        this.responseMessage = '';
    }

    onSubmit(user: User): void {
        const date: string = this.formatDate(user.birth_day);
        if (this.checkFormErros()) {
            this._snackBar.open(
                'There are required fields not filled in',
                'close'
            );
        } else {
            this.userService
                .create({
                    ...user,
                    birth_day: date,
                    address: this.addressFormControl.value,
                    city: this.cityFormControl.value,
                    state: this.stateFormControl.value,
                })
                .subscribe(
                    (res) =>
                        this._snackBar.open('User saved successfully', 'close'),
                    (error) => {
                        this._snackBar.open(error.error.message, 'close');
                        return of([]);
                    }
                );
        }
        this.postalCodeFormControl.valueChanges.subscribe();
    }

    formatDate(date: string): string {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    ngOnInit(): void {
        this.userService.getAll().subscribe(
            (res) => {
                console.log('get all users: ', res);
            },
            (error) => {
                this._snackBar.open(error.error.message, 'close');
            }
        );
    }

    getCep(): void {
        const resetFields = () => {
            this.addressFormControl.setValue('');
            this.cityFormControl.setValue('');
            this.stateFormControl.setValue('');
        };
        const postalCode: string = this.postalCodeFormControl.value as string;

        if (postalCode.length === 8) {
            this.userService.getCep(this.postalCodeFormControl.value).subscribe(
                (response) => {
                    if (!Array.isArray(response)) {
                        const value = response as Cep;
                        this.addressFormControl.setValue(value.address);
                        this.cityFormControl.setValue(value.city);
                        this.stateFormControl.setValue(value.state);
                    }
                },
                (error) => {
                    resetFields();
                    this._snackBar.open(error.error.message, 'close');
                    return of([]);
                }
            );
        } else {
            resetFields();
        }
    }

    checkFormErros(): boolean {
        if (!this.nameFormControl.valid) return true;
        if (!this.emailFormControl.valid) return true;
        if (
            !this.addressFormControl.valid &&
            this.addressFormControl.value.length <= 0
        )
            return true;
        if (
            !this.cityFormControl.valid &&
            this.cityFormControl.value.length <= 0
        )
            return true;
        if (
            !this.stateFormControl.valid &&
            this.stateFormControl.value.length <= 0
        )
            return true;
        if (!this.postalCodeFormControl.valid) return true;
        if (!this.dateFormControl.valid) return true;
        if (!this.passwordFormControl.valid) return true;
        return false;
    }
}
