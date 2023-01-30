import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useAppSelector } from '../../store/store-hook';
import Chip from '@mui/material/Chip';
export default function Header() {
  const { savedPokemons } = useAppSelector((store) => store.pokemon);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pokemon App
          </Typography>
          <Chip label={savedPokemons.length} color="warning" />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
