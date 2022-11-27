import React from 'react';
import ShowCard from './ShowCard';
import IMG_NOT_FOUND from '../../images/not-found.png';
import { FlexGride } from '../../styled';
import { useShows } from '../../misc/costom-hooks';

const ShowGrid = ({data}) => {
  const [starredShows, dispatchStarred] = useShows();

  return (
    <FlexGride>
        {
        data.map(({show})=> {
          const isStarred = starredShows.includes(show.id);

          const onStarClick = () => {
            if(isStarred){
              dispatchStarred({type: 'REMOVE', showId: show.id})
            } else {
              dispatchStarred({type: 'ADD', showId: show.id})
            }
          }

        return (<ShowCard key={show.id} id={show.id} name={show.name} image={show.image ? show.image.medium : IMG_NOT_FOUND} summary={show.summary} onStarClick={onStarClick} isStarred={isStarred}/>);})}
    </FlexGride>
  )
}

export default ShowGrid