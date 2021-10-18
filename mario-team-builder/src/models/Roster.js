export default class Roster {
  team = [];
  power = 0;
  total = 0;

  addPlayer(player) {
    if (this.team.length >= 9) return;
    this.team.push(player);
    this.power += player.power;
    this.total += player.total;
  }

  getTeam() {
    return [...this.team];
  }

  getTeamStatAvg(stat) {
    let avg = this[stat] / this.team.length;
    if (isNaN(avg)) return 0;
    avg = avg.toFixed(2);
    const roundUp = /(.5\d)/;
    const removeDecimal = /(.\d{2})/;
    if (avg.search(roundUp) > 0) {
      return parseInt(avg.replace(removeDecimal, '')) + 1;
    }

    return avg.replace(removeDecimal, '');
  }
}
