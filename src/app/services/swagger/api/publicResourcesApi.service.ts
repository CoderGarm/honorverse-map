import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {CoordsBlob} from '../model/coordsBlob';
import {Junction} from '../model/junction';


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

}
