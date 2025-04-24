import React from 'react';
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const EventTable = ({ event, isDelete, onDelete }) => {
  return (
    <div>
      <Card sx={{ width: 345 }}>
        <CardMedia
          sx={{ height: 345 }}
          image={event.image}
        />

        <CardContent>
          <Typography variant="h5">
            {event.name || 'Event Name'}
          </Typography>
          <Typography variant="body2">
            {event.description || 'Event description goes here.'}
          </Typography>
          <div className="py-2 space-y-2">
            <p>{event.location || 'Location'}</p>
            <p className="text-xs text-blue-500">{new Date(event.startedAt).toLocaleString()}</p>
            <p className="text-xs text-red-500">{new Date(event.endsAt).toLocaleString()}</p>
          </div>
        </CardContent>

        {isDelete && (
          <CardActions>
            <IconButton onClick={() => onDelete(event.id)}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        )}
      </Card>
    </div>
  );
};
