import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../shared/store/effects/auth.effect';

@NgModule({
  // imports: [EffectsModule.forRoot([AuthEffects])],
})
export class DashboardModule {}
