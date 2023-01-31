import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './components/user.component';
import { MaterialModule } from '../material-module';
import { UserService } from './services';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
    NgxMaskDirective,
    NgxMaskPipe,
    provideEnvironmentNgxMask,
} from 'ngx-mask';
@NgModule({
    declarations: [UserComponent],
    imports: [
        CommonModule,
        NgxMaskDirective,
        NgxMaskPipe,
        MaterialModule,
        HttpClientModule,
        FormsModule,
    ],
    exports: [UserComponent],
    providers: [UserService, provideEnvironmentNgxMask()],
})
export class UserModule {}
