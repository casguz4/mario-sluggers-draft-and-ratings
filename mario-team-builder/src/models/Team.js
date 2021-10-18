import Roster from './Roster';
export default class Team {
  id;
  name = '';
  roster = new Roster();
  power = 0;
  total = 0;

  constructor(t = { roster: new Roster(), power: 0, total: 0, id: null, name: '' }) {
    this.roster = Object.prototype.hasOwnProperty.call(t, 'roster') ? t.roster : new Roster();
    this.power = Object.prototype.hasOwnProperty.call(t, 'power') ? t.power : [];
    this.total = Object.prototype.hasOwnProperty.call(t, 'total') ? t.total : [];
    this.id = Object.prototype.hasOwnProperty.call(t, 'id') ? t.id : null;
    this.name = Object.prototype.hasOwnProperty.call(t, 'name') ? t.name : '';
  }
}
