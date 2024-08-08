
import './style.css'

export default function Opcao (props){

    const vencedorClass = props.item.vencedor ? 'vencedor' : '';
    return(
        <section onClick={() => props.aoClicar(props.index)} id={props.index} className={`${props.item.valor} ${vencedorClass}`} />
    );
}