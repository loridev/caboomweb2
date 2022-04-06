import Button from '../../UI/Button/Button';
import Video from '../../UI/Video/Video';
import clases from './styles/Background.module.css';

function Background(props) {
    return (
        <div className={clases.container}>
            <Video className={`${clases.video} ${clases.background}`}/>
            <div className={clases.containerOver}>
                <h1 className={clases.text}>{props.text}</h1>
                <Button>{props.buttonText}</Button>
            </div>
        </div>
    );
}

export default Background;