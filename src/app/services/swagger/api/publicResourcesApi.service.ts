import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {Junction} from '../model/junction';
import {Coords} from "../model/coords";
import {WikiBattleBlock} from "../../../modules/star-map/payload/wikiBattleBlocks";

export interface WikiEntry {
    title: string
}

export interface LanguagePresence {
    title: string
    titleDE: string
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

    public getWikiSystemsDE(): Observable<WikiEntry[]> {
        return this.httpClient.get<WikiEntry[]>('assets/wiki-integration/de_systems.json');
    }

    public getWikiSystemsEN(): Observable<WikiEntry[]> {
        return this.httpClient.get<WikiEntry[]>('assets/wiki-integration/en_systems.json');
    }

    public getWikiSystemsPresence(): Observable<LanguagePresence[]> {
        return this.httpClient.get<LanguagePresence[]>('assets/wiki-integration/system_translations.json');
    }

    public getWikiBattleMAlignAntiPiracyOps(): Observable<WikiBattleBlock[]> {
        return this.httpClient.get<WikiBattleBlock[]>('assets/wiki-integration/battle-data/Anti-piracy-action_Mesan-Alignment-operation.json');
    }

    public getWikiBattleAxelrodOps(): Observable<WikiBattleBlock[]> {
        return this.httpClient.get<WikiBattleBlock[]>('assets/wiki-integration/battle-data/Axelrod-Conspiracy.json');
    }

    public getWikiBattleFirstHavenManticoreWarOps(): Observable<WikiBattleBlock[]> {
        return this.httpClient.get<WikiBattleBlock[]>('assets/wiki-integration/battle-data/First-Havenite-Manticoran-War.json');
    }

    public getWikiBattleMaccabeusOps(): Observable<WikiBattleBlock[]> {
        return this.httpClient.get<WikiBattleBlock[]>('assets/wiki-integration/battle-data/Maccabeus-Campaign.json');
    }

    public getWikiBattleFerretOps(): Observable<WikiBattleBlock[]> {
        return this.httpClient.get<WikiBattleBlock[]>('assets/wiki-integration/battle-data/Operation-Ferret.json');
    }

    public getWikiBattleManticoreAntiPiracyOps(): Observable<WikiBattleBlock[]> {
        return this.httpClient.get<WikiBattleBlock[]>('assets/wiki-integration/battle-data/RMN-anti-piracy-campaign.json');
    }

    public getWikiBattleManticoreAntiSlaveryOps(): Observable<WikiBattleBlock[]> {
        return this.httpClient.get<WikiBattleBlock[]>('assets/wiki-integration/battle-data/RMN-anti-slavery-operations.json');
    }

    public getWikiBattleSecondHavenManticoreWarOps(): Observable<WikiBattleBlock[]> {
        return this.httpClient.get<WikiBattleBlock[]>('assets/wiki-integration/battle-data/Second-Havenite-Manticoran-War.json');
    }

    public getWikiBattleManticoreSilesiaOps(): Observable<WikiBattleBlock[]> {
        return this.httpClient.get<WikiBattleBlock[]>('assets/wiki-integration/battle-data/Silesian-Confederacy.json');
    }

    public getWikiBattleSolarianManticoreOps(): Observable<WikiBattleBlock[]> {
        return this.httpClient.get<WikiBattleBlock[]>('assets/wiki-integration/battle-data/Solarian-Manticoran-War.json');
    }

    public getWikiBattleTalbotOps(): Observable<WikiBattleBlock[]> {
        return this.httpClient.get<WikiBattleBlock[]>('assets/wiki-integration/battle-data/Talbott-Cluster-conflict.json');
    }
}
