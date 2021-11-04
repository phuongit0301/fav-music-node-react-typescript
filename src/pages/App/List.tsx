import React from 'react'
import { IAlbum } from 'src/services/album/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

interface Props {
  albums: IAlbum[];
  onUpdate: (item: IAlbum) => void;
  onDelete: (item: IAlbum) => void;
}

const List: React.FC<Props> = ({
  albums = [],
  onUpdate = (item) => {},
  onDelete = (item) => {},
}) => {
  return (
    <div className="rid grid-cols-1 gap-2">
      {
        albums.length === 0 ?
          <h3>Album Not Found</h3>
        :
          albums.map((item, index) => (
            <div className="rounded overflow-hidden shadow-lg p-5 mb-5" key={`list-album-${item.id}-${index}`}>
              <h3>{item?.title}</h3>
              <p>{item?.description}</p>
              <div className="mt-5">
                <button type="submit" className={`text-left mr-5`} onClick={() => onUpdate(item)}>
                  {
                    item?.isBest ?
                      <FontAwesomeIcon icon={faHeart} className='text-indigo-600 hover:text-gray-600 focus:text-gray-600' />
                    :
                      <FontAwesomeIcon icon={faHeart} className='text-gray-600 hover:text-indigo-600 focus:text-indigo-600' />
                  }
                </button>
                <button type="submit" onClick={() => onDelete(item)}>
                  <FontAwesomeIcon icon={faTrashAlt} className='text-gray-600 hover:text-indigo-600 focus:text-indigo-600' />
                </button>
              </div>
            </div>
          ))
      }
    </div>
  )
}

export default List;
