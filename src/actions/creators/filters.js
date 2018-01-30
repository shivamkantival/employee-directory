
import {
	APPLY_FILTER
} from "../reducers";

export function applyFilter(filters) {
	return {
		type: APPLY_FILTER,
		payload: filters,
	};
}
