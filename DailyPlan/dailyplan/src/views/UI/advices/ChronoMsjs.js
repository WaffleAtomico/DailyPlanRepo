import '../../../styles/advices/ChronoMsjs.css'

export default function ChronoIndicator(props) {
    return (
        <div className='floating-component' onClick={props.handleStaStoToChrono}>
           {props.chronoTimeToChrono}
        </div>
    );
}
