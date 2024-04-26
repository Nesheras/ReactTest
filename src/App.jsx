
import './App.css';
import  './components/Button/Button.css';
import JournalItem from './components/Journalitem/Journalitem';
import CardButton from './components/CardButton/CardButton';
import LeftPanel from './components/layout/leftPanel/LeftPanel';
import Body from './components/layout/Body/Body';
import Header from './components/Header/Header';
import JornalList from './components/JornalList/JornalList';
import JornallAddButton from './components/JornallAddButton/JornalAddButton';
import JornalForm from './components/JornallForm/JornalForm';
import { useEffect, useState } from 'react';



function App() {
	
	const [data,setData] = useState([]);
	useEffect(()=>{	const data1 = JSON.parse(localStorage.getItem('data'));
		if(data1){
			setData(data1.map(it=>({
				...it,
				date:new Date(it.date)
			})));
		}


	},[]);
	useEffect(()=>{
		if(!data.length){
			localStorage.setItem('data',JSON.stringify(data));
		}
		console.log(data);
	},[data]);


	function crID(cb){
		if(cb.length ===0){
			return 1;
		}else{
			return	Math.max(...cb.map((i)=>i.id))  +1;
		}
		
	}
	const addItem = (newItem)=>{
		
		setData((oldItem)=>[...oldItem,{
			text:newItem.text,
			title:newItem.title,
			date:new Date(newItem.date),
			id:crID(oldItem)
		
		}]);
	};

	const sortItem = (a,b)=>{
		if(a.date<b.date){
			return 1;
		}else{
			return -1;
		}
	};

	function swithc(){
		if(data.length===0){
			return <p>Добавьте текст</p>;
		}else{
			return(	 data.sort(sortItem).map((el)=>(
				<CardButton key = {el.id}>
					<JournalItem 
						text = {el.text} 
						date = {el.date} 
						title={el.title}/></CardButton>

			)));
		}
	}


	return (
		<div className='app'>
			<LeftPanel>
				<Header/>
				<JornallAddButton/>
				<JornalList>
				
					{swithc()}
			
					

				</JornalList>

			</LeftPanel>
			<Body>
				
				<JornalForm onSubmit={addItem}/>
			</Body>
			
		</div>
 
	);
}

export default App;
