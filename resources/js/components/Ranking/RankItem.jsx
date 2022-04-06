function RankItem(props) {
    return (
        <tr className={props.current ? 'highlight' : null}>
            <td>{props.rank}</td>
            <td>{props.player}</td>
            <td>{props.score}</td>
        </tr>
    )
}

export default RankItem
