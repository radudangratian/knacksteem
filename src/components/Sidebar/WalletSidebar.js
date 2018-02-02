import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { openTransfer } from '../../wallet/walletActions';
import { getAuthenticatedUser } from '../../reducers';
import Action from '../Button/Action';

@withRouter
@connect(
  state => ({
    user: getAuthenticatedUser(state),
  }),
  {
    openTransfer,
  },
)
class WalletSidebar extends React.Component {
  static propTypes = {
    user: PropTypes.shape(),
    isCurrentUser: PropTypes.bool,
    match: PropTypes.shape().isRequired,
    openTransfer: PropTypes.func.isRequired,
  };

  static defaultProps = {
    user: {},
    isCurrentUser: false,
  };

  handleOpenTransfer = () => {
    const { match, user, isCurrentUser } = this.props;
    const username = match.params.name === user.name || isCurrentUser ? '' : match.params.name;
    this.props.openTransfer(username);
  };

  render() {
    const { match, user, isCurrentUser } = this.props;

    return (
      <div>
        <Action
          primary
          style={{ marginBottom: '10px' }}
          text={<FormattedMessage id="transfer" defaultMessage="Transfer" />}
          onClick={this.handleOpenTransfer}
        />
      </div>
    );
  }
}

export default WalletSidebar;
