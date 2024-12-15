import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';

function LinkButton({ to, text}) {
    return(
        <Link  to={to}>
        {text}
      </Link>   
    )
}

LinkButton.propTypes = {
    to: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  };

export default LinkButton