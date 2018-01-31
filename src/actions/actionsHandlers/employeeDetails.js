
import {
	addUser as createAddUserAction,
} from "../creators/userDetails.js";
import {
	loadingDetails as createLoadingDetailsAction,
	loadedDetails as createLoadedDetailsAction,
  errorLoadingAction as createErrorWhileLoadingAction,
  updateUserAction as createUpdateUserAction,
} from "../creators/userDetails";

//utils
import {
  adaptUserDetailsForQuery,
} from 'utils/userDetails';
import queryString from 'query-string';

//service
import assetService from 'service';

export const addUser = values => dispatch => {
	assetService.post('', adaptUserDetailsForQuery(values))
		.then(data => {
			dispatch(createAddUserAction(data));
		})
		.catch(err => {
		
		})
}

export const fetchAllEmployees = () => dispatch => {
  const loadingDetailsAction = createLoadingDetailsAction();
  dispatch(loadingDetailsAction);
  
  assetService.get('')
    .then(data => {
      dispatch(createLoadedDetailsAction(data || []));
    })
    .catch(err => {
      dispatch(createErrorWhileLoadingAction());
    })
}

export const updateEmployee = updatedUserDetails => dispatch => {
  const url = encodeURIComponent(`/${updatedUserDetails.id}`);
  assetService.put(url, adaptUserDetailsForQuery(updatedUserDetails))
    .then(data => {
      dispatch(createUpdateUserAction(data));
    })
    .catch(err => {
    });
}