import PropTypes from 'prop-types';

import { PrettyChatWindow } from 'react-chat-engine-pretty';

// const CHAT_ENGINE_PRIVATE_KEY = import.meta.env.CHAT_ENGINE_PRIVATE_KEY;
const PROJECT_ID = import.meta.env.VITE_CHAT_PROJECT_ID;
// const PROJECT_ID = '6e6cd57d-0459-4654-b023-429f481829c8';

const ChatsPage = props => {
  return (
    <div style={{ height: '100vh' }}>
      <PrettyChatWindow
        style={{ height: '100%' }}
        projectId={PROJECT_ID}
        username={props.user.username}
        secret={props.user.secret}
      />
    </div>
  );
};

ChatsPage.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    secret: PropTypes.string
  }).isRequired
};

export default ChatsPage;
