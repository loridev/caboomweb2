import classes from './styles/RankList.module.css';

function RankList(props) {
    return (
        <table className={classes.ranking}>
            <thead>
            <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>{props.mode === 'indiv' ? 'Time' : 'Wins'}</th>
            </tr>
            </thead>
            <tbody>
                { props.children }
            </tbody>
        </table>
    );
}

export default RankList;
