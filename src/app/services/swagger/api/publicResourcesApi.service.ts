import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {CoordsBlob} from '../model/coordsBlob';
import {Junction} from '../model/junction';

export interface WikiEntry {
    title: string
}

@Injectable()
export class PublicResourcesApiService {

    constructor(private httpClient: HttpClient) {
    }

    getAllSystemCoordinates(): Observable<CoordsBlob> {
        return this.httpClient.get<CoordsBlob>('assets/systems.json');
    }

    public getAllWormholeJunctions(): Observable<Junction[]> {
        return this.httpClient.get<Junction[]>('assets/junctions.json');
    }

    public getSolarianSystems(): Observable<WikiEntry[]> {
        return this.httpClient.get<WikiEntry[]>('assets/solarian_systems.json');
    }

    public getHaveniteSystems(): Observable<WikiEntry[]> {
        return this.httpClient.get<WikiEntry[]>('assets/havenite_system.json');
    }

    public getManticorianSystems(): Observable<WikiEntry[]> {
        return this.httpClient.get<WikiEntry[]>('assets/manticorian_systems.json');
    }

    public getAndermanSystems(): Observable<WikiEntry[]> {
        return this.httpClient.get<WikiEntry[]>('assets/anderman_systems.json');
    }
}
