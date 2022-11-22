/* eslint-disable no-console */
import React,{useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

const Show = () => {
    const {id} = useParams();
    const [show, setShow] = useState(null);
    const [isloading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMount = true;
        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(results => {
                if(isMount){
                    setShow(results);
                setIsLoading(false);
                }
        }).catch(err =>{
            if(isMount){
                setError(err.message);
                setIsLoading(false);
            }
        });
        return () => {
            isMount = false;
        }
    },[id, setShow])
    console.log('show', show);

    if(isloading){
        return <div>Data is being loading</div>
    }

    if(error){
        return <div>Error occured: {error}</div>
    }

  return (
    <div>This is Show page</div>
  )
}

export default Show;