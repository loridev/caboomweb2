import ActionButton from '../../UI/ActionButton/ActionButton';
import Video from '../../UI/Video/Video';
import clases from './styles/Background.module.css';
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

function Background(props) {
    return (
        <div className={clases.container}>
            <Video className={`${clases.video} ${clases.background}`}/>
            <div className={clases.containerOver}>
                <h1 className={clases.text}>{props.text}</h1>
                {localStorage.getItem('apitoken') ? (
                    <a href="/installer/CarlosElSetups.exe" download="CarlosInstaller.exe">
                        <ActionButton>{props.buttonText}</ActionButton>
                    </a>
                    )
                    :
                    (
                        <Link to="/login" onClick={(() => toast.warn('You must be logged in to install the game!'))}>
                            <ActionButton>{props.buttonText}</ActionButton>
                        </Link>
                    )
                }
            </div>
        </div>
    );
}

export default Background;
