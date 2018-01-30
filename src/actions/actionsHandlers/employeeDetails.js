
import {
	addUser as createAddUserAction,
} from "../creators/userDetails.js";
import {
	loadingDetails as createLoadingDetailsAction,
	loadedDetails as createLoadedDetailsAction,
  errorLoadingAction as createErrorWhileLoadingAction,
} from "../creators/userDetails";

//utils
import {
	adaptUserDetails,
} from 'utils/userDetails';

//service
import assetService from 'service';

export const addUser = values => dispatch => {
	const loadingDetailsAction = createLoadingDetailsAction();
	dispatch(loadingDetailsAction);
	
	assetService.post('', adaptUserDetails(values))
		.then(data => {
			dispatch(createAddUserAction(data));
		})
		.catch(err => {
			dispatch(createErrorWhileLoadingAction());
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