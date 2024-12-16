import {ModelBase} from './model-base';

export interface RankUser extends ModelBase{
  player: string;
  score: number;
}
