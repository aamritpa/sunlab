import React, { useState } from 'react';
import Box from '@material-ui/core/Box';

import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import './index.scss';

const useStyles = makeStyles({
  root: {
    Width: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 20,
    textDecoration: 'none',
    color: '#cb2d39',
    fontWeight: 'bold',
    marginBottom: '15px'
  },
  pos: {
    marginBottom: 12
  }
});
/**
 *
 * @param {Object} props
 * @property {Object} glycoslation object containing glyco bond info
 * @property {Object} cysteine
 * @property {Object} disulfideBonds object containing sulfide bond info
 * @property {func} toggleGlyco Function that toggles glyco bond visibility
 * @property {func} toggleCysteine
 * @property {func} toggleSulfide Function that toggles sulfide bond visibility
 * @property {integar} length total length of protein structure
 */
function Legend(props) {
  const {
    glycoslation,
    cysteine,
    disulfideBonds,
    toggleGlyco,
    toggleSulfide,
    toggleCysteine,
    length
  } = props;
  const [showGlyco, setShowGlyco] = useState(true);
  const [showCysteine, setShowCysteine] = useState(true);
  const [showSulfide, setShowSulfide] = useState(true);
  const classes = useStyles();

  const handleToggle = bond => {
    if (bond === 'sulfide') {
      toggleSulfide(!showSulfide);
      setShowSulfide(!showSulfide);
    } 
    else if(bond === 'glyco') {
      toggleGlyco(!showGlyco);
      setShowGlyco(!showGlyco);
    }
    else if(bond === 'cysteine')
    {
      toggleCysteine(!showCysteine);
      setShowCysteine(!showCysteine);
    }
  };

  return (
    <Card variant="outlined" raised classes={{ root: 'legend--wrapper' }}>
      <CardContent>
        <div className="legend--header">
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
            display="inline"
          >
            Legend
          </Typography>
        </div>
        <div className="legend--menuItem">
          <Typography>
            Total Glyco Bonds:
            <Typography display="inline" classes={{ root: 'bold-text' }}>
              {glycoslation.length}
            </Typography>
          </Typography>

          <div className={`button-visibility${showGlyco ? '--on' : '--off'}`}>
            <Tooltip title="toggle visibility" placement="right-end">
              <IconButton
                aria-label="delete"
                className={{ root: 'on' }}
                onClick={() => handleToggle('glyco')}
              >
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        <div className="legend--menuItem">
          <Typography>
            Total Cysteine Bonds:
            <Typography display="inline" classes={{ root: 'bold-text' }}>
              {cysteine.length}
            </Typography>
          </Typography>

          <div className={`button-visibility${showCysteine ? '--on' : '--off'}`}>
            <Tooltip title="toggle visibility" placement="right-end">
              <IconButton
                aria-label="delete"
                className={{ root: 'on' }}
                onClick={() => handleToggle('cysteine')}
              >
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        <div className="legend--menuItem">
          <Typography>
            Total Sulfide Bonds:
            <Typography display="inline" classes={{ root: 'bold-text' }}>
              {disulfideBonds.length}
            </Typography>
          </Typography>
          <div className={`button-visibility${showSulfide ? '--on' : '--off'}`}>
            <Tooltip title="toggle visibility" placement="right-end">
              <IconButton
                aria-label="delete"
                onClick={() => handleToggle('sulfide')}
              >
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div className="legend--menuItem">
          <Typography>
            Total Protein Length:
            <Typography display="inline" classes={{ root: 'bold-text' }}>
              {length}
            </Typography>
          </Typography>
        </div>
        <div className="legend--menuItem">
          <Box
              component="span" 
              display="block" 
              bgcolor="#a5d6a7"
              fontFamily="h10.fontFamily"
              fontSize={{ xs: 'h10.fontSize', sm: 'h10.fontSize', md: 'h10.fontSize' }}
              p={{ xs: 1.0, sm: 1.0, md: 1.0 }}
              m={0.5}
            >
            Inside
            </Box> 
            {"\n"}
            <Box 
              component="span" 
              display="block"
              bgcolor="#4fc3f7"
              fontFamily="h10.fontFamily"
              fontSize={{ xs: 'h10.fontSize', sm: 'h10.fontSize', md: 'h10.fontSize' }}
              p={{ xs: 1.0, sm: 1.0, md: 1.0 }}
              m={0.5}
            >
              Outside
            </Box>
        </div>
      </CardContent>
    </Card>
  );
}

Legend.propTypes = {
  glycoslation: PropTypes.arrayOf(PropTypes.string).isRequired,
  disulfideBonds: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleGlyco: PropTypes.func,
  toggleCysteine: PropTypes.func,
  toggleSulfide: PropTypes.func,
  length: PropTypes.number.isRequired
};

Legend.defaultProps = {
  toggleGlyco: () => {},
  toggleSulfide: () => {},
  toggleCysteine: () => {}
};

export default Legend;
