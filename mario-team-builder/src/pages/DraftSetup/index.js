import React, { useState } from 'react';
import { Container, FormControl, InputLabel, Select, MenuItem, TextField } from '@material-ui/core';
import Team from '../../models/Team';

const DraftSetup = ({ setCompleteSetup, setDraftTeams }) => {
  const [formData, setFormData] = useState({
    numberOfTeams: null,
    teams: {}
  });
  const handleNumberOfTeamsChange = (value) => {
    const teamSet = { ...formData.teams };
    for (let i = 0; i < value; i++) {
      if (!teamSet[i + 1]) teamSet[i + 1] = new Team({ id: i + 1 });
    }
    setFormData({
      ...formData,
      numberOfTeams: value,
      teams: { ...teamSet }
    });
  };
  const preSubmitValidation = () => {
    return !Object.values(formData.teams).some((t) => !t.name);
  };
  const submit = () => {
    const canAdvance = preSubmitValidation();
    if (canAdvance) {
      const teams = [
        ...Object.values(formData.teams)
          .map((team, index) => {
            if (index < formData.numberOfTeams && team.name) return team;
          })
          .filter(Boolean)
      ];
      setDraftTeams([...teams]);
      setCompleteSetup(true);
    }
  };

  return (
    <Container>
      <form>
        <FormControl fullWidth>
          <InputLabel>How many teams?</InputLabel>
          <Select
            value={formData.numberOfTeams}
            onChange={(e) => handleNumberOfTeamsChange(e.target.value)}>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
          </Select>
        </FormControl>
        {Object.entries(formData.teams).map(([key, val], i) => {
          if (i < formData.numberOfTeams) {
            return (
              <div key={`team-${val.id}-${key}`}>
                {/* <InputLabel>How many teams?</InputLabel> */}
                <TextField
                  label={`Team name:`}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      teams: {
                        ...formData.teams,
                        [i + 1]: { ...formData.teams[i + 1], name: event.target.value }
                      }
                    });
                  }}
                  value={formData.teams[i + 1]?.name ?? ''}
                />
              </div>
            );
          }
        })}
      </form>
      <br />
      <button
        onClick={() => {
          submit();
        }}>
        Complete Setup
      </button>
    </Container>
  );
};

export default DraftSetup;
