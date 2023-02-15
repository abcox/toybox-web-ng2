import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

export function isNonNull<T>(value: T): value is NonNullable<T> {
  return value != null && value !== 'null';
}