import React, { Fragment, StatelessComponent } from 'react';
// import Countdown from 'react-cntdwn';
import Button from '~/blocks/Button';
import Notification from '~/blocks/Notification';

import styles from './styles.css';

export interface ExecuteRequestProps {
  onExecute: (id) => void;
  readyToExecute?: boolean;
  requestId: number;
  targetDate?: string;
}

export const ExecuteRequest: StatelessComponent<ExecuteRequestProps> = ({
  onExecute,
  readyToExecute,
  requestId,
  targetDate,
}) => {
  const onClickExecute = () => onExecute && onExecute(requestId);

  return (
    <div className="execute-request">
      <Notification isWarning>
        <style jsx>{styles}</style>
        <h3 className="execute-request__title">Waiting time required</h3>
        <p>
          <a
            href="https://medium.com/melonport-blog/protecting-participants-ee55a752287"
            target="_blank"
            rel="noopener noreferrer"
          >
            To prevent information advantage of any economic agent over another,
            we enforce a waiting period before any subscription or redemption
            can be executed.
          </a>
        </p>

        {readyToExecute ? (
          <Button style="secondary" onClick={onClickExecute}>
            Execute my request!
          </Button>
        ) : (
          <Fragment>
            Remaining waiting time before request execution:
            {/* <Countdown
                targetDate={targetDate}
                startDelay={100}
                interval={1000}
                timeSeparator=":"
                leadingZero
              /> */}
          </Fragment>
        )}
      </Notification>
    </div>
  );
};

export default ExecuteRequest;
