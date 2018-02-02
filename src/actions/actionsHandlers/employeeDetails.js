
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
import _isEmpty from 'lodash/isEmpty';

//service
import assetService from 'service';
import eventManager from 'utils/eventManager';

//constants
import EVENT_TYPES from 'constants/eventTypes';
import NOTIFICATION_TYPES from 'constants/notificationTypes';

export const addUser = values => dispatch => {
	assetService.post('', adaptUserDetailsForQuery(values))
		.then(data => {
			dispatch(createAddUserAction(data));
			eventManager.emit(EVENT_TYPES.SHOW_NOTIF, {
			  type: NOTIFICATION_TYPES.SUCCESS,
        message: 'Successfully added user',
      })
		})
		.catch(err => {
		  eventManager.emit(EVENT_TYPES.SHOW_NOTIF, {
		    type: NOTIFICATION_TYPES.ERROR,
        message: 'Sorry!!, couldn\'t add user due to bad network',
      });
		})
};

export const fetchAllEmployees = () => dispatch => {
  const loadingDetailsAction = createLoadingDetailsAction();
  dispatch(loadingDetailsAction);
  
  assetService.get('')
    .then(data => {
      dispatch(createLoadedDetailsAction(data || []));
      _isEmpty(data) && eventManager.emit(EVENT_TYPES.SHOW_NOTIF, {
        type: NOTIFICATION_TYPES.SUCCESS,
        message: 'No data present',
      })
    })
    .catch(err => {
      dispatch(createErrorWhileLoadingAction());
      eventManager.emit(EVENT_TYPES.SHOW_NOTIF, {
        type: NOTIFICATION_TYPES.ERROR,
        message: 'Sorry!!, couldn\'t fetch users due to bad network',
      });
    })
};

export const updateEmployee = updatedUserDetails => dispatch => {
  const url = `/${updatedUserDetails.id}`;
  assetService.put(url, adaptUserDetailsForQuery(updatedUserDetails))
    .then(data => {
      dispatch(createUpdateUserAction(data));
      eventManager.emit(EVENT_TYPES.SHOW_NOTIF, {
        type: NOTIFICATION_TYPES.SUCCESS,
        message: 'Updated User Details'
      })
    })
    .catch(err => {
      eventManager.emit(EVENT_TYPES.SHOW_NOTIF, {
        type: NOTIFICATION_TYPES.ERROR,
        message: 'Sorry!!, couldn\'t update due to bad network',
      })
    });
};
