import clases from "./styles/DevInfo.module.css";

function DevInfo(props) {
    return <div className={clases.dev}> {props.children} </div>
}

export default DevInfo;