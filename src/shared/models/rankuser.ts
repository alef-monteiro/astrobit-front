import {ModelBase} from './model-base';

export interface RankUser extends ModelBase{
  username: string;
  score: number;
}
