import {DateBlock} from './dateBlock';

export interface WikiBattleBlock {
    name: string;
    image?: string;
    conflict?: string;
    date: string;
    dateBlock: DateBlock;
    place: string;
    result: string;
    side: Array<string>;
    commander: Array<string>;
    force: Array<string>;
    casual: Array<string>;
}
