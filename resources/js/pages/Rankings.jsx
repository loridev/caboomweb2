import RankList from "../components/Ranking/RankList"
import Select from "../UI/Select/Select";
import Form from "../components/Form/Form";
import Button from "../UI/Button/Button";
import {useContext, useEffect, useRef, useState} from "react";
import Http from "../utils/Http";
import RankItem from "../components/Ranking/RankItem";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import AuthContext from "../context/AuthContext";

function Rankings() {
    const ctx = useContext(AuthContext);
    const [fullData, setFullData] = useState([]);
    const [data, setData] = useState([]);
    const [numPage, setNumPage] = useState(1);
    const [pagesShown, setPagesShown] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [numsOfPages, setNumsOfPages] = useState([0]);
    const [mode, setMode] = useState('indiv');
    const [worldNum, setWorldNum] = useState(1);
    const [levelNum, setLevelNum] = useState(1);
    const firstUpdate = useRef(true);

    const refresh = (ev) => {
        ev.preventDefault();
        setMode(ev.target[0].value);
        setWorldNum(Number.parseInt(ev.target[1].value));
        setLevelNum(Number.parseInt(ev.target[2].value));

        setNumPage(1);
    }

    const changePage = (ev) => {
        setNumPage(Number.parseInt(ev.target.innerHTML));
    }

    const getNumsOfPages = () => {
        if (numsOfPages.length > 3 && numPage >= 3) {
            if (numPage !== numsOfPages.length) {
                return [numPage - 1, numPage, numPage + 1];
            }
            return [numPage - 2, numPage -1, numPage];
        } else {
            return numsOfPages.slice(0, 3);
        }
    }

    const parseRankings = () => {
        return Array.from(data).map((rank) => {
            if (rank.user) {
                return {
                    username: rank.user.username,
                    score: rank.time,
                    currentUser: rank.current,
                };
            }
            return {
                username: rank.username,
                score: rank['multi_wins'],
                currentUser: rank.current
            }
        });
    }

    const findMyself = () => {
        const index = fullData.findIndex((rank) => rank.current);

        console.log(index);

        if (index !== -1) {
            setNumPage(Math.floor((index + 1) / 5 + 1));
        }
    }

    const getData = async (mode, worldNum = 0, levelNum = 0, page = 0) => {
        setIsLoading(true);
        if (mode === 'indiv') {
            if (page === 0) {
                let configObj = {url: `/api/v1/rankings/single?world_num=${worldNum}&level_num=${levelNum}`};
                if (localStorage.getItem('apitoken')) {
                    configObj = {
                        url: `/api/v1/rankings/single/current?world_num=${worldNum}&level_num=${levelNum}`,
                        token: localStorage.getItem('apitoken'),
                    };
                }
                const responseFromApi = await Http.fetchData(configObj);
                if (!responseFromApi.status) {
                    // FAILED
                } else {
                    const pagesArr = [];
                    for (let i = 1; i <= responseFromApi.data.numPages; i++) {
                        pagesArr.push(i);
                    }

                    setFullData(responseFromApi.data.rankings);
                    setNumsOfPages(pagesArr);

                }
            } else {
                let configObj = {url: `/api/v1/rankings/single?world_num=${worldNum}&level_num=${levelNum}&page=${page}`};
                if (localStorage.getItem('apitoken')) {
                    configObj = {
                        url: `/api/v1/rankings/single/current?world_num=${worldNum}&level_num=${levelNum}&page=${page}`,
                        token: localStorage.getItem('apitoken'),
                    };
                }
                const responseFromApi = await Http.fetchData(configObj);
                if (!responseFromApi.status) {
                    // FAILED
                } else {
                    console.log(responseFromApi.data);
                    setData(responseFromApi.data.rankings);
                }
            }
        } else {
            if (page === 0) {
                let configObj = {url: `/api/v1/rankings/multi`};

                if (localStorage.getItem('apitoken')) {
                    configObj = {
                        url: `/api/v1/rankings/multi/current`,
                        token: localStorage.getItem('apitoken'),
                    }
                }
                const responseFromApi = await Http.fetchData(configObj);
                if (!responseFromApi.status) {
                    // FAILED
                } else {
                    const pagesArr = [];
                    for (let i = 1; i <= responseFromApi.data.numPages; i++) {
                        pagesArr.push(i);
                    }

                    setFullData(responseFromApi.data.rankings);
                    setNumsOfPages(pagesArr);
                }
            } else {
                let configObj = {url: `/api/v1/rankings/multi?page=${page}`};

                if (localStorage.getItem('apitoken')) {
                    configObj = {
                        url: `/api/v1/rankings/multi/current?page=${page}`,
                        token: localStorage.getItem('apitoken'),
                    }
                }

                const responseFromApi = await Http.fetchData(configObj);
                if (!responseFromApi.status) {
                    // FAILED
                } else {
                    console.log(responseFromApi.data);
                    setData(responseFromApi.data.rankings);
                }
            }
        }
        setIsLoading(false);
    }

    useEffect(async () => {
        if (firstUpdate.current) {
            await getData(mode, worldNum, levelNum);
            await getData(mode, worldNum, levelNum, numPage);
            firstUpdate.current = false;
        }

    }, []);

    useEffect(async () => {
        if (!firstUpdate.current) {
            await getData(mode, worldNum, levelNum);
            if (numPage !== 0) {
                await getData(mode, worldNum, levelNum, numPage);
            }
        }
    }, [mode, worldNum, levelNum]);

    useEffect(async () => {
        if (!firstUpdate.current) {
            await getData(mode, worldNum, levelNum, numPage);
        }
    },[numPage]);


    return (
        <>
            <Form onSubmit={refresh}>
                <Select id="mode" placeholder="Selecct a mode" >
                    <option value="indiv">Single player</option>
                    <option value="multi">Multiplayer</option>
                </Select>
                <Select id="world" placeholder="Select a world">
                    <option value={1}>World 1</option>
                    <option value={2}>World 2</option>
                    <option value={3}>World 3</option>
                </Select>
                <Select id="level" placeholder="Select a level">
                    <option value={1}>Level 1</option>
                    <option value={2}>Level 2</option>
                    <option value={3}>Level 3</option>
                    <option value={4}>Level 4</option>
                </Select>
                <Button disabled={isLoading} type="submit">Refresh</Button>
            </Form>
            <div className="container">
                <LoadingSpinner show={isLoading} />
                {
                    !isLoading ? (
                        <RankList mode={mode}>
                            {parseRankings().map((ranking, i) => (
                                <RankItem rank={(i + 1) + numPage * 5 - 5} player={ranking.username}
                                          score={ranking.score} current={ranking.currentUser}/>
                            ))}
                        </RankList>
                    ) : null
                }
            </div>
            {
                !isLoading ? (
                    <div className="horizontal-group">
                        <span>Page: </span>
                        {getNumsOfPages().map((pageShown) => <a className={pageShown === numPage ? 'highlight' : ''} onClick={changePage}>{pageShown}</a>)}
                        <a onClick={findMyself}>Find myself</a>
                    </div>
                ) : null
            }
        </>
    )
}

export default Rankings
