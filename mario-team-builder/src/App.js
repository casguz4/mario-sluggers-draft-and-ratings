import { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { lighten, makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

import DraftSetup from './pages/DraftSetup';
import DraftTable from './draftTable';
import PlayerCard from './playerCard';
import { players } from './data/playerPool';
import { calculateStatTotal } from './util';

const playerPool = players.map((player) => {
  const { stats, ...p } = player;
  const power = calculateStatTotal(stats, ({ key, value }) =>
    key !== 'fielding' && key !== 'running' ? value : null
  );
  const total = calculateStatTotal(stats);
  return {
    ...p,
    ...stats,
    power,
    total
  };
});
const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 1px solid #a0a0a0;
  padding: 10px;
`;

const PlayerGrid = styled.div`
  display: grid;
  grid-template-rows: min-content;
  grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
  grid-column-gap: 10px;
  grid-row-gap: 1px;
  margin: auto 0;
`;
const useStyles = makeStyles((theme) => ({
  card: {
    margin: '10px'
  },
  playerContainer: {
    color: theme.palette.primary.main,
    backgroundColor: lighten(theme.palette.primary.light, 0.65)
  },
  playerContainerTitle: {
    marginTop: 0,
    marginBottom: 'auto'
  }
}));
export default function App() {
  const classes = useStyles();
  const [hasCompletedSetup, setCompleteSetup] = useState(false);
  const [draftClass, setDraftClass] = useState(playerPool);
  const [draftTeams, setDraftTeams] = useState([]);
  const [round, setRound] = useState(1);
  const [currentTeam, setCurrentTeam] = useState(draftTeams[0]);
  const [selected, setSelected] = useState([]);

  function draftPlayer() {
    const playerName = selected[0];
    const selectedPlayerIndexOfDraftClass = draftClass.findIndex(
      (player) => player.name === playerName
    );
    if (selectedPlayerIndexOfDraftClass < 0) return;
    const player = draftClass.splice(selectedPlayerIndexOfDraftClass, 1);
    setDraftClass([...draftClass]);
    currentTeam.roster.addPlayer(player[0]);
    setSelected([]);

    const currentTeamIndex = draftTeams.findIndex((team) => team.id === currentTeam.id);
    if (currentTeamIndex === draftTeams.length - 1) {
      setRound(round + 1);
      setCurrentTeam(draftTeams[0]);
    } else {
      setCurrentTeam(draftTeams[currentTeamIndex + 1]);
    }
  }

  return (
    <div>
      {!hasCompletedSetup && (
        <DraftSetup setDraftTeams={setDraftTeams} setCompleteSetup={setCompleteSetup} />
      )}
      {hasCompletedSetup && (
        <>
          <Grid container spacing={3}>
            <Grid container item xs={12} md={4}>
              <Grid container spacing={1}>
                {draftTeams.map((team) => (
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" component="h6">
                      {team.name} | {team.roster.getTeamStatAvg('power')} |{' '}
                      {team.roster.getTeamStatAvg('total')}
                    </Typography>
                    {team.roster.getTeam().map((player) => (
                      <div>{player.name}</div>
                    ))}
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid container item xs={12} md={8}>
              <PlayerContainer className={classes.playerContainer}>
                <Typography className={classes.playerContainerTitle} variant="h3" component="h1">
                  {currentTeam.name}'s selected players: <br />
                  {currentTeam.roster.getTeam().length > 0 && (
                    <>
                      <Typography variant="body2" component="span">
                        Avg Power: {currentTeam.roster.getTeamStatAvg('power')}
                      </Typography>
                      <Typography variant="body2" component="span">
                        {' '}
                        |{' '}
                      </Typography>
                      <Typography variant="body2" component="span">
                        Avg Total: {currentTeam.roster.getTeamStatAvg('total')}
                      </Typography>
                    </>
                  )}
                </Typography>
                <PlayerGrid>
                  {currentTeam.roster.getTeam().length > 0 &&
                    currentTeam.roster
                      .getTeam()
                      .map((player) => <PlayerCard className={classes.card} player={player} />)}
                </PlayerGrid>
              </PlayerContainer>
            </Grid>
            <Grid container item xs={12}>
              <div className="round">
                <Typography variant="h5" component="h3">
                  Round: {round}
                </Typography>
                <Typography variant="h4" component="h4">
                  Pick: {currentTeam.name}
                </Typography>
              </div>
            </Grid>
          </Grid>

          <DraftTable
            rows={draftClass}
            selected={selected}
            handleSetSelected={setSelected}
            handleDraftPlayer={draftPlayer}
          />
        </>
      )}
    </div>
  );
}
