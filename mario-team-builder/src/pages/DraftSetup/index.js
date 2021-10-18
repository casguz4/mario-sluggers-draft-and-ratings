import React, { useState } from 'react';
import { Container, FormControl, InputLabel, Select, MenuItem, TextField } from '@material-ui/core';
import Team from '../../models/Team';

const DraftSetup = ({ setCompleteSetup, setDraftTeams }) => {
  const [formData, setFormData] = useState({
    numberOfTeams: null,
    teams: {}
  });
  const handleNumberOfTeamsChange = (value) => {
    const teamSet = {};
    for (let i = 0; i < value; i++) {
      teamSet[i] = new Team({ id: i + 1 });
    }
    setFormData({
      ...formData,
      numberOfTeams: value,
      teams: { ...teamSet }
    });
  };
  const preSubmitValidation = () => {
    let valid = true;
    valid = formData.teams.some((t) => !!t.name);
    return valid;
  };
  const submit = () => {
    const canAdvance = preSubmitValidation();
    if (canAdvance) {
      setDraftTeams([...formData.teams]);
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
        {[...formData.teams].map((t, i) => (
          <div key={`team-${t.id}`}>
            {/* <InputLabel>How many teams?</InputLabel> */}
            <TextField
              label={`Team name:`}
              onChange={(event) => {
                formData.teams.set(
                  i + 1,
                  new Team({ ...formData.teams.get(i + 1), name: event.target.value })
                );
              }}
              value={formData.teams.get[i + 1].name}
            />
          </div>
        ))}
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
