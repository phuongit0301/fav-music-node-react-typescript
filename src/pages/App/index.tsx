import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Facebook } from "react-content-loader";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThList, faTh, faSortAmountDown, faSortAmountUp } from "@fortawesome/free-solid-svg-icons";

import {
  getLoadingSelector,
  getAlbumsSelector,
} from "src/services/album/selectors";
import {
  deleteAlbumRequest,
  fetchAlbumRequest,
  updateAlbumRequest,
} from "src/services/album/action";
import "./style.css";
import List from "./List";
import Grid from "./Grid";
import { IAlbum } from "src/services/album/types";
import { Loading } from "src/components";

const MyFacebookLoader = () => <Facebook />;

const App = (props: any) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = useState({
    isGrid: false,
    orderBy: 'asc',
    search: '',
    isFirstLoading: true,
  });
  const [updateLoading, setUpdateLoading] = useState(false);

  const loading = useSelector(getLoadingSelector);
  const albums = useSelector(getAlbumsSelector);

  useEffect(() => {
    dispatch(fetchAlbumRequest({
      search: state?.search,
      orderBy: state?.orderBy,
    }));
    setState({...state, isFirstLoading: true});
  }, [state?.orderBy, state?.search]);

  const dispatchAlbum = () => {
    history.push("/create");
  };

  const onUpdate = (item: IAlbum) => {
    setUpdateLoading(true);
    if (item?.id) {
      item.isBest = !item?.isBest;
      dispatch(
        updateAlbumRequest(item, () => {
          setTimeout(() => {
            setUpdateLoading(false);
          }, 300);
        })
      );
    }
  };

  const onDelete = (item: IAlbum) => {
    setUpdateLoading(true);
    if (item?.id) {
      dispatch(
        deleteAlbumRequest(item, () => {
          setTimeout(() => {
            setUpdateLoading(false);
          }, 300);
        })
      );
    }
  }

  const onSort = () => {
    setState({...state, orderBy: state?.orderBy === 'asc' ? 'desc' : 'asc'});
  }

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setState(prevState => ({...prevState, search: event.target.value}));
  }

  return (
    <div>
      {(loading && !state.isFirstLoading) ? (
        <div className="loading-container">
          <MyFacebookLoader />
          <MyFacebookLoader />
        </div>
      ) : (
        <div className="content-container relative h-screen shadow-lg rounded p-8">
          <h1 className="text-center">FAV MUSIC</h1>
          <button
            type="submit"
            className="button button--mimas"
            onClick={dispatchAlbum}
          >
            <span>Create Album</span>
          </button>
          <div className="flex flex-row">
            <button className="ml-2" onClick={() => setState({...state, isGrid: false})}>
              <FontAwesomeIcon
                icon={faThList}
                className={`${state?.isGrid ? "text-gray-400" : "text-black"}`}
              />
            </button>
            <button className="ml-2" onClick={() => setState({...state, isGrid: true})}>
              <FontAwesomeIcon
                icon={faTh}
                className={`${state?.isGrid ? "text-black" : "text-gray-400"}`}
              />
            </button>
            <button className="ml-2" onClick={onSort}>
              <FontAwesomeIcon
                icon={state?.orderBy === 'asc' ? faSortAmountDown : faSortAmountUp}
                className='text-black'
              />
            </button>
            <input
              onChange={onSearch}
              value={state.search}
              type="text"
              className="ml-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder="search title, description"
            />
          </div>
          <div className="flex flex-col mt-5">
            {state?.isGrid ? (
              <Grid albums={albums} onUpdate={onUpdate} onDelete={onDelete} />
            ) : (
              <List albums={albums} onUpdate={onUpdate} onDelete={onDelete} />
            )}
            {updateLoading && <Loading />}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
