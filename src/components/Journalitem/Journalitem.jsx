import './Journalitem.css';
export default function JournalItem({text,date,title}){
	let dataNew = new Intl.DateTimeFormat('ru-Ru').format(date);

	return(
		<>
			<h2 className='journal-item__header'>{title}</h2>
			<h2 className='journal-item__body'>
				<div className='journal-item__date'>{dataNew}</div>
				<div className='journal-item__text'>{text}</div>
			</h2>
		</>
	);

}