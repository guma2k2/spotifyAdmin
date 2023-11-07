import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { ActionType } from '../../enums/ActionType';
import { SentimentType } from '../../types/SentimentType';
import { saveSentiment, updateSentiment } from '../../services/SentimentService';
type Props = {
    slug : string
    setOpen : React.Dispatch<React.SetStateAction<boolean>>
    type : ActionType
    identify?: number
    sentiment?:SentimentType
}
const AddCustomSentiment = (props:Props) => {
    const queryClient = useQueryClient();
    const [sentiment, setSentiment] = useState<string>("") ;
    const [text, setText] = useState<string>("") ;
    const mutation =  useMutation({
        mutationFn: async  () => {
            
            const request:SentimentType = {
                text,
                sentiment
            }
            console.log(request);
            if(props.identify) {
                request.id = props.identify;
                return await updateSentiment(request);
            }
            return await saveSentiment(request);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['sentiment']);
            props.setOpen(false);
        },
        onError: (res) => {
            alert(res);
        }
    })
    
    const handleClose = () => {
        props.setOpen(false);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate();
    }
    useEffect(() => {
        if (props.sentiment) {
            setText(props.sentiment?.text);
            setSentiment(props.sentiment?.sentiment);
    }}, [props.sentiment]); 
    return (
        <div className='addCustom'>
            <div className="modal">
                <div className="modal-top">
                    <div className="title">{ActionType[props.type]} {props.slug} {props.identify}</div>
                    <span className='close' onClick={handleClose} >X</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='item'>
                        <label>Text</label>
                        <input type= "text" value={text} onChange={(e) => setText(e.target.value)} required />
                    </div>
                    <div className='item'>
                        <label>Sentiment</label>
                        <input type= "text" value={sentiment} onChange={(e) => setSentiment(e.target.value)} required />
                    </div>
                    <button >Submit</button>
                </form>
                <div className='modal-bottom' onClick={handleClose} >
                    <span>X</span>
                    <span>Close</span>
                </div>
            </div>
        </div>
    );
};

export default AddCustomSentiment;