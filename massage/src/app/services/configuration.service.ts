import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationService {

    public static readonly appVersion: string = '2.6.1';

    public static readonly defaultLanguage: string = 'en';
    public static readonly defaultHomeUrl: string = '/';
    public static readonly defaultTheme: string = 'Default';

    public baseUrl: 'http://localhost:27192';
    public loginUrl: '/Login';
    public authApiUrl: 'http://localhost:4400';

    public fallbackBaseUrl = 'http://allreifen.de';

    constructor() {
    }
}
