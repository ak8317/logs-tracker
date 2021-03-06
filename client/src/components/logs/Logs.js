import React, { useEffect } from 'react';
import LogItem from './LogItem';
import PreLoader from '../layout/PreLoader';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLogs } from '../../actions/logActions';

const Logs = ({ getLogs, log: { logs, loading } }) => {
  useEffect(() => {
    getLogs();

    //eslint-disable-next-line
  }, []);

  if (loading || logs == null) {
    return <PreLoader />;
  }
  return (
    <ul className='collection with-header'>
      <li className='collection-header'>
        <h4 className='center'>System Logs</h4>
      </li>
      {!loading && logs.length === 0 ? (
        <p className='center'>No Logs to show...</p>
      ) : (
        logs.map((log) => <LogItem log={log} key={log._id} />)
      )}
    </ul>
  );
};
Logs.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  log: state.log,
});

export default connect(mapStateToProps, { getLogs })(Logs);
