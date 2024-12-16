import {ModelBase} from './model-base';

export interface Rankuser extends ModelBase{
  username: string;
  score: number;
}
