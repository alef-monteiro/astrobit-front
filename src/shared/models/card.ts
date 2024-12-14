import {ModelBase} from './model-base';

export class Card extends ModelBase{
  author: number; //objeto user
  game_title: string;
  description: string;
  link: string;
}
