import {ModelBase} from './model-base';

export class Card extends ModelBase{
  author: number; //objeto user
  game_title: string;
  author_name: string;
  description: string;
  link: string;
}
