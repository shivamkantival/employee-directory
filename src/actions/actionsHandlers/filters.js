import {
	applyFilter as createApplyFilterAction,
} from '../creators/filters';
import {
	loadingDetails as createLoadingDetailsAction,
	loadedDetails as createLoadedDetailsAction,
  errorLoadingAction as createErrorWhileLoadingAction,
} from '../creators/userDetails';

//utils
import {
	adaptToQueryString,
} from 'utils/service';
import {
	adaptUserDetails,
} from 'utils/userDetails';

//service
import assetService from 'service';

export const applyFilters = filters => dispatch => {
	const applyFilterAction = createApplyFilterAction(filters);
	dispatch(applyFilterAction);
	
	const loadingDetailsAction = createLoadingDetailsAction();
	dispatch(loadingDetailsAction);
	
	const queryParams = adaptToQueryString(adaptUserDetails(filters));
	
	assetService.get(`?${queryParams}`)
		.then(userDetails => {
			dispatch(createLoadedDetailsAction(userDetails || []));
		})
		.catch(err => {
      dispatch(createErrorWhileLoadingAction());
		});
}