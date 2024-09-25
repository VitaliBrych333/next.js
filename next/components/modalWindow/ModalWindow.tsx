'use client'

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { FormInfo } from '@/components/FormInfo';
import DeleteWindow from '@/components/DeleteWindow';
import { Loading } from '@/components/shared/Loading';

const ModalWindow = () => {
  const { showAddModal, showEditModal, showDeleteModal } = useSelector((state: RootState) => state.modalWindowReducer);
  const loadingMovie = useSelector((state: RootState) => state.moviesReducer.loadingMovie);

  return (
    <>    
      {loadingMovie && (<div className="wrapper-background">
                          <Loading customClass="loader_movie" />
                        </div>)
      }

      {!loadingMovie && (showAddModal || showEditModal || showDeleteModal)
        && (<div className="wrapper-background">
              { showAddModal && (<FormInfo namePage="Add movie" nameButton="Submit" />) }
              { showEditModal && (<FormInfo namePage="Edit movie" nameButton="Save" />) }
              { showDeleteModal && (<DeleteWindow />) }
            </div>)
      }
    </>
  );
};
  
export default ModalWindow;