import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Collapse,
  Grid,
  Typography
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBolt,
  faBomb,
  faMeteor,
  faMitten,
  faRunning,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import { getImageLocationByName } from './util';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 225
  },
  cardContent: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    background: 'rgba(255, 255, 255, .5)'
  },
  cardDescription:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.primary.main,
          fontWeight: 900,
          lineHeight: 1.1,
          marginBottom: 20
        }
      : {
          color: theme.palette.text.primary,
          fontWeight: 900,
          lineHeight: 1.1,
          marginBottom: 20
        }
}));

const PlayerCard = ({ player }) => {
  const classes = useStyles();
  const [showContent, setShowContent] = useState(false);
  const [image, setImage] = useState('');
  const handleCardClick = () => setShowContent(!showContent);

  useEffect(() => {
    setImage(getImageLocationByName(player.name));
    console.log('player', player);
    console.log(
      `%c image location ${getImageLocationByName(player.name)}`,
      'background: royalblue; color: #fff;'
    );
    return () => {
      setImage('');
    };
  }, []);

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleCardClick}>
        <CardMedia component="img" image={image} alt={player.name} />
        <Collapse className={classes.cardContent} in={showContent} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography gutterBottom variant="h4" component="h2">
              <b>{player.name}</b>
            </Typography>
            <Typography className={classes.cardDescription} variant="body1" component="p">
              {player.description}
            </Typography>
            {!!player && (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FontAwesomeIcon icon={faMeteor} /> | {player.pitching}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FontAwesomeIcon icon={faBomb} /> | {player.batting}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FontAwesomeIcon icon={faMitten} /> | {player.fielding}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FontAwesomeIcon icon={faRunning} /> | {player.running}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FontAwesomeIcon icon={faBolt} /> | {player.power}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FontAwesomeIcon className={classes?.icon} icon={faStar} /> | {player.total}
                </Grid>
              </Grid>
            )}
          </CardContent>
        </Collapse>
      </CardActionArea>
    </Card>
  );
};
PlayerCard.propTypes = {
  player: PropTypes.object
};
export default PlayerCard;
