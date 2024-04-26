/* eslint-disable react/no-unknown-property */
import { useEffect, useReducer, useRef } from 'react';
import stales from'./JornalForm.module.css';
import Button from '../Button/Button';
import { INITIAL_STATE, formReducer } from './JornalForm.state';





export default function JornalForm({onSubmit}){
	const titleRef = useRef();
	const dateRef = useRef();
	const texteRef = useRef();
	const tageRef = useRef();
	const focusError = (isValid)=>{
		switch(true){
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date:
			dateRef.current.focus();
			break;
		case !isValid.tag:
			tageRef.current.focus();
			break;
		case !isValid.text:
			texteRef.current.focus();
			break;
		}
	};
	const[formState,dispatchForm]= useReducer(formReducer,INITIAL_STATE);
	const {isValid,isFrmReadyToSebm,values} =formState;
	useEffect(()=>{
		let timerID;
		if(!isValid.date || !isValid.tag || !isValid.text || !isValid.title){
			timerID =setTimeout(()=>{
				focusError(isValid);
				dispatchForm({type:'RESET_VALID'});
				

			},1000);
		}
		return () =>{
			clearTimeout(timerID);
		};
	},[isValid]);
	useEffect(()=>{
		if(isFrmReadyToSebm){
			onSubmit(values);
			dispatchForm({type:'CLEAR'});
		}},
	[isFrmReadyToSebm, onSubmit, values]);

	const addJornalItem = (e)=>{
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		dispatchForm({type:'SUBMIT',payload:formProps});
		
		
		
		
		
		
	
	
		
		
		
		
	};
	const onChange = (e)=>{
		dispatchForm({type:'SET_VALUE',payload:{[e.target.name]:e.target.value}});

	};
	
 
	return(
		<form className={stales['journal-form']} onSubmit={addJornalItem}>
			<div>	<input type="text" ref={titleRef} onChange={onChange} name='title' value={values.title} className={`${stales['input-title']} ${isValid.title ?null:stales['invalid']}`} /></div>
			<input type="text" name='tag' ref={tageRef} value={values.tag} onChange={onChange} className={`${stales['input']} ${isValid.tag ?null:stales['invalid']}`}   />
			<input type="date" name='date' ref={dateRef} value={values.date} onChange={onChange} className={`${stales['input']} ${isValid.date ?null:stales['invalid']}`} />
			<textarea name='text' id="" cols="30" rows="10" onChange={onChange} ref={texteRef} value={values.text} className={`${stales['input']} ${isValid.text ?null:stales['invalid']}`} ></textarea>
            
			<Button text = {'Сохранить'}/>
		</form>
	);

}