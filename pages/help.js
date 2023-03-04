import React, { Fragment } from "react";
import Media from "react-media";

const Help = () => {
  return (
    <div>
    <Media queries={{
        small: "(max-width: 599px)", // < 600px
        medium: "(min-width: 1024px) and (max-width: 1366px)", // < 1366px
        large: "(min-width: 1400px)" // >= 1400px
  
      }}>
      {matches => (
            <Fragment>
            {matches.small && (
                <Fragment>
                </Fragment>
            )}
            {matches.medium && 
                <Fragment>
                </Fragment>
            }
            {matches.large && 
                <Fragment>
                </Fragment>
            }
            </Fragment>
        )}
      </Media>
    </div>
    );
};

export default Help;
