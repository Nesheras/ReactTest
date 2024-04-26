import './CardButton.css';
export default function CardButton({children,className}){
	let cl = 'card-button' + (className? ' '+ className: '');
	return(
		<button className={cl}> {children}</button>
	);

}