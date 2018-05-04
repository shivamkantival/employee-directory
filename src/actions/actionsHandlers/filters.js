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
  adaptUserDetailsForQuery,
} from 'utils/userDetails';
import _isEmpty from 'lodash/isEmpty';

//service
import assetService from 'service';
import eventManager from 'utils/eventManager';

//constants
import EVENT_TYPES from 'constants/eventTypes';
import NOTIFICATION_TYPES from 'constants/notificationTypes';

export const applyFilters = filters => dispatch => {
	const applyFilterAction = createApplyFilterAction(filters);
	dispatch(applyFilterAction);

	const loadingDetailsAction = createLoadingDetailsAction();
	dispatch(loadingDetailsAction);

	const queryParams = adaptToQueryString(adaptUserDetailsForQuery(filters));

	assetService.get(`?${queryParams}`)
		.then(userDetails => {
			dispatch(createLoadedDetailsAction(userDetails || []));
			_isEmpty(userDetails) && eventManager.emit(EVENT_TYPES.SHOW_NOTIF, {
				type: NOTIFICATION_TYPES.SUCCESS,
				message: 'No users present for given filter',
			});
		})
		.catch(() => {
			dispatch(createErrorWhileLoadingAction());
			eventManager.emit(EVENT_TYPES.SHOW_NOTIF, {
				type: NOTIFICATION_TYPES.ERROR,
				message: 'Sorry!!, couldn\'t filter due to bad network',
			});
		});
};
