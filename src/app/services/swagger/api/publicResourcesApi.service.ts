import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {Junction} from '../model/junction';
import {Coords} from "../model/coords";

export interface WikiEntry {
    title: string
}

@Injectable()
export class PublicResourcesApiService {
    constructor(private httpClient: HttpClient) {
    }

    getAllSystemCoordinates(): Observable<Coords[]> {
        return this.httpClient.get<Coords[]>('assets/systems.json');
    }

    public getAllWormholeJunctions(): Observable<Junction[]> {
        return this.httpClient.get<Junction[]>('assets/junctions.json');
    }

    public getSolarianSystems(): Observable<WikiEntry[]> {
        return this.httpClient.get<WikiEntry[]>('assets/system_assignments/Solarian_League_Systems.json');
    }

    public getHaveniteSystems(): Observable<WikiEntry[]> {
        return this.httpClient.get<WikiEntry[]>('assets/system_assignments/Havenite_Systems.json');
    }

    public getManticorianSystems(): Observable<WikiEntry[]> {
        return this.httpClient.get<WikiEntry[]>('assets/system_assignments/Manticoran_Systems.json');
    }

    public getAndermanSystems(): Observable<WikiEntry[]> {
        return this.httpClient.get<WikiEntry[]>('assets/system_assignments/Andermani_Systems.json');
    }
}
