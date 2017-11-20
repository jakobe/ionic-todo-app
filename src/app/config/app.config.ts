import { InjectionToken } from '@angular/core';
import { VERSION } from './app.version';

export interface AppConfig {
    version:string
}

export const CONFIG : AppConfig = {
    version: VERSION
};

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');