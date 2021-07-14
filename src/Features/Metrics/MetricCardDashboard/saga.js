import { takeEvery, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { actions as DashboardActions } from './reducer';

function* metricErrorReceived(action) {
  yield call(toast.error, `Error Received: ${action.payload.error}`);
}

export default function* rootSaga() {
  yield takeEvery(DashboardActions.metricError.type, metricErrorReceived);
}
