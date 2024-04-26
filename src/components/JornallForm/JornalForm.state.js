export const INITIAL_STATE ={
	isValid:{
		text:true,
		date:true,
		title:true,
		tag:true
	},
	values:{
		text:'',
		date:'',
		title:'',
		tag:''

	},
	ifFormReadyToSubmit:false
    
};
export function formReducer(state,action){
	switch(action.type){
	case 'SET_VALUE': return{
		...state,
		values:{...state.values,...action.payload}
	};

	case 'CLEAR': return{
		...state,
		values:INITIAL_STATE.values,
		isFrmReadyToSebm:false
	};

	case 'RESET_VALID': 
		return {...state,isValid:INITIAL_STATE.isValid};
	case'SUBMIT':{
		const titleValidity = action.payload.title?.trim().length;
		const textValidity = action.payload.text?.trim().length;
		const tagValidity = action.payload.tag?.trim().length;
		const dateValidity = action.payload.date;
		return {
			values:action.payload,
			isValid :{
				text:textValidity,
				title:titleValidity,
				date:dateValidity,
				tag:tagValidity
			},
			isFrmReadyToSebm:titleValidity && tagValidity  && dateValidity  && textValidity
		};
	}
            
	}

}